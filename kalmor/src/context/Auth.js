import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider ({children}){
    const [currentUser, setCurrrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrrentUser(user);
            setLoading(false);
        });

        return unsuscribe;
    }, [])


    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    const value = {
        currentUser,
        logout,
        resetPassword
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}