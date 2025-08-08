export const LoadingState = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div className="h-24 w-full bg-stone-100 animate-pulse"></div>
      <div className="h-24 w-full bg-stone-100 animate-pulse"></div>
      <div className="h-24 w-full bg-stone-100 animate-pulse"></div>
      <div className="h-24 w-full bg-stone-100 animate-pulse"></div>
    </div>
    <div className="h-[600px] bg-stone-100 animate-pulse  flex items-center justify-center"></div>
  </div>
);
