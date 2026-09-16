function Bone({ className = "" }: { className?: string }) {
  return <div className={`skeleton-soft rounded-lg ${className}`} />;
}

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-100/80 bg-white p-4 sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-3" aria-hidden>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardShell key={i} className="h-[132px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <Bone className="h-9 w-9 rounded-full" />
              <Bone className="h-5 w-12 rounded-full" />
            </div>
            <div className="space-y-2">
              <Bone className="h-3 w-24" />
              <Bone className="h-7 w-16" />
            </div>
          </CardShell>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <CardShell className="min-h-[288px] lg:col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="space-y-2">
              <Bone className="h-4 w-40" />
              <Bone className="h-3 w-24" />
            </div>
            <Bone className="h-8 w-28 rounded-lg" />
          </div>
          <Bone className="h-[180px] w-full rounded-xl" />
        </CardShell>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <CardShell className="min-h-[108px]">
            <div className="mb-3 flex items-center justify-between">
              <Bone className="h-4 w-24" />
              <Bone className="h-5 w-12 rounded-full" />
            </div>
            <Bone className="h-7 w-20 mb-2" />
            <Bone className="h-12 w-full rounded-lg" />
          </CardShell>
          <CardShell className="flex-1 min-h-[180px]">
            <Bone className="h-4 w-28 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Bone key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          </CardShell>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardShell key={i} className="min-h-[280px]">
            <div className="mb-5 flex items-center justify-between">
              <Bone className="h-4 w-32" />
              <Bone className="h-3 w-14" />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 pt-10">
              <Bone className="h-14 w-14 rounded-xl" />
              <Bone className="h-3 w-24" />
            </div>
          </CardShell>
        ))}
      </div>
    </div>
  );
}
