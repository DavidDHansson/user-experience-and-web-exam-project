import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc } from 'firebase/firestore/lite';
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIE554LN8S2_OjMpVxBr5YMbFEZmdc5tc",
    authDomain: "ux-and-web-exam-project.firebaseapp.com",
    projectId: "ux-and-web-exam-project",
    storageBucket: "ux-and-web-exam-project.appspot.com",
    messagingSenderId: "607639095861",
    appId: "1:607639095861:web:5304cc7d7b1cf270a13f7c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signIn = async () => {

    const googleProvider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(userQuery)

        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                icon: user.photoURL,
                currentlyRenting: null
            });
        }
    } catch (err) {
        console.error(err);
    }
};

const logOut = () => signOut(auth);

export { signIn, logOut, auth };
