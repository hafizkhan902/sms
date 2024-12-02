document.getElementById('studentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate passwords match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Create student object from form data
    const studentData = {
        name: document.getElementById('name').value,
        rollNo: document.getElementById('rollNo').value,
        username: document.getElementById('username').value,
        password: password,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        class: document.getElementById('class').value
    };

    try {
        const response = await fetch('add-student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Student added successfully!');
            this.reset();
            window.location.href = 'view-students.html';
        } else {
            alert('Error: ' + (data.error || 'Failed to add student'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding student: ' + error.message);
    }
});

// Add validation for username (optional)
document.getElementById('username').addEventListener('input', function(e) {
    // Remove spaces and special characters
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
});

// Add password strength indicator (optional)
document.getElementById('password').addEventListener('input', function(e) {
    const password = this.value;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    
    if (strongRegex.test(password)) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = 'red';
    }
});

// Add confirm password validation
document.getElementById('confirmPassword').addEventListener('input', function(e) {
    const password = document.getElementById('password').value;
    if (this.value === password) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = 'red';
    }
}); 