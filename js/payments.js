import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

async function loadPayments() {
    const paymentsList = document.getElementById("paymentsList");
    paymentsList.innerHTML = "<p>جاري تحميل المدفوعات...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        let html = "<table><tr><th>رقم الفاتورة</th><th>الاسم</th><th>المبلغ</th><th>الحالة</th></tr>";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `<tr>
        <td>${data.invoice_id}</td>
        <td>${data.student_name}</td>
        <td>${data.amount}</td>
        <td>${data.status}</td>
      </tr>`;
        });
        html += "</table>";
        paymentsList.innerHTML = html;
    } catch (error) {
        console.error("Error fetching payments:", error);
        paymentsList.innerHTML = "<p>خطأ في جلب البيانات.</p>";
    }
}

loadPayments();
