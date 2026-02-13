export function TrustedBy() {
  const labels = [
    "Growing startups",
    "Professional services",
    "SMBs",
    "Remote teams",
    "Finance teams",
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100 font-onest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by teams who need financial control
        </p>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 opacity-70">
          {labels.map((label) => (
            <span
              key={label}
              className="text-navy font-semibold text-lg"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
