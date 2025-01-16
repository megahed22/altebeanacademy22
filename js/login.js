المصادقة
const auth = getAuth(app);

// تعريف وظيفة تسجيل الدخول
const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // تسجيل الدخول بنجاح
            console.log("Logged in:", userCredential.user);
            // يمكنك إعادة توجيه المستخدم إلى صفحة أخرى بناءً على دوره
            if (userCredential.user.role === "teacher") {
                window.location.href = "dashboard-teacher.html"; // رابط لوحة تحكم المعلم
            } else {
                window.location.href = "dashboard-student.html"; // رابط لوحة تحكم الطالب
            }
        })
        .catch(error => {
            // التعامل مع الأخطاء
            console.error("Login error:", error.message);
            alert("Error logging in: " + error.message);
        });
};

// ربط الوظيفة بـ HTML
document.getElementById("login-button").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // استدعاء وظيفة تسجيل الدخول
    loginUser(email, password);
});