import { apiRequest } from "./client";
import type { ClientItem } from "./types";
import { getWorkspaceId } from "@/lib/auth/session";

const STORAGE_PREFIX = "firmstack-clients";

function storageKey() {
  const workspaceId = getWorkspaceId() || "default";
  return `${STORAGE_PREFIX}:${workspaceId}`;
}

function readLocal(): ClientItem[] {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ClientItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(clients: ClientItem[]) {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(clients));
  } catch {
    /* ignore */
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `cli_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export type ClientInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
};

export async function listClients(params?: { search?: string }) {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    const qs = query.toString();
    const res = await apiRequest<{ data: ClientItem[] } | ClientItem[]>(
      `/clients${qs ? `?${qs}` : ""}`,
    );
    const data = Array.isArray(res) ? res : res.data;
    writeLocal(data);
    return data;
  } catch {
    let local = readLocal();
    if (params?.search) {
      const q = params.search.toLowerCase();
      local = local.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company || "").toLowerCase().includes(q) ||
          (c.phone || "").toLowerCase().includes(q),
      );
    }
    return local;
  }
}

export async function getClient(id: string) {
  try {
    return await apiRequest<ClientItem>(`/clients/${id}`);
  } catch {
    const found = readLocal().find((c) => c.id === id);
    if (!found) throw new Error("Client not found");
    return found;
  }
}

export async function createClient(body: ClientInput) {
  try {
    const created = await apiRequest<ClientItem>("/clients", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const local = readLocal();
    writeLocal([created, ...local.filter((c) => c.id !== created.id)]);
    return created;
  } catch {
    const created: ClientItem = {
      id: makeId(),
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      address: body.address?.trim() || null,
      notes: body.notes?.trim() || null,
      createdAt: new Date().toISOString(),
    };
    writeLocal([created, ...readLocal()]);
    return created;
  }
}

export async function updateClient(id: string, body: ClientInput) {
  try {
    const updated = await apiRequest<ClientItem>(`/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    writeLocal(readLocal().map((c) => (c.id === id ? updated : c)));
    return updated;
  } catch {
    const local = readLocal();
    const idx = local.findIndex((c) => c.id === id);
    if (idx < 0) throw new Error("Client not found");
    const updated: ClientItem = {
      ...local[idx],
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      address: body.address?.trim() || null,
      notes: body.notes?.trim() || null,
    };
    local[idx] = updated;
    writeLocal(local);
    return updated;
  }
}

export async function deleteClient(id: string) {
  try {
    await apiRequest<{ id: string }>(`/clients/${id}`, { method: "DELETE" });
  } catch {
    /* local delete still runs */
  }
  writeLocal(readLocal().filter((c) => c.id !== id));
  return { id };
}
