class Game {
  constructor() {

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false
  }

  getState() {
    database.ref("gameState").on("value", function(data) {
      gameState = data.val();
    });
  }
  updateState(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage(car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage(car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
    fuelg = new Group()
    coing = new Group()
    obg = new Group()
    this.addSprites(fuelg,4,fuelimg,0.02)
    this.addSprites(coing,18,coinimg,0.09)
    this.addSprites(obg,10,obimg,0.04)
  }
  addSprites(group,num,img,scale){
    for (var i = 0;i<num;i++){
      var sprite=createSprite(random(width/2-150,width/2+150),random(-height*4.5,height-400))
      sprite.addImage(img)
      sprite.scale = scale
      group.add(sprite)
    }
  }
  
  play() {
    form.hide();
    Player.getPlayersInfo();
    player.getCarsAtEnd()
    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.position(width / 3 - 50, 80);

    this.leader2.position(width / 3 - 50, 130);

    if (players !== undefined) {
      background("lightblue")
      image(track, 0, -height * 5, width, height * 6);
      this.showLeaderboard();
      this.showLife()
      this.showFuelBar()
      var index = 0;
      for (var i in players) {
        index = index + 1;
        var x = players[i].positionX;
        var y = height - players[i].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          camera.position.y = cars[index - 1].position.y;
          cars[index-1].overlap(fuelg,function(a,b){
            player.fuel = 185
            b.remove()
          })
          cars[index-1].overlap(coing,function(a,b){
            player.score += 10
            player.updateDistance()
            b.remove()
          })
          if (player.fuel > 0 && this.playerMoving) {
            player.fuel -= 0.3;
          }
      
          if (player.fuel <= 0) {
            gameState = 2;
            swal({
              title: `Game Over`,
              text: "Oops you lost the race....!!!",
              imageUrl:
                "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
              imageSize: "100x100",
              confirmButtonText: "Thanks For Playing"
            });
          }
        }
      }

      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true
        player.positionY += 10;
        player.updateDistance();
      }
      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
        player.positionX -= 5;
        player.updateDistance();
      }
  
      if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        player.positionX += 5;
        player.updateDistance();
      }

      if(player.positionY>height * 6 - 100){
        gameState=2
        player.rank+=1
        Player.updateCarsAtEnd(player.rank)
        player.updateDistance();
        swal({
          title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
          text: "You reached the finish line successfully",
          imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        })
      }

      drawSprites();
    }
  }

  showLife() {
    fill("white");
    rect(width / 2 - 100, height - player.positionY-200, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY-200, player.life, 20);
  }

  showFuelBar() {
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 150, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 150, player.fuel, 20);
  }


  showLeaderboard() {
    var leader1, leader2;
    var player = Object.values(players);
      leader1 =
        player[0].rank +
        "     " +
        player[0].name +
        "     " +
        player[0].score;

      leader2 =
        player[1].rank +
        "     " +
        player[1].name +
        "     " +
        player[1].score;

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
}
