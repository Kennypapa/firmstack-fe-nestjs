export const COMPANY_LOGO_KEY = "firmstack_company_logo";
export const COMPANY_NAME_KEY = "firmstack_company_name";
export const COMPANY_EMAIL_KEY = "firmstack_company_email";
export const COMPANY_PHONE_KEY = "firmstack_company_phone";
export const COMPANY_ADDRESS_KEY = "firmstack_company_address";
export const COMPANY_TAX_ID_KEY = "firmstack_company_tax_id";

export type CompanyProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
};

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

export function saveCompanyProfile(profile: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  taxId?: string;
}) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COMPANY_NAME_KEY, profile.name);
  window.localStorage.setItem(COMPANY_EMAIL_KEY, profile.email);
  window.localStorage.setItem(COMPANY_PHONE_KEY, profile.phone ?? "");
  window.localStorage.setItem(COMPANY_ADDRESS_KEY, profile.address ?? "");
  window.localStorage.setItem(COMPANY_TAX_ID_KEY, profile.taxId ?? "");
}

export function loadCompanyProfile(): CompanyProfile {
  if (typeof window === "undefined") {
    return {
      name: "My Company",
      email: "user@company.com",
      phone: "",
      address: "",
      taxId: "",
    };
  }
  return {
    name: window.localStorage.getItem(COMPANY_NAME_KEY) ?? "My Company",
    email: window.localStorage.getItem(COMPANY_EMAIL_KEY) ?? "user@company.com",
    phone: window.localStorage.getItem(COMPANY_PHONE_KEY) ?? "",
    address: window.localStorage.getItem(COMPANY_ADDRESS_KEY) ?? "",
    taxId: window.localStorage.getItem(COMPANY_TAX_ID_KEY) ?? "",
  };
}
