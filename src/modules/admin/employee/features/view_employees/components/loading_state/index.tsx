import { Card } from "@/components/ui";

export const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 mb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="p-6 animate-pulse h-44"></Card>
      ))}
    </div>
  );
};
