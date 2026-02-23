import { Skeleton } from "@/components/ui/skeleton";

export function PaymentDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-10">
      <Skeleton className="mb-6 h-5 w-16" />
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-1 h-4 w-24" />
        </div>
      </div>
      <Skeleton className="mb-4 h-16 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
