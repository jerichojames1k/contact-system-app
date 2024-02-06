import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const RequireAuth:React.FC<any> = ({ allowedRoles }) => {
    const { auth } = useAuth() as any;
  // const modules = useSelector((state: RootState) => state.credentialReducer)
 //  console.log("%c 🇨🇨: modules ", "font-size:16px;background-color:#41671d;color:white;", modules)
   //const {roles,accessToken}=auth ?? {}
    const location = useLocation();
    return (
        auth?.roles?.find((role: string) => allowedRoles?.includes(parseInt(role)))
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signIn" state={{ from: location }} replace />
    );
}

export default RequireAuth;