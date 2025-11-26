"use client";
import { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";

import auth from "@/lib/firebase.config";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(user);

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSignin = () => {
        return signInWithPopup(auth, googleProvider)
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    };

    const logOut = () => {
        return signOut(auth)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
        registerUser,
        logIn,
        googleSignin,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider
            value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);