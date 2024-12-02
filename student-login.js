document.getElementById('studentLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch student data from students.json
        const response = await fetch('students.json');
        const data = await response.json();
        
        // Find matching student
        const student = data.students.find(s => 
            s.username === username && s.password === password
        );

        if (student) {
            // Store student info in localStorage (except password)
            const studentInfo = { ...student };
            delete studentInfo.password;
            localStorage.setItem('studentLoggedIn', 'true');
            localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
            
            window.location.href = 'student-dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    }
}); 