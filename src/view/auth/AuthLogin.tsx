import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";

const AuthLogin: React.FC = () => {
  const { auth } = useAuth() as any;
  const location = useLocation();
  const from = location.state?.from?.pathname || "/contact";
  const refresh = useRefreshToken();
  useEffect(() => {
    refresh();
  }, []);
  return Object.keys(auth ?? {}).length ? (
    <Navigate to={from} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AuthLogin;
