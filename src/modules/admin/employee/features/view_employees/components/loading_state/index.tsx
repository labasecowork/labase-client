import { Card } from "@/components/ui";

export const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="p-6 animate-pulse h-52"></Card>
      ))}
    </div>
  );
};
