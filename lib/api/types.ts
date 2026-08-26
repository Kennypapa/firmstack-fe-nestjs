export type WorkspaceRole = 'OWNER' | 'ADMIN' | 'MEMBER';
export type WorkspaceType = 'PERSONAL' | 'COMPANY';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  emailVerified: boolean;
}

export interface WorkspaceSummary {
  id: string;
  name: string;
  type: WorkspaceType;
  role: WorkspaceRole;
}

export interface AuthMeResponse extends UserProfile {
  workspaces: WorkspaceSummary[];
}

export interface LoginResponse {
  accessToken: string;
  user: UserProfile;
}

export interface RegisterResponse extends LoginResponse {
  nextStep: 'onboarding' | 'dashboard';
}

export interface DashboardSummary {
  totalRevenue: number;
  totalRevenueChange: string;
  totalExpenses: number;
  totalExpensesChange: string;
  netProfit: number;
  netProfitChange: string;
  totalInvoices: number;
  pendingInvoices: number;
}

export interface ChartPoint {
  name: string;
  revenue?: number;
  expenses?: number;
  profit?: number;
}

export interface ActivityItem {
  user: string;
  action: string;
  time: string;
  type: string;
}

export interface InvoiceListItem {
  id: string;
  number: string;
  status: string;
  client: { name: string; email: string; address?: string | null };
  grandTotal: number;
  dueDate: string;
  invoiceDate: string;
}

export interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  addedBy: string;
  status: string;
  receiptUrl?: string | null;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  addedOn: string;
  avatar?: string | null;
  isOwner?: boolean;
}
