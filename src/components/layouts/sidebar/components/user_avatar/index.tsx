import type { User } from "@/types/user";

interface Props {
  user: User;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
};

export const UserAvatar: React.FC<Props> = ({ user, size = "sm" }) => (
  <div
    className={`${sizeClasses[size]} rounded-full bg-stone-500 flex items-center justify-center`}
  >
    <span
      className={`text-white font-medium ${
        size === "sm" ? "text-sm" : "text-base"
      }`}
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  </div>
);
