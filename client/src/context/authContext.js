import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProcider = ({children}) => {
const [currentUser] = useState(
JSON.parse (localStorage.getItem("profile")) || null
);



useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
},[currentUser])


return(
    <AuthContext.Provider value= {{currentUser}}>
        {children}
    </AuthContext.Provider>
);

};