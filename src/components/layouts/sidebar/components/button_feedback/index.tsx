import { MessageCircleIcon } from "lucide-react";

export const ButtonFeedback = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 opacity-55 hover:opacity-100 ">
      <a
        href="https://forms.gle/pYU3v1GwJrmjhQVU6"
        target="_blank"
        className="flex items-center gap-2 rounded-full bg-stone-500 px-8 py-3 text-white hover:bg-stone-400 justify-center opacity-75 hover:opacity-100 transition-all duration-300 text-sm font-medium"
      >
        <MessageCircleIcon className="size-5" />
        Feedback
      </a>
    </div>
  );
};
