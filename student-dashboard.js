document.addEventListener('DOMContentLoaded', function() {
    // Check if student is logged in
    const isLoggedIn = localStorage.getItem('studentLoggedIn');
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));

    if (!isLoggedIn || !studentInfo) {
        window.location.href = 'student-login.html';
        return;
    }

    // Update student information
    document.getElementById('studentName').textContent = studentInfo.name;
    document.getElementById('studentClass').textContent = studentInfo.class;
    document.getElementById('studentRoll').textContent = studentInfo.rollNo;
    document.getElementById('studentEmail').textContent = studentInfo.email;
    document.getElementById('studentPhone').textContent = studentInfo.phone;
    document.getElementById('studentUsername').textContent = studentInfo.username;
    document.getElementById('studentFullName').textContent = studentInfo.name;
    document.getElementById('studentClassDetail').textContent = studentInfo.class;

    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = currentDate;
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentInfo');
    window.location.href = 'student-login.html';
}); 