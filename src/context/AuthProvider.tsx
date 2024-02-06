import { createContext, useState } from "react";
export interface IAuthProps {
    email?:string
    pwd?:string
    roles?:string[] 
    accessToken?:string
    userId?:string
}
export interface IDataAuth{
    auth?:IAuthProps
    setAuth?: React.Dispatch<React.SetStateAction<IAuthProps>> 
}
const AuthContext = createContext<IDataAuth>({});


export const AuthProvider:React.FC<any> = ({ children }) => {
    const [auth, setAuth] = useState<IAuthProps>({});
    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;