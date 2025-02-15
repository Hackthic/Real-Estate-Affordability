import React, { useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // 🔹 Import Firestore

const db = getFirestore(); // 🔹 Initialize Firestore

const AuthModal = ({ onClose, onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // 🔹 Save user info to Firestore if first-time login
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        uid: result.user.uid,
        provider: "google"
      }, { merge: true });
      
      onAuthSuccess();
    } catch (error) {
      alert(error.message);
    }
  };

  // Email Login or Signup
  const handleEmailAuth = async () => {
    try {
      let userCredential;
      
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // 🔹 Save new user to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          provider: "email"
        });
      }
      
      onAuthSuccess();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailAuth} className="bg-blue-600 text-white p-2 w-full my-2">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 w-full my-2">
          Login with Google
        </button>
        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
        <button onClick={onClose} className="bg-gray-400 text-white p-2 w-full my-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
