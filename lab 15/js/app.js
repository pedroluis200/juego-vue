new Vue({
  el: "#app",
  data: {
    playerHealth: 600,
    playerSpecial: 0,
    monsterHealth: 1000,
    monsterLoosedLife: 0,
    maxAttack: 50,
    gameStarted: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.playerHealth = 600;
      this.monsterHealth = 1000;
      this.playerSpecial = 0;
      this.gameStarted = true;
      this.monsterLoosedLife = 0;
      this.maxAttack = 10;
      this.turns = [];
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    attack() {
      const damage = this.calculateDamage(3, this.maxAttack);
      this.monsterHealth -= damage;
      this.logBattle(true, "El jugador ataca al oponente por " + damage);
      this.monsterAttack();
    },
    specialAttack() {
      if (this.monsterHealth < 500) {
        this.playerSpecial = 0;
        this.logBattle(
          true,
          "El jugador usa su ataque especial sobre el oponente por 500"
        );
        this.monsterHealth -= 500;
      } else {
        this.logBattle(true, "El jugador no puede realizar su ataque especial");
      }
    },
    heal() {
      if (this.playerSpecial > 100) {
        this.playerSpecial -= 100;
        this.playerHealth += 125;
        this.logBattle(true, "El jugador recupera 125 puntos de salud");
      } else {
        this.logBattle(true, "El jugador necesita mas energia para curarse");
      }
    },
    giveUp() {
      this.logBattle(true, "El jugador escapa de la batalla");
      this.gameStarted = false;
    },
    monsterAttack() {
      const damage = this.calculateDamage(30, 50);
      this.playerHealth -= damage;
      this.playerSpecial += damage;
      this.logBattle(false, "El oponente ataca al jugador por " + damage);
    },
    notify(message) {
      if (confirm(message + " ¿Nuevo juego?")) {
        this.startGame();
      } else {
        this.gameStarted = false;
      }
    },
    logBattle(playerTurn, action) {
      this.turns.unshift({
        isPlayer: playerTurn,
        text: action,
      });
    },
  },
  watch: {
    playerHealth(newValue) {
      if (newValue <= 0) {
        this.notify("¡Has Perdido!");
      }
    },
    monsterHealth(newValue) {
      this.maxAttack += (1000 - newValue) / 8;
      if (newValue <= 0) {
        this.notify("¡Has Ganado!");
      }
    },
  },
});
