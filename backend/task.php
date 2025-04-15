<?php
include('db.php');

// إضافة مهمة جديدة
if (isset($_POST['task_name'])) {
    $task_name = $_POST['task_name'];
    $stmt = $conn->prepare("INSERT INTO tasks (task_name) VALUES (:task_name)");
    $stmt->bindParam(':task_name', $task_name);
    $stmt->execute();
    echo "Task added successfully!";
}

// عرض المهام
if (isset($_GET['action']) && $_GET['action'] == 'get_tasks') {
    $stmt = $conn->query("SELECT * FROM tasks");
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
}

// حذف مهمة
if (isset($_POST['delete_task_id'])) {
    $task_id = $_POST['delete_task_id'];
    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = :id");
    $stmt->bindParam(':id', $task_id);
    $stmt->execute();
    echo "Task deleted successfully!";
}
?>
