import React, { useState } from "react";

const AuthContext = React.createContext({
    loggedIn: false,
    onLogin: () => {},
    onLogout: () => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getLoggedInStatus());

    function getLoggedInStatus() {
        if (sessionStorage.getItem("userData")) {
            const userData = JSON.parse(sessionStorage.getItem("userData"));
            if (new Date(userData.expires).getTime() > (new Date().getTime())) {
                return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

    }

    function loginHandler() {
        setIsLoggedIn(true);

    }

    function logoutHandler(){
        setIsLoggedIn(false);

    }
    return (
        <AuthContext.Provider value={{
            loggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler
          }}>
            {props.children}
          </AuthContext.Provider>
        );
}
export default AuthContext;