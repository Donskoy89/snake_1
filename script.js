let canvas = document.querySelector('#game');
let ctx = canvas.getContext('2d');

let scoreText = document.querySelector('.score');

let foodImg = new Image();
foodImg.src = 'food.png';

let box = 32;

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

let food = {
    x: Math.floor(Math.random()*16) * box,
    y: Math.floor(Math.random()*16) * box
};
let score = 0;

document.addEventListener('keydown', getDirection);
let dir = '';
function getDirection(Event) {
    if(Event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    }
    if(Event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    }
    if(Event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    }
    if(Event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
}
function drawGame() {
    scoreText.innerHTML = score;
    ctx.fillStyle = '#e3e3e3';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(foodImg, food.x, food.y);
    for(let i=0; i<snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(dir == 'left') {
        snakeX -= box;
    } else if(dir == 'right') {
        snakeX += box;
    } else if(dir == 'up') {
        snakeY -= box;
    } else if(dir == 'down') {
        snakeY += box;
    }
    
    if(snakeX < 0) {
        snakeX = 15*box;
    }
    if(snakeX > 15 *box) {
        snakeX = 0;
    }
    if(snakeY < 0) {
        snakeY = 15*box;
    }
    if(snakeY > 15 *box) {
        snakeY = 0;
    }
    
//    if(snakeX == -box || snakeX > 16*box || snakeY == -box || snakeY > 16 * box) {
//        clearInterval(interval);
//        alert('GaME OVER');
//    }
    
    if(snake[0].x == food.x && snake[0].y == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random()*16) * box,
            y: Math.floor(Math.random()*16) * box
        };
        let i=0;
        while(i < snake.length) {
            if(food.x == snake[i].x && food.y == snake[i].y) {
                food = {
                    x: Math.floor(Math.random()*16) * box,
                    y: Math.floor(Math.random()*16) * box
                };
                i = 0;
            }
            i++;
        }
    } else {
        snake.pop();
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    
    eatTail(newHead, snake);
    
    snake.unshift(newHead);
}

function eatTail(head, body) {
    for(let i=0; i<body.length; i++) {
        if(head.x == body[i].x && head.y == body[i].y) {
            clearInterval(interval);
            alert('Game over');
        }
    }
}

let interval = setInterval(drawGame, 100);
    
    
    
    
    
    
    
    
    
    
    