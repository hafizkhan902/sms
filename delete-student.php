<?php
header('Content-Type: application/json');

try {
    // Get POST data
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);
    
    if (!isset($data['rollNo'])) {
        throw new Exception('Roll number is required');
    }

    // Read the current students
    $studentsFile = 'students.json';
    $currentJson = file_get_contents($studentsFile);
    $currentData = json_decode($currentJson, true);

    // Find and remove the student
    $found = false;
    $newStudents = array_filter($currentData['students'], function($student) use ($data, &$found) {
        if ($student['rollNo'] === $data['rollNo']) {
            $found = true;
            return false;
        }
        return true;
    });

    if (!$found) {
        throw new Exception('Student not found');
    }

    // Update the file
    $currentData['students'] = array_values($newStudents);
    if (file_put_contents($studentsFile, json_encode($currentData, JSON_PRETTY_PRINT))) {
        echo json_encode(['message' => 'Student deleted successfully']);
    } else {
        throw new Exception('Failed to save data');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 