new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        playerSpecial: 0,
        monsterHealth: 1000,
        gameStarted: false,
        turns: [],
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.playerSpecial = 0,
                this.gameStarted = true;
            this.turns = [];
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        attack() {
            const damage = this.calculateDamage(30, 50);
            this.monsterHealth -= damage;
            this.logBattle(true, "El jugador ataca al oponente por " + damage);
            this.monsterAttack();
        },
        specialAttack() {
            const damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.logBattle(
                true,
                "El jugador usa su ataque especial sobre el oponente por " + damage
            );
            this.monsterAttack();
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.logBattle(true, "El jugador recupera 10 puntos de salud");
            this.monsterAttack();
        },
        giveUp() {
            this.logBattle(true, "El jugador escapa de la batalla");
            this.gameStarted = false;
        },
        monsterAttack() {
            const damage = this.calculateDamage(30, 50);
            this.playerHealth -= damage;
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
            if (newValue <= 0) {
                this.notify("¡Has Ganado!");
            }
        },
    },
});