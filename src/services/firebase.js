import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc, setDoc, doc } from 'firebase/firestore/lite';
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

/*
 *   AUTHENTICATION
 */

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
                currentlyRenting: null,
                isRenting: false
            });
        }
    } catch (err) {
        console.error(err);
    }
};

const logOut = () => signOut(auth);



/*
 *   HELPER METHODS
 */

const getUserFromUserUUID = async (userUUID) => {
    const userQuery = query(collection(db, "users"), where("uid", "==", userUUID));
    const docs = await getDocs(userQuery);
    return { data: docs.docs[0].data(), id: docs.docs[0].id };
}

/*
 *   BOOKING
 */

const startBooking = async (carId, userUUID) => {

    // Get user from uid and update field
    const user = await getUserFromUserUUID(userUUID);
    const userRef = doc(db, "users", user.id)
    await setDoc(userRef, { currentlyRenting: carId, isRenting: true }, { merge: true })

    // Update car field
    const carRef = doc(db, "cars", carId)
    await setDoc(carRef, { currentlyRentedBy: user.id, isBooked: true }, { merge: true })

};

const stopBooking = async (userUUID) => {
    
    // Get user from uid and update field
    const user = await getUserFromUserUUID(userUUID);
    const currentlyRenting = user.data.currentlyRenting;
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, { currentlyRenting: null, isRenting: false }, { merge: true });
    
    // Update car field
    if (currentlyRenting) {
        const carRef = doc(db, "cars", currentlyRenting);
        await setDoc(carRef, { currentlyRentedBy: null, isBooked: true }, { merge: true });
    }

}

export { signIn, logOut, auth, startBooking, stopBooking };
