import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import {
  getNavigationConfig,
  isActiveRoute,
} from "@/components/layouts/sidebar/utils";
import { userNavigation } from "@/components/layouts/sidebar/constants";
import { useUserStore } from "@/store";

export const useSidebar = () => {
  const user = useUserStore((s) => s.user);
  const deleteUser = useUserStore((s) => s.deleteUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navigation = useMemo(() => {
    if (!user?.userType) return [];
    return getNavigationConfig(user.userType);
  }, [user?.userType]);

  const activeIndex = useMemo(() => {
    return navigation.findIndex((item) =>
      isActiveRoute(item.href, location.pathname)
    );
  }, [navigation, location.pathname]);

  useEffect(() => {
    if (navRefs.current[activeIndex] && activeIndex !== -1) {
      const activeElement = navRefs.current[activeIndex];
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        });
      }
    }
  }, [activeIndex, navigation]);

  const handleMouseEnter = (index: number) => {
    const targetElement = navRefs.current[index];
    if (targetElement) {
      setIndicatorStyle({
        left: targetElement.offsetLeft,
        width: targetElement.offsetWidth,
      });
    }
  };

  const handleMouseLeave = () => {
    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const activeElement = navRefs.current[activeIndex];
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        });
      }
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_AUTH");
    localStorage.removeItem("USER_AUTH");
    deleteUser();
    navigate(ROUTES.Auth.Login);
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  return {
    // States
    indicatorStyle,
    mobileMenuOpen,
    setMobileMenuOpen,
    navRefs,

    // Computed data
    navigation,
    activeIndex,
    user,
    userNavigation,
    location,

    // Handlers
    handleMouseEnter,
    handleMouseLeave,
    handleNavClick,
    handleLogoutClick,
  };
};
