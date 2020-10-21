//Фронт идей:
//Кол-во очков
//Голова змейки имеет другой цвет
//Фрукт появляется в рандомном месте изначально
//Окончание игры
//Добавить таймер

//Настройки игры?
//Дебаг-мод? (показывает и клетки)
//Размеры окна?
//Экстрим-мод? === Динамическая игра в змейку. При определ. кол-ве 
//очков происходит событие. К примеру: змейка ускоряется, или же поле увеличивается.
//Просиходить будет примерно рандомно
//Перенос всех важных переменных в  .json?

//Игровые параметры
const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');
const grid = 16;

let count = 0;
let points = 0;

let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 3,
};

let fruit = {
    x: 320,
    y: 320
};

//Генератор случайных чисел
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
};

//Игровой цикл
function loop() {
    requestAnimationFrame(loop);

    if (++count < 4) {
        return;
    };

    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
    }

    //Рисуем
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "20px sans-serif";
    ctx.fillText(points, 10, 30);

    ctx.fillStyle = 'blue';
    ctx.fillRect(fruit.x, fruit.y, grid - 1, grid - 1);

    ctx.fillStyle = 'green';

    snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === fruit.x && cell.y === fruit.y) {
            snake.maxCells++;
            fruit.x = getRandomInt(0, 25) * grid;
            fruit.y = getRandomInt(0, 25) * grid;

            points++;
            console.log(points);
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 3;
                snake.dx = grid;
                snake.dy = 0;
                points = 0;

                fruit.x = getRandomInt(0, 25) * grid;
                fruit.y = getRandomInt(0, 25) * grid;
            }
        }
    });
};

document.addEventListener('keydown', function(e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(loop);