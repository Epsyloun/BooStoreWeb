import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let role = "user";

    if (!userSnap.exists()) {
      // usuario nuevo
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        role: "user",
      });
    } else {
      // usuario existente → leemos su rol
      role = userSnap.data().role;
    }

    //console.log("Login OK:", user.email, "Role:", role);

    // revisamos el role
    if (role !== "admin") {
      console.warn("Usuario sin acceso de admin");
      return null;
    }

    // usuario admin → devolvemos su info con el rol incluido
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "admin",
    };
  } catch (error) {
    console.error("Error en login:", error);
    return null;
  }
};
