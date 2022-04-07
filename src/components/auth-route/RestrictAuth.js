import { useUser } from "context";
import { Navigate, Outlet } from "react-router-dom";

export function RestrictAuth() {
  const { getToken } = useUser();

  return getToken ? <Navigate to="/" replace /> : <Outlet />;
}
