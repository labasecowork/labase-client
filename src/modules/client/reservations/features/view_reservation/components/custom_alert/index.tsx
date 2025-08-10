import { cn } from "@/utilities";

interface Props {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

export const CustomAlert = ({
  title,
  description,
  icon: Icon,
  color,
}: Props) => {
  return (
    <div
      className={cn(
        "bg-sky-50 p-4 mb-4 flex gap-4 items-center flex-wrap",
        `bg-${color}-50`
      )}
    >
      <div
        className={cn(
          "size-10 flex items-center justify-center",
          `bg-${color}-100`
        )}
      >
        <Icon className={cn("size-5", `text-${color}-800`)} />
      </div>
      <div>
        <h3 className={cn("text-sm font-bold", `text-${color}-800 font-serif`)}>
          {title}
        </h3>
        <p className={cn("text-sm", `text-${color}-800 font-serif`)}>
          {description}
        </p>
      </div>
    </div>
  );
};
