async function updateStudentCount() {
    try {
        const response = await fetch('students.json');
        const data = await response.json();
        const totalStudents = data.students.length;
        document.getElementById('totalStudents').textContent = totalStudents;
    } catch (error) {
        console.error('Error fetching student count:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if teacher is logged in
    const isLoggedIn = localStorage.getItem('teacherLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'teacher-login.html';
        return;
    }
    
    updateStudentCount();
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('teacherLoggedIn');
    localStorage.removeItem('teacherRole');
    localStorage.removeItem('teacherUsername');
    window.location.href = 'teacher-login.html';
}); 