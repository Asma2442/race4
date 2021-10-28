class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 185
    this.life = 185
  }

  addPlayer() {
    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref("players/player" + this.index).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }

  getDistance() {
    database.ref("players/player" + this.index).on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }
  
  updateDistance() {
    database.ref("players/player" + this.index).update({
        positionX: this.positionX,
        positionY: this.positionY,
        rank: this.rank,
        score: this.score
      });
    }

  getCount() {
    database.ref("playerCount").on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(count) {
    database.ref("/").update({
      carsAtEnd: count
    });
  }

  static getPlayersInfo() {
    database.ref("players").on("value", data => {
      players = data.val();
    });
  }
}
