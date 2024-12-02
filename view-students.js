async function loadStudents() {
    try {
        const response = await fetch('students.json');
        const data = await response.json();
        
        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = ''; // Clear existing content

        if (data.students && data.students.length > 0) {
            data.students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.rollNo}</td>
                    <td>${student.class}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.username}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" onclick="editStudent('${student.rollNo}')">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent('${student.rollNo}')">Delete</button>
                    </td>
                `;
                studentsList.appendChild(row);
            });
        } else {
            studentsList.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-message">No students found</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('Error loading students:', error);
        document.getElementById('studentsList').innerHTML = `
            <tr>
                <td colspan="7" class="empty-message">Error loading student data</td>
            </tr>
        `;
    }
}

async function deleteStudent(rollNo) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const response = await fetch('delete-student.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rollNo: rollNo })
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Student deleted successfully');
                loadStudents(); // Reload the list
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting student');
        }
    }
}

function editStudent(rollNo) {
    // Store the rollNo in localStorage to identify which student to edit
    localStorage.setItem('editStudentRollNo', rollNo);
    window.location.href = 'edit-student.html';
}

// Load students when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if teacher is logged in
    const isLoggedIn = localStorage.getItem('teacherLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'teacher-login.html';
        return;
    }
    
    loadStudents();
}); 