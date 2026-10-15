/* --- ДАННЫЕ РЕЦЕПТОВ (Базовые значения на 1 блин) --- */
/* --- ДАННЫЕ РЕЦЕПТОВ (Базовые значения на 1 блин) --- */
const recipesData = {
    classic: {
        title: "Классические на молоке",
        caloriesPerPortion: 85,
        bju: "3г / 2.5г / 12г",
        ingredients: [
            { name: "Молоко", baseQty: 40, unit: "мл" },
            { name: "Мука пшеничная", baseQty: 18, unit: "г" },
            { name: "Яйцо куриное", baseQty: 0.2, unit: "шт" },
            { name: "Сахар", baseQty: 2, unit: "г" },
            { name: "Растительное масло", baseQty: 1.5, unit: "мл" }
        ]
    },
    kefir: {
        title: "Ажурные на кефире",
        caloriesPerPortion: 92,
        bju: "3.5г / 3г / 13г",
        ingredients: [
            { name: "Кефир", baseQty: 45, unit: "мл" },
            { name: "Кипяток", baseQty: 15, unit: "мл" },
            { name: "Мука пшеничная", baseQty: 20, unit: "г" },
            { name: "Яйцо куриное", baseQty: 0.25, unit: "шт" },
            { name: "Сода", baseQty: 0.1, unit: "ч.л." },
            { name: "Масло сливочное (для смазывания)", baseQty: 2, unit: "г" }
        ]
    },
    diet: {
        title: "Диетические (овсяные)",
        caloriesPerPortion: 60,
        bju: "4г / 1.5г / 8г",
        ingredients: [
            { name: "Овсяная мука (или хлопья)", baseQty: 15, unit: "г" },
            { name: "Молоко обезжиренное", baseQty: 35, unit: "мл" },
            { name: "Белок яичный", baseQty: 0.4, unit: "шт" },
            { name: "Сахарозаменитель", baseQty: 0.1, unit: "г" },
            { name: "Кокосовое масло для сковороды", baseQty: 0.5, unit: "мл" }
        ]
    },
    chocolate: {
        title: "Шоколадные десертные",
        caloriesPerPortion: 105,
        bju: "3.2г / 3.8г / 14.5г",
        ingredients: [
            { name: "Молоко", baseQty: 42, unit: "мл" },
            { name: "Мука пшеничная", baseQty: 16, unit: "г" },
            { name: "Какао-порошок", baseQty: 3, unit: "г" },
            { name: "Темный шоколад (растопленный)", baseQty: 4, unit: "г" },
            { name: "Яйцо куриное", baseQty: 0.2, unit: "шт" },
            { name: "Сахарная пудра", baseQty: 3, unit: "г" }
        ]
    },
    pancakes: {
        title: "Американские панкейки",
        caloriesPerPortion: 120,
        bju: "4г / 4.2г / 16.5г",
        ingredients: [
            { name: "Молоко или пахта", baseQty: 35, unit: "мл" },
            { name: "Мука пшеничная", baseQty: 22, unit: "г" },
            { name: "Сливочное масло (растопленное)", baseQty: 3, unit: "г" },
            { name: "Яйцо куриное", baseQty: 0.25, unit: "шт" },
            { name: "Разрыхлитель теста", baseQty: 0.3, unit: "г" },
            { name: "Сахар", baseQty: 3, unit: "г" }
        ]
    },
    yeast: {
        title: "Старорусские на дрожжах",
        caloriesPerPortion: 98,
        bju: "3.6г / 2.8г / 14.2г",
        ingredients: [
            { name: "Молоко (теплое)", baseQty: 50, unit: "мл" },
            { name: "Мука пшеничная", baseQty: 22, unit: "г" },
            { name: "Дрожжи прессованные", baseQty: 1.2, unit: "г" },
            { name: "Яйцо куриное", baseQty: 0.15, unit: "шт" },
            { name: "Сахар", baseQty: 2, unit: "г" },
            { name: "Масло топленое (в тесто)", baseQty: 1.5, unit: "г" }
        ]
    }
};


/* --- ДОКУМЕНТ ЗАГРУЖЕН (Инициализация) --- */
document.addEventListener('DOMContentLoaded', () => {
    
    // Элементы мобильного меню
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

    // Переключение бургер-меню
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылки
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Элементы калькулятора
    const recipeSelect = document.getElementById('recipeSelect');
    const portionsInput = document.getElementById('portionsCount');
    const recipeTitle = document.getElementById('recipeTitle');
    const totalCalories = document.getElementById('totalCalories');
    const bjuRatio = document.getElementById('bjuRatio');
    const ingredientsList = document.getElementById('ingredientsList');

    // Функция обновления калькулятора порций
    function updateCalculator() {
        const selectedKey = recipeSelect.value;
        const portions = parseInt(portionsInput.value) || 1;
        const currentRecipe = recipesData[selectedKey];

        // Обновляем текстовые значения
        recipeTitle.textContent = currentRecipe.title;
        totalCalories.textContent = currentRecipe.caloriesPerPortion * portions;
        bjuRatio.textContent = currentRecipe.bju;

        // Очищаем и заново строим список ингредиентов
        ingredientsList.innerHTML = '';
        currentRecipe.ingredients.forEach(ing => {
            const li = document.createElement('li');
            
            // Расчет и форматирование количества
            let finalQty = ing.baseQty * portions;
            if (finalQty % 1 !== 0) {
                finalQty = finalQty.toFixed(1);
            }

            li.innerHTML = `<span>${ing.name}</span> <strong>${finalQty} ${ing.unit}</strong>`;
            ingredientsList.appendChild(li);
        });
    }

    // Обработчики событий калькулятора
    recipeSelect.addEventListener('change', updateCalculator);
    portionsInput.addEventListener('input', updateCalculator);

    // Первичный расчет при старте
    updateCalculator();

    /* --- ВАЛИДАЦИЯ ФОРМЫ --- */
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFormValid = true;

        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        const messageInput = document.getElementById('formMessage');

        // Регулярное выражение для валидации почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;

        // Проверка Имени
        if (nameInput.value.trim().length < 2) {
            document.getElementById('nameGroup').classList.add('error');
            isFormValid = false;
        } else {
            document.getElementById('nameGroup').classList.remove('error');
        }

        // Проверка Email
        if (!emailRegex.test(emailInput.value.trim())) {
            document.getElementById('emailGroup').classList.add('error');
            isFormValid = false;
        } else {
            document.getElementById('emailGroup').classList.remove('error');
        }

        // Проверка Сообщения
        if (messageInput.value.trim().length < 10) {
            document.getElementById('messageGroup').classList.add('error');
            isFormValid = false;
        } else {
            document.getElementById('messageGroup').classList.remove('error');
        }

        // Действия при успешной валидации
        if (isFormValid) {
            successMessage.style.display = 'block';
            feedbackForm.reset();
            
            // Скрытие плашки успеха через 4 секунды
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 4000);
        }
    });
});
 