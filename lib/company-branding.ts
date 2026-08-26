export const COMPANY_LOGO_KEY = "firmstack_company_logo";
export const COMPANY_NAME_KEY = "firmstack_company_name";
export const COMPANY_EMAIL_KEY = "firmstack_company_email";

export function saveCompanyLogo(dataUrl: string | null) {
  if (typeof window === "undefined") return;
  if (dataUrl) {
    window.localStorage.setItem(COMPANY_LOGO_KEY, dataUrl);
  } else {
    window.localStorage.removeItem(COMPANY_LOGO_KEY);
  }
}

export function loadCompanyLogo(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(COMPANY_LOGO_KEY);
}

export function saveCompanyProfile(name: string, email: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COMPANY_NAME_KEY, name);
  window.localStorage.setItem(COMPANY_EMAIL_KEY, email);
}

export function loadCompanyProfile(): { name: string; email: string } {
  if (typeof window === "undefined") {
    return { name: "My Company", email: "user@company.com" };
  }
  return {
    name: window.localStorage.getItem(COMPANY_NAME_KEY) ?? "My Company",
    email: window.localStorage.getItem(COMPANY_EMAIL_KEY) ?? "user@company.com",
  };
}
 