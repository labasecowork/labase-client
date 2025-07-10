import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/store";
import { useUserStore } from "@/store";
import type { LoginResponse } from "@/services/auth/auth.types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("TOKEN_AUTH")
      : null;

  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const deleteUser = useUserStore((s) => s.deleteUser);

  const handleLogin = (loginResponse: LoginResponse) => {
    const { user: userData, token } = loginResponse;
    const transformedUser: User = {
      id: userData.id,
      name: `${userData.firstName} ${userData.lastName}`,
      avatar: userData.profileImage,
      email: userData.email,
      userType: "client",
    };

    localStorage.setItem("TOKEN_AUTH", token);
    setUser(transformedUser);
    queryClient.setQueryData(["profile"], transformedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_AUTH");
    deleteUser();
    queryClient.clear();
  };

  return {
    token,
    user,
    isPending: false,
    isError: false,
    error: null,
    handleLogin,
    handleLogout,
  };
};
