import { FileSpreadsheet, EyeOff, PieChart, Database } from "lucide-react";

const pains = [
  {
    icon: FileSpreadsheet,
    title: "Managing finances in spreadsheets",
    description: "Error-prone and hard to scale.",
  },
  {
    icon: PieChart,
    title: "No clear monthly profit visibility",
    description: "Revenue and expenses live in different places.",
  },
  {
    icon: EyeOff,
    title: "No accountability in financial actions",
    description: "Who did what, and when? Hard to track.",
  },
  {
    icon: Database,
    title: "Scattered business data",
    description: "Invoices, expenses, and reports in silos.",
  },
];

export function Problem() {
  return (
    <section className="py-16 lg:py-24 bg-white font-onest" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy text-center max-w-2xl mx-auto">
          Sound familiar? Take back control
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-xl mx-auto">
          Individuals and businesses often hit the same walls. Firmstack fixes them.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit">
                <item.icon className="w-6 h-6 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
