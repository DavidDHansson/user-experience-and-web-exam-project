import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, query, where, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore/lite';
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
        const docs = await getDocs(userQuery);

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

        return user;
    } catch (err) {
        console.error(err);
        return err;
    }
};

const logOut = () => signOut(auth);

const getHistoryAndUserFromUUID = async (userUUID) => {
    const user = await getUserFromUserUUID(userUUID);
    const historyQuery = query(collection(db, "history"), where("user", "==", user.id));
    const docs = await getDocs(historyQuery);
    
    const data = [];
    docs.forEach(entry => data.push(entry.data()));
    
    return {user: user, history: data};
};

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

    // To be sure stop booking if any
    await stopBooking(userUUID)

    // Get user from uid and update field
    const user = await getUserFromUserUUID(userUUID);
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, { currentlyRenting: carId, isRenting: true }, { merge: true });

    // Update car field
    const carRef = doc(db, "cars", carId);
    await setDoc(carRef, { currentlyRentedBy: user.id, isBooked: true }, { merge: true });

    // Add history field
    await addDoc(collection(db, "history"), {
        car: carId,
        user: user.id,
        startTime: serverTimestamp(),
        isBookingActive: true,
        price: null,
        endTime: null
    });

};

const stopBooking = async (userUUID) => {

    // Get user from uid and update field
    const user = await getUserFromUserUUID(userUUID);
    const carId = user.data.currentlyRenting;
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, {currentlyRenting: null, isRenting: false}, {merge: true});

    // Update car field
    if (!carId) return;
    const carRef = doc(db, "cars", carId);
    await setDoc(carRef, {currentlyRentedBy: null, isBooked: false}, {merge: true});

    // Update history field
    const historyQuery = query(collection(db, "history"),
        where("car", "==", carId),
        where("user", "==", user.id),
        where("isBookingActive", "==", true));
    const historyDocs = await getDocs(historyQuery);

    historyDocs.forEach(historyDoc => {
        const historyRef = doc(db, "history", historyDoc.id);
        setDoc(historyRef, {isBookingActive: false, price: 100, endTime: serverTimestamp()}, {merge: true});
    });

}

const getActiveBooking = async (userUUID) => {
    // Get user from uid and update field
    const user = await getUserFromUserUUID(userUUID);
    const carId = user.data.currentlyRenting;

    if (!carId) return;

    // Get booking
    const historyQuery = query(collection(db, "history"),
        where("car", "==", carId),
        where("user", "==", user.id),
        where("isBookingActive", "==", true));
    const historyDocs = await getDocs(historyQuery);

    let data = [];
    historyDocs.forEach(doc => data.push(doc.data()));
    return data[0];
}

/*
 *   GET CARS
 */

const getCars = async () => {
    const carQuery = query(collection(db, "cars"));
    const docs = await getDocs(carQuery);

    let carDataWithId = [];
    docs.forEach(doc => carDataWithId.push({id: doc.id, ...doc.data()}));

    return carDataWithId;
}

const getCarFromId = async (carId) => {
    const carRef = doc(db, "cars", carId);
    const carDoc = await getDoc(carRef);
    const carData = carDoc.data();

    if (carData) {
        return {id: carId, ...carData};
    } else {
        return null;
    }
}

export {
    signIn,
    logOut,
    auth,
    getUserFromUserUUID,
    startBooking,
    stopBooking,
    getCars,
    getCarFromId,
    getHistoryAndUserFromUUID,
    getActiveBooking
};
