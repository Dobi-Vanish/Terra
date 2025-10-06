package main

import (
	"log"
	"net/http"
)

func main() {
	// Обслуживание статических файлов из папки web
	fs := http.FileServer(http.Dir("../../web"))
	http.Handle("/", fs)

	// API endpoints (можно добавить позже)
	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status": "ok", "message": "Server is running"}`))
	})

	// Запуск сервера
	log.Println("Сервер запущен на http://localhost:8080")
	log.Println("Статические файлы обслуживаются из папки web/")
	log.Println("Доступные страницы:")
	log.Println("  http://localhost:8080 - Главная")
	log.Println("  http://localhost:8080/races.html - Расы")
	log.Println("  http://localhost:8080/classes.html - Классы")
	log.Println("  http://localhost:8080/religions.html - Религии")
	log.Println("  http://localhost:8080/applications.html - Анкеты")
	log.Println("  http://localhost:8080/mechanics.html - Механики")
	log.Println("  http://localhost:8080/abilities.html - Способности")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Ошибка запуска сервера: ", err)
	}
}
