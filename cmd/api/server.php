<?php
$port = 8080;
$web_root = realpath(__DIR__ . '/../../web');

// Встроенный PHP сервер для разработки
if (php_sapi_name() === 'cli-server') {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    // API endpoint
    if ($path === '/api/health') {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'ok', 'message' => 'Server is running']);
        exit;
    }

    // Статические файлы
    if ($path === '/') {
        $file = $web_root . '/index.html';
    } else {
        $file = $web_root . $path;
    }

    if (file_exists($file) && is_file($file)) {
        $mime_types = [
            'html' => 'text/html',
            'css'  => 'text/css',
            'js'   => 'application/javascript',
            'json' => 'application/json',
            'png'  => 'image/png',
            'jpg'  => 'image/jpeg',
            'gif'  => 'image/gif'
        ];

        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (isset($mime_types[$ext])) {
            header('Content-Type: ' . $mime_types[$ext]);
        }

        readfile($file);
        exit;
    }

    // Если файл не найден
    http_response_code(404);
    echo '404 Not Found';
    exit;
}

// Запуск только из командной строки
if (php_sapi_name() === 'cli') {
    echo "Сервер запущен на http://localhost:$port\n";
    echo "Статические файлы обслуживаются из папки web/\n";
    echo "Доступные страницы:\n";
    echo "  http://localhost:$port - Главная\n";
    echo "  http://localhost:$port/races.html - Расы\n";
    echo "  http://localhost:$port/classes.html - Классы\n";
    echo "  http://localhost:$port/religions.html - Религии\n";
    echo "  http://localhost:$port/applications.html - Анкеты\n";
    echo "  http://localhost:$port/mechanics.html - Механики\n";
    echo "  http://localhost:$port/abilities.html - Способности\n";

    exec("php -S localhost:$port " . __FILE__);
} else {
    echo "Запустите этот скрипт из командной строки: php server.php\n";
}
?>