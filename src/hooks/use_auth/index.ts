import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services";
import { useUserStore } from "@/store";

export const useAuth = () => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("TOKEN_AUTH")
      : null;

  const userLocalStorage =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("USER_AUTH") || "null")
      : null;

  const userStore = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const deleteUser = useUserStore((s) => s.deleteUser);

  useEffect(() => {
    if (token && userLocalStorage && !userStore) {
      setUser(userLocalStorage);
    }
  }, [token, userLocalStorage, userStore, setUser]);

  const hasInconsistentState = !token && userLocalStorage;

  const queryEnabled = !!token && !userLocalStorage;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    enabled: queryEnabled,
    retry: false,
  });

  useEffect(() => {
    if (data?.data && !userLocalStorage) {
      const { id, first_name, last_name, email, user_type } = data.data;
      const userData = {
        id,
        name: `${first_name} ${last_name}`,
        email,
        userType: user_type,
      };
      setUser(userData);
      localStorage.setItem("USER_AUTH", JSON.stringify(userData));
    }
  }, [data, userLocalStorage, setUser]);

  if (hasInconsistentState) {
    return {
      token: null,
      user: null,
      isPending: false,
      isError: true,
      error: new Error("Estado inconsistente: usuario sin token"),
    };
  }

  const currentUser = userLocalStorage || userStore || data?.data || null;

  const logout = () => {
    localStorage.removeItem("USER_AUTH");
    localStorage.removeItem("TOKEN_AUTH");
    deleteUser();
  };

  return {
    token,
    user: currentUser,
    isPending: isLoading,
    isError,
    error,
    logout,
  };
};
