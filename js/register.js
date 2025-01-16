import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // تخزين البيانات في Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            role,
            createdAt: new Date()
        });

        if (role === "teacher") {
            window.location.href = "teacher-dashboard.html";
        } else {
            window.location.href = "student-dashboard.html";
        }
    } catch (error) {
        console.error("Error registering:", error.message);
    }
});