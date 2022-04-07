import { useUser } from "context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequiresAuth() {
  const { getToken } = useUser();

  const location = useLocation();

  return getToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
