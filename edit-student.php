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
        empty($studentData['email'])) {
        throw new Exception('Missing required fields');
    }

    // Read current students data
    $studentsFile = 'students.json';
    $currentJson = file_get_contents($studentsFile);
    $currentData = json_decode($currentJson, true);

    // Find and update the student
    $found = false;
    foreach ($currentData['students'] as &$student) {
        if ($student['rollNo'] === $studentData['rollNo']) {
            // Preserve password if not changed
            if (!isset($studentData['password'])) {
                $studentData['password'] = $student['password'];
            }
            $student = $studentData;
            $found = true;
            break;
        }
    }

    if (!$found) {
        throw new Exception('Student not found');
    }

    // Save updated data back to file
    if (file_put_contents($studentsFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode(['message' => 'Student updated successfully']);
    } else {
        throw new Exception('Failed to save data');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 