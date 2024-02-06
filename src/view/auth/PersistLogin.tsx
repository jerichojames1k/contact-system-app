import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loading from "../common/Loading";

const PersistLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth() as any;
 // const modules = useSelector((state: RootState) => state.credentialReducer);

 // const { roles, accessToken } = modules ?? {};
 // const persist = true;
  const handleData = () => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  };
  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);
  const myFunction = () => {};

  // Set a timeout for 2 seconds (2000 milliseconds)

  useEffect(() => {
    if (isLoading) {
      const myTimeout = setTimeout(myFunction, 2000);
      return () => {
        clearTimeout(myTimeout);
      };
    }
  }, [isLoading]);
  return (
    <>{isLoading ? <Loading/>: <Outlet />}</>
  );
};

export default PersistLogin;
