import { initializeApp } from "firebase/app";
import {
    getAuth,
    GithubAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut
} from "firebase/auth";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    onSnapshot,
    orderBy,
    serverTimestamp,
    writeBatch
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const githubProvider = new GithubAuthProvider();

// Auth Helper Functions
export const loginWithGithub = async () => {
    try {
        // Request public_repo scope for accessing user repositories
        githubProvider.addScope('public_repo');
        const result = await signInWithPopup(auth, githubProvider);

        // Get GitHub access token from credential
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        if (accessToken && result.user) {
            // Store token in Firestore for later API calls
            const docRef = doc(db, "users", result.user.uid);
            await setDoc(docRef, {
                githubAccessToken: accessToken,
                updatedAt: serverTimestamp()
            }, { merge: true });
        }

        return result.user;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Logout failed", error);
        throw error;
    }
};

// Firestore CRUD Helpers

// User Profile
export const getUserProfile = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};

export const updateUserProfile = async (uid: string, data: any) => {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const getUserByUsername = async (username: string) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { uid: doc.id, ...doc.data() };
    }
    return null;
};

// Links
export const subscribeToLinks = (uid: string, callback: (links: any[]) => void) => {
    const q = query(
        collection(db, "users", uid, "links"),
        orderBy("order", "asc") // Assumption: 'order' field for sorting
    );
    return onSnapshot(q, (snapshot) => {
        const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(links);
    });
};

export const addLink = async (uid: string, linkData: any) => {
    const collectionRef = collection(db, "users", uid, "links");
    await setDoc(doc(collectionRef), {
        ...linkData,
        createdAt: serverTimestamp()
    });
};

export const updateLink = async (uid: string, linkId: string, linkData: any) => {
    const docRef = doc(db, "users", uid, "links", linkId);
    await updateDoc(docRef, { ...linkData, updatedAt: serverTimestamp() });
};

export const deleteLink = async (uid: string, linkId: string) => {
    const docRef = doc(db, "users", uid, "links", linkId);
    await deleteDoc(docRef);
};

export const updateLinksOrder = async (uid: string, orderedLinks: { id: string, order: number }[]) => {
    const batch = writeBatch(db);
    orderedLinks.forEach(({ id, order }) => {
        const docRef = doc(db, "users", uid, "links", id);
        batch.set(docRef, { order }, { merge: true });
    });
    await batch.commit();
};
