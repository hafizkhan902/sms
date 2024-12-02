document.addEventListener('DOMContentLoaded', async function() {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('teacherLoggedIn');
    const role = localStorage.getItem('teacherRole');
    
    if (!isLoggedIn || role !== 'admin') {
        window.location.href = 'teacher-login.html';
        return;
    }

    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = currentDate;

    // Update statistics
    try {
        // Get total students
        const studentsResponse = await fetch('students.json');
        const studentsData = await studentsResponse.json();
        document.getElementById('totalStudents').textContent = studentsData.students.length;

        // Get total teachers
        const teachersResponse = await fetch('teachers.json');
        const teachersData = await teachersResponse.json();
        document.getElementById('totalTeachers').textContent = teachersData.teachers.length;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('teacherLoggedIn');
    localStorage.removeItem('teacherRole');
    localStorage.removeItem('teacherUsername');
    window.location.href = 'teacher-login.html';
}); 