export const PaymentLoading = () => (
  <div className="space-y-4 w-full">
    <div className="animate-pulse">
      <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto"></div>
      <div className="h-6 bg-stone-200 rounded w-3/4 mx-auto mt-4"></div>
      <div className="h-4 bg-stone-200 rounded w-1/2 mx-auto mt-2"></div>
      <div className="space-y-2 mt-6">
        <div className="h-4 bg-stone-200 rounded w-full"></div>
        <div className="h-4 bg-stone-200 rounded w-3/4"></div>
        <div className="h-4 bg-stone-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);
