import { cn } from "@/utilities";

interface Props {
  title: string;
  description: string;
  icon: React.ElementType;
  color?: "rose" | "emerald" | "yellow" | "blue" | "purple" | "pink" | "gray";
}
export const StatusMessage: React.FC<Props> = ({
  title,
  description,
  icon: Icon,
  color = "rose",
}) => {
  return (
    <div
      className={cn(
        "col-span-1 lg:col-span-1 w-full h-full max-h-[675px] flex items-center justify-center flex-col text-center px-8",
        `bg-${color}-500/10`
      )}
    >
      <Icon className={cn("size-10", `text-${color}-800`)} />
      <h2
        className={cn(
          "text-2xl font-serif mt-4 font-bold",
          `text-${color}-800`
        )}
      >
        {title}
      </h2>
      <p
        className={cn("text-xs sm:text-sm mt-0  sm:mt-2", `text-${color}-700`)}
      >
        {description}
      </p>
    </div>
  );
};
