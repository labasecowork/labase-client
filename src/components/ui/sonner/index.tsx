import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast p-4 transition-all duration-300 border-none shadow-none flex gap-2",
          title: "text-sm font-bold font-serif",
          description: "text-sm opacity-70",
          error: "text-rose-800 bg-rose-500/10 ",
          success: "text-emerald-800 bg-emerald-500/10",
          warning: "text-orange-800 bg-orange-500/10",
          info: "text-sky-800 bg-sky-500/10",
          icon: "text-sm mt-[2px]  self-start flex h-full",
          actionButton: "bg-white text-black font-medium rounded px-2 py-1",
          cancelButton: "bg-transparent text-white underline",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
