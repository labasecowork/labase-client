import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { UserAvatar } from "../user_avatar";
import type { User } from "@/types/user";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import type { UserNavigationItem } from "../../types";

interface Props {
  user: User | null;
  userNavigation: UserNavigationItem[];
  handleLogoutClick: () => void;
}
export const UserDropdown: React.FC<Props> = ({
  user,
  userNavigation,
  handleLogoutClick,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative ml-3 flex max-w-xs items-center rounded-full bg-stone-600 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-600">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Abrir menú de usuario</span>
        <UserAvatar name={user?.name ?? "U"} size="sm" />
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
          {/* Información del usuario */}
          <div className="px-4 py-2 border-b border-stone-200">
            <p className="text-sm font-medium text-stone-900">{user.name}</p>
            <p className="text-xs text-stone-500">{user.email}</p>
            <p className="text-xs text-stone-400 capitalize">
              {user.userType === "admin" ? "Administrador" : "Cliente"}
            </p>
          </div>

          {userNavigation.map((item) => (
            <DropdownMenuItem key={item.name} className="rounded-sm transition">
              <a
                href={item.href}
                className="block px-2 py-1 text-sm text-stone-700 data-focus:bg-stone-100 data-focus:outline-hidden"
              >
                {item.name}
              </a>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem
            className="rounded-sm transition hover:bg-red-50 focus:bg-red-50 mt-1"
            onClick={handleLogoutClick}
          >
            <button className="flex items-center gap-2 w-full text-left cursor-pointer px-2 py-1 text-sm text-red-600 data-focus:bg-red-50 data-focus:outline-hidden">
              <ArrowLeftOnRectangleIcon className="size-5 text-red-600" />
              Cerrar sesión
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
