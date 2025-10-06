// Основной JavaScript для RPG сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('RPG World website loaded successfully!');

    // Добавьте этот код в существующий script.js

// Обработчик формы создания персонажа
    const characterForm = document.getElementById('characterForm');
    if (characterForm) {
        characterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const characterName = document.getElementById('characterName').value;
            const playerName = document.getElementById('playerName').value;
            const characterRace = document.getElementById('characterRace').value;
            const characterClass = document.getElementById('characterClass').value;

            // Проверка заполнения обязательных полей
            if (!characterName || !playerName || !characterRace || !characterClass) {
                showNotification('Пожалуйста, заполните все обязательные поля!', 'danger');
                return;
            }

            // Проверка бюджета характеристик
            const baseSum = parseInt(document.getElementById('baseSum').textContent);
            if (baseSum > 120) {
                showNotification('Сумма базовых характеристик превышает допустимый бюджет 120 очка!', 'danger');
                return;
            }

            if (baseSum < 120) {
                if (!confirm(`Вы использовали только ${baseSum} из 120 очков. Продолжить создание персонажа?`)) {
                    return;
                }
            }

            // Сбор данных характеристик
            const stats = {};
            ['strength', 'constitution', 'dexterity', 'intelligence', 'wisdom', 'charisma'].forEach(stat => {
                stats[stat] = {
                    base: parseInt(document.getElementById(stat + 'Base').value),
                    race: parseInt(document.getElementById(stat + 'Race').value),
                    class: parseInt(document.getElementById(stat + 'Class').value),
                    bonus: parseInt(document.getElementById(stat + 'Bonus').value),
                    total: parseInt(document.getElementById(stat + 'Total').textContent),
                    modifier: document.getElementById(stat + 'Mod').textContent
                };
            });

            // Создание объекта персонажа
            const character = {
                name: characterName,
                player: playerName,
                race: characterRace,
                class: characterClass,
                alignment: document.getElementById('characterAlignment').value,
                background: document.getElementById('characterBackground').value,
                stats: stats,
                derived: {
                    hp: document.getElementById('hpTotal').textContent,
                    ac: document.getElementById('acTotal').textContent,
                    initiative: document.getElementById('initiativeTotal').textContent,
                    skillSlots: document.getElementById('skillSlots').textContent
                },
                createdAt: new Date().toISOString()
            };

            // Сохранение в localStorage (можно заменить на отправку на сервер)
            saveCharacter(character);

            showNotification(`Персонаж "${characterName}" успешно создан и отправлен на модерацию!`, 'success');

            // Очистка формы
            setTimeout(() => {
                characterForm.reset();
                resetForm();
            }, 2000);
        });
    }

    function saveCharacter(character) {
        // Получаем существующих персонажей из localStorage
        const savedCharacters = JSON.parse(localStorage.getItem('rpgCharacters') || '[]');

        // Добавляем нового персонажа
        savedCharacters.push(character);

        // Сохраняем обратно в localStorage
        localStorage.setItem('rpgCharacters', JSON.stringify(savedCharacters));

        console.log('Персонаж сохранен:', character);
    }

// Функция показа уведомлений (дополнение к существующей)
    function showNotification(message, type = 'info') {
        // ... существующий код показа уведомлений ...
    }

    // Добавление интерактивности к карточкам
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });



    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Функциональность для страницы религий
    function initReligionsPage() {
        // Подсветка карточек по мировоззрению при наведении
        const godCards = document.querySelectorAll('.god-card');
        godCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const alignment = this.getAttribute('data-alignment');
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Фильтрация по мировоззрению (можно добавить позже)
        console.log('Religions page initialized');
    }

// Инициализация при загрузке страницы
    if (window.location.pathname.includes('religions.html')) {
        document.addEventListener('DOMContentLoaded', initReligionsPage);
    }

    // Система уведомлений
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show`;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';

        document.body.appendChild(notification);

        // Автоматическое скрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Пример использования уведомлений
    if (window.location.hash === '#welcome') {
        showNotification('Добро пожаловать в RPG Мир!', 'success');
    }
});