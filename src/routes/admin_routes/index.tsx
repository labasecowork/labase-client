import * as admin from "@/modules/admin";
import { ROUTES } from "../routes";

export const adminRoutes = {
  path: "/admin",
  children: [
    // Calendar
    {
      path: ROUTES.Admin.ViewCalendar,
      element: <admin.ViewCalendarPage />,
    },
    // Reservations
    {
      path: ROUTES.Admin.ScanCodeQRReservation,
      element: <admin.ScanQRReservationsPage />,
    },
    {
      path: ROUTES.Admin.ViewDetailsReservation,
      element: <admin.ViewReservationPage />,
    },
    {
      path: ROUTES.Admin.ViewAllReservations,
      element: <admin.ViewAllReservationsPage />,
    },
    // Newsletter
    {
      path: ROUTES.Admin.SendNewsletter,
      element: <admin.SendNewsletterPage />,
    },
    // Spaces
    {
      path: ROUTES.Admin.ViewSpaces,
      element: <admin.ViewSpacesPage />,
    },
    {
      path: ROUTES.Admin.CreateSpace,
      element: <admin.CreateSpacePage />,
    },
    {
      path: ROUTES.Admin.ViewSpace,
      element: <admin.ViewSpacePage />,
    },
    {
      path: ROUTES.Admin.EditSpace,
      element: <admin.EditSpacePage />,
    },
    // Employees
    {
      path: ROUTES.Admin.ViewEmployees,
      element: <admin.ViewEmployeesPage />,
    },
    {
      path: ROUTES.Admin.CreateEmployee,
      element: <admin.CreateEmployeePage />,
    },
    {
      path: ROUTES.Admin.EditEmployee,
      element: <admin.EditEmployeePage />,
    },
    // Attendances
    {
      path: ROUTES.Admin.ViewAttendances,
      element: <admin.ViewAttendancesPage />,
    },
    // Articles
    {
      path: ROUTES.Admin.ViewArticles,
      element: <admin.ViewArticlesPage />,
    },
    {
      path: ROUTES.Admin.CreateArticle,
      element: <admin.CreateArticlePage />,
    },
    {
      path: ROUTES.Admin.EditArticle,
      element: <admin.EditArticlePage />,
    },
    {
      path: ROUTES.Admin.DeleteArticle,
      element: <admin.DeleteArticlePage />,
    },
    // Categories
    {
      path: ROUTES.Admin.ViewCategories,
      element: <admin.ViewCategoriesPage />,
    },
    {
      path: ROUTES.Admin.CreateCategory,
      element: <admin.CreateCategoryPage />,
    },
    {
      path: ROUTES.Admin.EditCategory,
      element: <admin.EditCategoryPage />,
    },
    {
      path: ROUTES.Admin.DeleteCategory,
      element: <admin.DeleteCategoryPage />,
    },
    // Tools
    {
      path: ROUTES.Admin.ViewTools,
      element: <admin.ViewToolsPage />,
    },
  ],
};
