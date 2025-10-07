from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__)
STATIC_FOLDER = '../../web'

@app.route('/')
def serve_index():
    return send_from_directory(STATIC_FOLDER, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(STATIC_FOLDER, path)

@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"})

if __name__ == '__main__':
    print("Сервер запущен на http://localhost:8080")
    print("Статические файлы обслуживаются из папки web/")
    print("Доступные страницы:")
    print("  http://localhost:8080 - Главная")
    print("  http://localhost:8080/races.html - Расы")
    print("  http://localhost:8080/classes.html - Классы")
    print("  http://localhost:8080/religions.html - Религии")
    print("  http://localhost:8080/applications.html - Анкеты")
    print("  http://localhost:8080/mechanics.html - Механики")
    print("  http://localhost:8080/abilities.html - Способности")

    app.run(host='0.0.0.0', port=8080, debug=False)