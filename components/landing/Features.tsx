import {
  TrendingUp,
  CreditCard,
  Shield,
  ClipboardList,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Revenue tracking",
    description: "See all income in one place with clear status and dates.",
  },
  {
    icon: CreditCard,
    title: "Expense monitoring",
    description: "Categorize and track every outgoing payment.",
  },
  {
    icon: Shield,
    title: "Role-based access control",
    description: "Owner, Admin, and Staff—each with the right permissions.",
  },
  {
    icon: ClipboardList,
    title: "Activity logs",
    description: "Full audit trail of who did what and when.",
  },
  {
    icon: Lock,
    title: "Secure tenant isolation",
    description: "Your data stays in your company. Multi-tenant by design.",
  },
];

export function Features() {
  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc] font-onest" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy text-center">
          Everything you need to control finances
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Invoices, expenses, profit dashboard, and accountability—built for teams.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all"
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit">
                <item.icon className="w-7 h-7 text-primary" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
