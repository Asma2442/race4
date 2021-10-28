class Form {
  constructor() {
    this.input=createInput("").attribute("placeholder","Enter Your Name")
  this.title=createImg("assets/title.png")
  this.button=createButton("PLAY!!!")
  this.greeting=createElement("h2")
  this.reset = createImg("assets/reset.png")
  }

  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display() {
    this.input.position(width/2-100, height/2-20)
    this.input.style("background-color","transparent")
    this.title.position(185,40)
    this.title.size(900,200)
    this.button.position(width/2-40, height/2+40)
    this.reset.position(width-200, 50);
    this.reset.size(50,50)
    this.reset.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        carsAtEnd:0
      });
      window.location.reload();
    });
    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      this.greeting.position(width/2-200, height/2)
      this.greeting.html("Hello "+this.input.value()+" please wait for more players");
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
  })
}
}
