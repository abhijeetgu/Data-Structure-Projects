function init(){
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height =680;
    
    pen = canvas.getContext('2d');
    cs = 40;
    game_over = false;
    score =  5;

    //Create a Image Object for food
    food_img = new Image();
    food_img.src =  "Assets/apple.png";

    //Add trophy
    trophy = new Image();
    trophy.src = "Assets/trophy.png"
    food = getRandomFood();
    
    //Snake Object
    snake = {
        init_len : 5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){

            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }

        },
        updateSnake:function(){
            // console.log("updating snake according to the direction property");
            //check if the snake has eaten food,increase the length the length of the snake and
            //generate new food object
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                console.log("food eaten");
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            
            
            var nextX,nextY;
            // For controlling sanke with certain keys
            if(this.direction=="right"){
                nextX = headX+1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY+1;
            }
            else{
                nextX = headX;
                nextY = headY-1;
            } 
            
            this.cells.unshift({x:nextX,y:nextY});

            // Write a logic that prevents snake from going out
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over = true;
            }

        }

    };


    snake.createSnake();
    //Add a Event Listener on the Document Object
    function keyPressed(e){
        if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction); 
    }

    document.addEventListener('keydown',keyPressed);
}


function draw(){

    //to erase the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    
    pen.drawImage(trophy,10,20,cs,cs);
    // Show score on canvas
    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score,25,38);
}


function update(){

   snake.updateSnake();
   
}


function getRandomFood(){

    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

     food ={
        x:foodX,
        y:foodY,
        color:"red",
    }
    // for(let cell of snake.cells[0]){
    //     if(cell.x == food.x && food.y == cell.y){
    //         return getRandomFood();
    //     }
    // }
    
    return food;
   
}


function gameloop(){
    if(game_over == true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();

var f = setInterval(gameloop,120);