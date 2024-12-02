// Load student data when page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Check if teacher is logged in
    const isLoggedIn = localStorage.getItem('teacherLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'teacher-login.html';
        return;
    }

    const rollNo = localStorage.getItem('editStudentRollNo');
    if (!rollNo) {
        alert('No student selected for editing');
        window.location.href = 'view-students.html';
        return;
    }

    try {
        // Fetch student data
        const response = await fetch('students.json');
        const data = await response.json();
        
        const student = data.students.find(s => s.rollNo === rollNo);
        if (student) {
            // Populate form with student data
            document.getElementById('name').value = student.name;
            document.getElementById('rollNo').value = student.rollNo;
            document.getElementById('username').value = student.username;
            document.getElementById('email').value = student.email;
            document.getElementById('phone').value = student.phone;
            document.getElementById('class').value = student.class;
        } else {
            alert('Student not found');
            window.location.href = 'view-students.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading student data');
    }
});

// Handle form submission
document.getElementById('editStudentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password && password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const studentData = {
        name: document.getElementById('name').value,
        rollNo: document.getElementById('rollNo').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        class: document.getElementById('class').value
    };

    // Only include password if it was changed
    if (password) {
        studentData.password = password;
    }

    try {
        const response = await fetch('edit-student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Student updated successfully!');
            window.location.href = 'view-students.html';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating student');
    }
}); 