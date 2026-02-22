import { Skeleton } from "@/components/ui/skeleton";

export function PaymentsListSkeleton() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-10">
      <Skeleton className="mb-8 h-8 w-48" />
      <Skeleton className="mb-6 h-10 w-64" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    </div>
  );
}
