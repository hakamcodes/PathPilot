import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db, firebaseConfigured, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [localPath, setLocalPath] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured) {
      setAuthReady(true);
      setProfileReady(true);
      return undefined;
    }
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setAuthReady(true);
      if (!next) {
        setProfile(null);
        setLocalPath(null);
        setProfileReady(true);
      } else {
        setProfileReady(false);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return undefined;
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        const data = snap.exists() ? { id: snap.id, ...snap.data() } : null;
        setProfile(data);
        if (data?.currentPath) setLocalPath(null);
        setProfileReady(true);
      },
      () => setProfileReady(true)
    );
    return unsub;
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      profile,
      localPath,
      setLocalPath,
      authReady,
      profileReady,
      signIn: (email, password) => {
        if (!firebaseConfigured) return Promise.reject(new Error("Add your VITE_FIREBASE_* keys to .env"));
        return signInWithEmailAndPassword(auth, email, password);
      },
      signUp: (email, password) => {
        if (!firebaseConfigured) return Promise.reject(new Error("Add your VITE_FIREBASE_* keys to .env"));
        return createUserWithEmailAndPassword(auth, email, password);
      },
      signInGoogle: () => {
        if (!firebaseConfigured) return Promise.reject(new Error("Add your VITE_FIREBASE_* keys to .env"));
        return signInWithPopup(auth, googleProvider);
      },
      signOut: () => (firebaseConfigured ? firebaseSignOut(auth) : Promise.resolve()),
    }),
    [user, profile, localPath, authReady, profileReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
