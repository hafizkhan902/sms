document.getElementById('teacherLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch teacher credentials from JSON file
        const response = await fetch('teachers.json');
        const data = await response.json();
        
        // Find matching teacher
        const teacher = data.teachers.find(t => 
            t.username === username && t.password === password
        );

        if (teacher) {
            // Store login state and role
            localStorage.setItem('teacherLoggedIn', 'true');
            localStorage.setItem('teacherRole', teacher.role);
            localStorage.setItem('teacherUsername', teacher.username);
            
            // Redirect based on role
            if (teacher.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'teacher-dashboard.html';
            }
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    }
}); 