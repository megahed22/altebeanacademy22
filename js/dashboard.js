import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

async function loadData() {
    const dataDisplay = document.getElementById("dataDisplay");
    dataDisplay.innerHTML = "جاري تحميل البيانات...";

    try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        let html = "<ul>";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += <li>${data.name} - ${data.description}</li>;
        });
        html += "</ul>";
        dataDisplay.innerHTML = html;
    } catch (error) {
        console.error("Error fetching data:", error);
        dataDisplay.innerHTML = "خطأ في جلب البيانات.";
    }
}