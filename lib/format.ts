export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatInvoiceStatus(status: string) {
  const map: Record<string, string> = {
    PAID: 'Paid',
    PENDING: 'Pending',
    OVERDUE: 'Overdue',
    DRAFT: 'Draft',
  };
  return map[status] ?? status;
}

export function formatExpenseStatus(status: string) {
  const map: Record<string, string> = {
    APPROVED: 'Approved',
    PENDING: 'Pending',
    REJECTED: 'Rejected',
  };
  return map[status] ?? status;
}

export function toExpenseCategory(label: string) {
  return label.toUpperCase().replace(/\s+/g, '_');
}

export function fromExpenseCategory(value: string) {
  const map: Record<string, string> = {
    OFFICE: 'Office',
    SOFTWARE: 'Software',
    TRAVEL: 'Travel',
    MARKETING: 'Marketing',
    OTHER: 'Other',
  };
  return map[value] ?? value.charAt(0) + value.slice(1).toLowerCase();
}

export function formatRelativeTime(iso: string) {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}
