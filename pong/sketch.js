var score = 0;

//define bola
let ball = {
  //tamnho e radio da bola
  x: 300,
  y: 150,
  radius: 10,
  speed: {
    x: 6,
    y: 0
  },
  draw: function() {
    circle(this.x, this.y, this.radius * 2);
  },
  //função para resetar o lugar onde a bola esta, para começar ou recomeçar o jogo
  reset: function() {
    this.x = width / 2;
    this.y = height / 2;
    this.speed.x = 6;
    this.speed.y = 0;
    this.play = true;
  }
};

//define player 1
let player1 = {
  //tamanhos
  x: 10,
  y: 150,

  //radio para poder definir corretamente o meio e o lugar para rebater a bola
  radius: 30,

  //cria uma função para resetar o player quando comecar ou recomecar o jogo
  reset: function() {
    this.y = height / 2;
  },
  position: function(y) {
    this.y = min(height, max(y, 0));
  },
  draw: function() {
    line (this.x, this.y - this.radius, this.x, this.y + this.radius);
  }
}

//define player 2
let player2 = {
  //tamanhos
  x: 590,
  y: 150,

  //radio para poder definir corretamente o meio e o lugar para rebater a bola
  radius: 30,

  //cria uma função para resetar o player quando comecar ou recomecar o jogo
  reset: function() {
    this.y = height / 2;
  },
  position: function(y) {
    this.y = min(height, max(y, 0));
  },
  draw: function() {
    line(this.x, this.y - this.radius, this.x, this.y + this.radius);
  }
}

//cria o canvas
function setup() {
  createCanvas(600, 300);
  stroke(255);
  fill(225);

  game.reset();
}

//comeca o jogo
let game = {
  over: false,
  reset: function() {
    this.over = false;
    ball.reset();
    player1.reset();
    player2.reset();
  },
  tick: function() {
    if( this.over === false ){
      // nao deixa a bola passar pelo lado do inimigo
      if (ball.y < 10 || ball.y > height - 10) {
        ball.speed.y *= -1;
      }
      ball.y += ball.speed.y;

      //player 2 aceerta a bola
      if (ball.x + ball.radius >= player2.x) {
        ball.speed.x *= -1;
      }


      if (ball.x - ball.radius <= player1.x) {
        if (ball.y > player1.y - player1.radius &&
            ball.y < player1.y + player1.radius) {
          // quando vc acerta a bola

          // joga de volta
          ball.speed.x *= -1;
          // angulo da bola
          let angle = ball.y - player1.y;
          ball.speed.y = angle / 9;
          ball.speed.x = map(abs(angle), 0, player1.radius, 3, 9);

        } else {
          // vc erra a bola
          this.over = true;
          score --;
        }
      }
    }

    //resetar quando vc erra
    if (ball.x < -100) {
      game.reset();
    }    
    ball.x += ball.speed.x;

    ball.draw();
  }

};

function draw() {
  if(game.over === false){
    background(0);
  } else {
    background(255,0,0);
  }

  //desenho de players e define o que eles irão seguir (player 1 o y do mouse, player 2 o y da bola)
  player1.position(mouseY);
  player1.draw();

  player2.position(ball.y);
  player2.draw();

  game.tick();
    push();
  textSize(15);

  //exibe os pontos na tela
  text("Score: " + score, 10, 25);
  pop();
  
  //desenho de rede
  push();
  rect(290,135,15,15);
  pop();

  push();
  rect(290,100,15,15);
  pop();

  push();
  rect(290,65,15,15);
  pop();

  push();
  rect(290,30,15,15);
  pop();

  push();
  rect(290,170,15,15);
  pop();

  push();
  rect(290,205,15,15);
  pop();

  push();
  rect(290,240,15,15);
  pop();  
}