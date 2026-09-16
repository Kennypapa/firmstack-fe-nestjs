"use client";

import { useState, useEffect, useRef } from "react";
import {
  Building2,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Upload,
  Trash2,
} from "lucide-react";
import {
  loadCompanyLogo,
  loadCompanyProfile,
  saveCompanyLogo,
  saveCompanyProfile,
} from "@/lib/company-branding";
import {
  getBilling,
  getNotifications,
  getSettings,
  updateNotifications,
  updateSettings,
} from "@/lib/api/workspaces";
import { CURRENCIES } from "@/lib/currencies";

type Tab = "general" | "notifications" | "security" | "billing";

const tabs: { id: Tab; label: string; icon: typeof Building2 }[] = [
  { id: "general", label: "General", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-navy" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [companyName, setCompanyName] = useState("My Company");
  const [companyEmail, setCompanyEmail] = useState("user@company.com");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC");
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    getSettings()
      .then((settings) => {
        setCompanyName(settings.companyName);
        setCompanyEmail(settings.companyEmail ?? "");
        setCurrency(settings.currency);
        setTimezone(settings.timezone);
        const local = loadCompanyProfile();
        saveCompanyProfile({
          name: settings.companyName,
          email: settings.companyEmail ?? "",
          phone: local.phone,
          address: local.address,
          taxId: local.taxId,
        });
        setCompanyPhone(local.phone);
        setCompanyAddress(local.address);
        setCompanyTaxId(local.taxId);
      })
      .catch(() => {
        const profile = loadCompanyProfile();
        setCompanyName(profile.name);
        setCompanyEmail(profile.email);
        setCompanyPhone(profile.phone);
        setCompanyAddress(profile.address);
        setCompanyTaxId(profile.taxId);
      });

    getNotifications()
      .then((prefs) => {
        if (prefs.emailInvoice !== undefined) setEmailInvoice(prefs.emailInvoice);
        if (prefs.emailExpense !== undefined) setEmailExpense(prefs.emailExpense);
        if (prefs.emailTeam !== undefined) setEmailTeam(prefs.emailTeam);
        if (prefs.emailWeekly !== undefined) setEmailWeekly(prefs.emailWeekly);
      })
      .catch(() => undefined);

    setCompanyLogo(loadCompanyLogo());
  }, []);

  const [emailInvoice, setEmailInvoice] = useState(true);
  const [emailExpense, setEmailExpense] = useState(true);
  const [emailTeam, setEmailTeam] = useState(false);
  const [emailWeekly, setEmailWeekly] = useState(true);

  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = async () => {
    try {
      await updateSettings({
        companyName,
        companyEmail,
        currency,
        timezone,
      });
      saveCompanyProfile({
        name: companyName,
        email: companyEmail,
        phone: companyPhone,
        address: companyAddress,
        taxId: companyTaxId,
      });
      saveCompanyLogo(companyLogo);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleSaveNotifications = async () => {
    try {
      await updateNotifications({
        emailInvoice,
        emailExpense,
        emailTeam,
        emailWeekly,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const processLogoFile = (file: File) => {
    setLogoError(null);
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setLogoError("Please upload a PNG, JPG, WEBP, or SVG file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoError("Logo must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCompanyLogo(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-navy tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your workspace preferences
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <nav className="sm:w-48 shrink-0">
          <div className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-navy/[0.06] text-navy"
                    : "text-muted-foreground hover:text-navy hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 min-w-0">
          {activeTab === "general" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
                  Company Information
                </h2>

                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Company Logo
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Shown on your invoices. PNG, JPG, WEBP, or SVG — max 2 MB.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                      {companyLogo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={companyLogo}
                          alt="Company logo"
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-muted-foreground/40" />
                      )}
                    </div>
                    <div className="flex-1 w-full min-w-0 space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) processLogoFile(file);
                          e.target.value = "";
                        }}
                      />
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) processLogoFile(file);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                          dragOver
                            ? "border-navy bg-navy/5"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                        }`}
                      >
                        <Upload className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                        <p className="text-sm text-navy font-medium">
                          Drag and drop or click to upload
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Recommended: square logo, at least 200×200px
                        </p>
                      </div>
                      {companyLogo && (
                        <button
                          type="button"
                          onClick={() => {
                            setCompanyLogo(null);
                            setLogoError(null);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove logo
                        </button>
                      )}
                      {logoError && <p className="text-xs text-red-600">{logoError}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Company Email
                    </label>
                    <input
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                      placeholder="+1 (415) 555-0142"
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Tax ID / VAT
                    </label>
                    <input
                      type="text"
                      value={companyTaxId}
                      onChange={(e) => setCompanyTaxId(e.target.value)}
                      placeholder="VAT · US-884422"
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Company Address
                    </label>
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="88 Market St, San Francisco, CA"
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
                  Preferences
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Default Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all appearance-none"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all appearance-none"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern (EST)</option>
                      <option value="CST">Central (CST)</option>
                      <option value="PST">Pacific (PST)</option>
                      <option value="WAT">West Africa (WAT)</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-6 py-2.5 text-sm hover:bg-navy/90 transition-colors"
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-5">
                  Email Notifications
                </h2>
                <div className="space-y-0 divide-y divide-gray-50">
                  <div className="flex items-center justify-between py-3.5 first:pt-0">
                    <div>
                      <p className="text-sm font-medium text-navy">Invoice updates</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        When an invoice is paid, viewed, or overdue
                      </p>
                    </div>
                    <Toggle enabled={emailInvoice} onChange={setEmailInvoice} />
                  </div>
                  <div className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm font-medium text-navy">New expenses</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        When a team member adds an expense
                      </p>
                    </div>
                    <Toggle enabled={emailExpense} onChange={setEmailExpense} />
                  </div>
                  <div className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm font-medium text-navy">Team changes</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        When someone joins or leaves
                      </p>
                    </div>
                    <Toggle enabled={emailTeam} onChange={setEmailTeam} />
                  </div>
                  <div className="flex items-center justify-between py-3.5 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-navy">Weekly summary</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Revenue, expenses, and invoice overview every Monday
                      </p>
                    </div>
                    <Toggle enabled={emailWeekly} onChange={setEmailWeekly} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  className="mt-5 rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm hover:bg-navy/90 transition-colors"
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
                  Change Password
                </h2>
                <div className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPw ? "text" : "password"}
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        className="w-full h-10 px-3 pr-10 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors"
                      >
                        {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPw ? "text" : "password"}
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        className="w-full h-10 px-3 pr-10 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPw(!showNewPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors"
                      >
                        {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm hover:bg-navy/90 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-navy uppercase tracking-wider">
                      Two-Factor Authentication
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Toggle enabled={twoFactor} onChange={setTwoFactor} />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
                  Sessions
                </h2>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy">Current session</p>
                      <p className="text-[11px] text-muted-foreground">
                        Chrome on macOS &middot; Active now
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
                  Current Plan
                </h2>
                <div className="flex items-center justify-between p-4 rounded-xl bg-navy/[0.03] border border-navy/[0.08]">
                  <div>
                    <p className="font-semibold text-navy">Free Plan</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Up to 3 users, core features
                    </p>
                  </div>
                  <span className="text-lg font-bold text-navy">
                    $0
                    <span className="text-xs font-normal text-muted-foreground">/mo</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm hover:bg-navy/90 transition-colors"
                >
                  Upgrade Plan
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
                  Usage
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Team members</span>
                      <span className="font-medium text-navy">4 / 3</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Invoices this month</span>
                      <span className="font-medium text-navy">12 / 50</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-navy rounded-full" style={{ width: "24%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium text-navy">120 MB / 1 GB</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-navy rounded-full" style={{ width: "12%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
                  Payment Method
                </h2>
                <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 rounded bg-gray-100 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No payment method added</p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-navy hover:text-navy/80 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50/30 p-5">
                <h2 className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">
                  Danger Zone
                </h2>
                <p className="text-xs text-red-600/70 mb-3">
                  Permanently delete your workspace and all data. This cannot be undone.
                </p>
                <button
                  type="button"
                  className="rounded-xl border border-red-200 text-red-600 font-medium px-4 py-2 text-sm hover:bg-red-50 transition-colors"
                >
                  Delete Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
          <Check className="w-4 h-4" />
          Changes saved
        </div>
      )}
    </div>
  );
}
