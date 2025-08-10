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
        "p-4 mb-4 flex gap-4 items-center flex-wrap rounded-sm",
        `bg-${color}-800/10`
      )}
    >
      <div
        className={cn(
          "size-10 flex items-center justify-center rounded-sm",
          `bg-${color}-800/10`
        )}
      >
        <Icon className={cn("size-5", `text-${color}-800`)} />
      </div>
      <div>
        <h3 className={cn("text-sm font-bold", `text-${color}-800 `)}>
          {title}
        </h3>
        <p className={cn("text-sm", `text-${color}-800`)}>{description}</p>
      </div>
    </div>
  );
};
