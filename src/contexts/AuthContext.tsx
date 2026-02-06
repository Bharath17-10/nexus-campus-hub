import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase.config';

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: string;
    preferences?: {
        dietary?: string[];
        favorites?: string[];
        allergies?: string[];
    };
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signup: (email: string, password: string, displayName: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                // Fetch user profile from Firestore
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserProfile(userDoc.data() as UserProfile);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string, displayName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile
            await updateProfile(user, { displayName });

            // Create user profile in Firestore
            const userProfile: UserProfile = {
                uid: user.uid,
                email: user.email!,
                displayName,
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, 'users', user.uid), userProfile);
            setUserProfile(userProfile);
        } catch (error: any) {
            console.error('Signup error:', error);

            // Provide user-friendly error messages
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('This email is already registered. Please login instead.');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Invalid email address.');
            } else if (error.code === 'auth/weak-password') {
                throw new Error('Password is too weak. Use at least 6 characters.');
            } else if (error.code === 'auth/operation-not-allowed') {
                throw new Error('Email/Password authentication is not enabled. Please contact support.');
            } else if (error.code === 'auth/missing-email') {
                throw new Error('Please enter an email address.');
            } else {
                throw new Error(error.message || 'Failed to create account. Please try again.');
            }
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error('Login error:', error);

            if (error.code === 'auth/user-not-found') {
                throw new Error('No account found with this email. Please sign up first.');
            } else if (error.code === 'auth/wrong-password') {
                throw new Error('Incorrect password. Please try again.');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Invalid email address.');
            } else if (error.code === 'auth/user-disabled') {
                throw new Error('This account has been disabled.');
            } else if (error.code === 'auth/invalid-credential') {
                throw new Error('Invalid credentials. Please check your email and password.');
            } else {
                throw new Error(error.message || 'Failed to login. Please try again.');
            }
        }
    };

    const loginWithGoogle = async () => {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        // Check if user profile exists, if not create one
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            const userProfile: UserProfile = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || 'User',
                photoURL: user.photoURL || undefined,
                createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', user.uid), userProfile);
            setUserProfile(userProfile);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUserProfile(null);
    };

    const value = {
        user,
        userProfile,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
