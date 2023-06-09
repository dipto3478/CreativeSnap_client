import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getRole } from "../api/role";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      getRole(user?.email).then((data) => setRole(data));
    }
  }, [user]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userProfileUpdate = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscription = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_URL}/jwt`, {
            email: currentUser?.email,
          })
          .then((data) => {
            localStorage.setItem("token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
      setUser(currentUser);
    });
    return () => unSubscription();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    loginWithGoogle,
    userProfileUpdate,
    role,
    setRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
