<?php
header('Content-Type: application/json');

try {
    // Get POST data
    $jsonData = file_get_contents('php://input');
    $studentData = json_decode($jsonData, true);

    // Validate required fields
    if (!$studentData || 
        empty($studentData['name']) || 
        empty($studentData['rollNo']) || 
        empty($studentData['username']) || 
        empty($studentData['password'])) {
        throw new Exception('Missing required fields');
    }

    // Read existing students data
    $studentsFile = 'students.json';
    $currentData = [];
    
    if (file_exists($studentsFile)) {
        $currentJson = file_get_contents($studentsFile);
        $currentData = json_decode($currentJson, true);
    }

    if (!is_array($currentData)) {
        $currentData = ['students' => []];
    }

    // Check if username or roll number already exists
    foreach ($currentData['students'] as $student) {
        if ($student['username'] === $studentData['username']) {
            http_response_code(400);
            echo json_encode(['error' => 'Username already exists']);
            exit;
        }
        if ($student['rollNo'] === $studentData['rollNo']) {
            http_response_code(400);
            echo json_encode(['error' => 'Roll number already exists']);
            exit;
        }
    }

    // Add new student
    $currentData['students'][] = $studentData;

    // Save back to file
    if (file_put_contents($studentsFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode(['message' => 'Student added successfully']);
    } else {
        throw new Exception('Failed to save data');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 