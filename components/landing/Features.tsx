import {
  FileText,
  CreditCard,
  BarChart3,
  LayoutDashboard,
  Users,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Create & send invoices",
    description: "Professional invoices in minutes. Track status and get paid—solo or with your team.",
  },
  {
    icon: CreditCard,
    title: "Track expenses",
    description: "Categorize and monitor every outgoing payment. Stay on top of cash flow.",
  },
  {
    icon: BarChart3,
    title: "Generate reports",
    description: "Clear reports and exports so you always know where your money stands.",
  },
  {
    icon: LayoutDashboard,
    title: "Personal dashboard & analytics",
    description: "One place for revenue, expenses, and profit. Your numbers, at a glance.",
  },
  {
    icon: Users,
    title: "Team management",
    description: "For companies: invite your team, assign roles, and keep everyone accountable.",
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
          Whether you&apos;re solo or part of a team—invoices, expenses, reports, and a clear dashboard.
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
