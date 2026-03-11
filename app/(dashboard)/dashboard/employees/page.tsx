"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Shield,
  UserCheck,
  Mail,
  Trash2,
  ArrowUpDown,
  X,
  Check,
  Clock,
} from "lucide-react";

/* ─── Types ─── */
type Role = "Admin" | "Member";
type Status = "Active" | "Pending";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  addedOn: string;
  avatar: string; // initials
}

/* ─── Mock data ─── */
const initialEmployees: Employee[] = [
  { id: "1", name: "You (Owner)", email: "user@company.com", role: "Admin", status: "Active", addedOn: "Jan 15, 2026", avatar: "U" },
  { id: "2", name: "Sarah Johnson", email: "sarah@company.com", role: "Member", status: "Active", addedOn: "Feb 3, 2026", avatar: "SJ" },
  { id: "3", name: "Mike Chen", email: "mike@company.com", role: "Member", status: "Active", addedOn: "Feb 10, 2026", avatar: "MC" },
  { id: "4", name: "Alex Rivera", email: "alex@company.com", role: "Admin", status: "Pending", addedOn: "Mar 8, 2026", avatar: "AR" },
];

const roleConfig: Record<Role, { label: string; icon: typeof Shield; bg: string }> = {
  Admin: { label: "Admin", icon: Shield, bg: "bg-navy/[0.06] text-navy" },
  Member: { label: "Member", icon: UserCheck, bg: "bg-gray-100 text-gray-600" },
};

const statusConfig: Record<Status, { label: string; dot: string; bg: string }> = {
  Active: { label: "Active", dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700" },
  Pending: { label: "Pending invite", dot: "bg-amber-500", bg: "bg-amber-50 text-amber-700" },
};

/* ─── Page ─── */
export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Member");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null);
  const [roleChangeId, setRoleChangeId] = useState<string | null>(null);

  const filtered = employees.filter(
    (e) =>
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  const adminCount = employees.filter((e) => e.role === "Admin").length;
  const memberCount = employees.filter((e) => e.role === "Member").length;
  const pendingCount = employees.filter((e) => e.status === "Pending").length;

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const initials = inviteEmail
      .split("@")[0]
      .split(".")
      .map((p) => p[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2) || "?";

    const newEmployee: Employee = {
      id: String(Date.now()),
      name: inviteEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "Pending",
      addedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      avatar: initials,
    };

    setEmployees((prev) => [...prev, newEmployee]);
    setInviteEmail("");
    setInviteRole("Member");
    setShowInvite(false);
  };

  const handleRemove = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setRemoveConfirm(null);
    setActiveMenu(null);
  };

  const handleRoleChange = (id: string, newRole: Role) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, role: newRole } : e))
    );
    setRoleChangeId(null);
    setActiveMenu(null);
  };

  const handleResendInvite = (id: string) => {
    // In real app: resend invite email
    setActiveMenu(null);
  };

  return (
    <div className="space-y-6 max-w-[900px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Invite people and manage who can access your workspace
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowInvite(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm hover:bg-navy/90 transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-semibold text-navy">{employees.length}</span> total
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-semibold text-navy">{adminCount}</span> admins
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-semibold text-navy">{memberCount}</span> members
        </div>
        {pendingCount > 0 && (
          <>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-amber-600">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-semibold">{pendingCount}</span> pending
            </div>
          </>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search team members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2 text-sm text-navy placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 focus:outline-none transition-all"
        />
      </div>

      {/* Info box */}
      <div className="rounded-xl bg-navy/[0.03] border border-navy/[0.08] px-4 py-3">
        <p className="text-xs text-navy/70 leading-relaxed">
          <span className="font-semibold text-navy">How it works:</span>{" "}
          <span className="font-medium">Admins</span> can manage team, invoices, and expenses.{" "}
          <span className="font-medium">Members</span> can add expenses and view their own data. You can change roles or remove access anytime.
        </p>
      </div>

      {/* Employee list */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No team members found</p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Added
                    </th>
                    <th className="px-5 py-3 w-12" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp) => {
                    const isOwner = emp.id === "1";
                    return (
                      <tr key={emp.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors group">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-navy/[0.06] flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-navy">{emp.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-navy">{emp.name}</p>
                              <p className="text-[11px] text-muted-foreground">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${roleConfig[emp.role].bg}`}>
                            {emp.role === "Admin" ? (
                              <Shield className="w-3 h-3" />
                            ) : (
                              <UserCheck className="w-3 h-3" />
                            )}
                            {emp.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusConfig[emp.status].bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[emp.status].dot}`} />
                            {statusConfig[emp.status].label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs">
                          {emp.addedOn}
                        </td>
                        <td className="px-5 py-3.5">
                          {!isOwner && (
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setActiveMenu(activeMenu === emp.id ? null : emp.id)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:bg-gray-100 hover:text-navy opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              {activeMenu === emp.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-1">
                                    {/* Role switch */}
                                    <button
                                      type="button"
                                      onClick={() => handleRoleChange(emp.id, emp.role === "Admin" ? "Member" : "Admin")}
                                      className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors w-full"
                                    >
                                      <ArrowUpDown className="w-3.5 h-3.5" />
                                      Make {emp.role === "Admin" ? "Member" : "Admin"}
                                    </button>
                                    {/* Resend if pending */}
                                    {emp.status === "Pending" && (
                                      <button
                                        type="button"
                                        onClick={() => handleResendInvite(emp.id)}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-navy hover:bg-gray-50 transition-colors w-full"
                                      >
                                        <Mail className="w-3.5 h-3.5" />
                                        Resend Invite
                                      </button>
                                    )}
                                    <div className="border-t border-gray-100 my-1" />
                                    <button
                                      type="button"
                                      onClick={() => { setRemoveConfirm(emp.id); setActiveMenu(null); }}
                                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      Remove Access
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="sm:hidden divide-y divide-gray-50">
              {filtered.map((emp) => {
                const isOwner = emp.id === "1";
                return (
                  <div key={emp.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-navy/[0.06] flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-navy">{emp.avatar}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-navy text-sm truncate">{emp.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{emp.email}</p>
                        </div>
                      </div>
                      {!isOwner && (
                        <button
                          type="button"
                          onClick={() => setActiveMenu(activeMenu === emp.id ? null : emp.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:bg-gray-100 shrink-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-12">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleConfig[emp.role].bg}`}>
                        {emp.role}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusConfig[emp.status].bg}`}>
                        <span className={`w-1 h-1 rounded-full ${statusConfig[emp.status].dot}`} />
                        {statusConfig[emp.status].label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ─── Invite modal ─── */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowInvite(false)}>
          <div className="rounded-2xl bg-white p-6 shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-navy">Invite Team Member</h3>
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-navy text-sm placeholder:text-muted-foreground focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                  autoFocus
                />
              </div>

              {/* Role selector */}
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Member", "Admin"] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setInviteRole(role)}
                      className={`relative flex flex-col items-start p-3 rounded-xl border-2 transition-all text-left ${
                        inviteRole === role
                          ? "border-navy bg-navy/[0.03] shadow-[0_0_0_4px_rgba(34,46,77,0.06)]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {role === "Admin" ? (
                          <Shield className="w-3.5 h-3.5 text-navy" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className="text-sm font-semibold text-navy">{role}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        {role === "Admin"
                          ? "Full access to all features"
                          : "Can add expenses & view own data"}
                      </p>
                      {inviteRole === role && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-navy flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="flex-1 rounded-xl border border-gray-200 text-navy font-medium py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
                className="flex-1 rounded-xl bg-navy text-white font-semibold py-2.5 text-sm hover:bg-navy/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Remove confirmation ─── */}
      {removeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setRemoveConfirm(null)}>
          <div className="rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-navy text-center mt-4">Remove access?</h3>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              This person will lose access to the workspace immediately. You can invite them again later.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setRemoveConfirm(null)}
                className="flex-1 rounded-xl border border-gray-200 text-navy font-medium py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRemove(removeConfirm)}
                className="flex-1 rounded-xl bg-red-600 text-white font-medium py-2.5 text-sm hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
