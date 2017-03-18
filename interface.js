function Interface() {
    this.tetrisHolder = document.getElementById("tetrisHolder");
    this.gameOver = document.getElementById("gameOver");
    this.gameOver_h1 = document.getElementById("gameOver_h1");
    this.gameOver_table = document.getElementById("gameOver_table");
    this.gameOver_tr = document.querySelectorAll(".gameOver_tr");
    this.gameOver_table_td_left = document.querySelectorAll(".left");
    this.gameOver_table_td_right = document.querySelectorAll(".right");
    this.blink = document.getElementById("blink");
    this.scoreTable = document.getElementById("scoreTable");
    this.td_scoreName = document.querySelectorAll(".scoreName");
    this.td_scoreValue = document.querySelectorAll(".scoreValue");
    this.gameHolder = document.getElementById("gameHolder");
    this.leftCorner = document.getElementById("leftCorner");
    this.rightCorner = document.getElementById("rightCorner");
    this.title = document.getElementById("title");
    this.loading = document.getElementById("loading");

    this.scoreBoard = document.getElementById("score"); //Link HTML elements for displaying information to variables
    this.levelBoard = document.getElementById("level");
    this.highscoreBoard = document.getElementById("highscore");

    this.coefficient;

    this.width = 260;
    this.height = 440;

    this.setup = function() {
        if (windowHeight * 2 > windowWidth) {
            this.coefficient = windowWidth / 1536.0;
        } else {
            this.coefficient = windowHeight / 734.0;
        }
        console.log(this.coefficient);

        this.width *= this.coefficient;
        this.height *= this.coefficient;
        gScale *= this.coefficient;

        borderSmall = gScale / 16;
        squareSize = gScale - gScale / 8;
        maxBorder = gScale / 2 - borderSmall;

        this.tetrisHolder.style.width = this.coefficient * 260 + 'px';
        this.tetrisHolder.style.padding = this.coefficient * 7 + 'px';
        this.tetrisHolder.style.borderWidth = this.coefficient * 5 + 'px';

        this.gameOver.style.height = this.coefficient * 130 + 'px';
        this.gameOver.style.width = this.coefficient * 200 + 'px';
        this.gameOver.style.left = this.coefficient * 30 + 'px';
        this.gameOver.style.top = this.coefficient * 200 + 'px';
        this.gameOver.style.borderWidth = this.coefficient * 4 + 'px';

        this.gameOver_h1.style.fontSize = this.coefficient * 25 + 'px';
        this.gameOver.style.margin = this.coefficient * 20 + 'px 0px ' + this.coefficient * 10 + 'px 0px';

        this.gameOver_table.style.width = this.coefficient * 200 + 'px';

        for (i = 0; i < this.gameOver_tr.length; i++) {
            this.gameOver_tr[i].style.width = this.coefficient * 100 + 'px';
        }
        for (i = 0; i < this.gameOver_table_td_left.length; i++) {
            this.gameOver_table_td_left[i].style.fontSize = this.coefficient * 12 + 'px';
            this.gameOver_table_td_left[i].style.padding = this.coefficient * 0.5 + 'px 0px ' + this.coefficient * 0.5 + 'px 0px';
        }
        for (i = 0; i < this.gameOver_table_td_right.length; i++) {
            this.gameOver_table_td_right[i].style.fontSize = this.coefficient * 12 + 'px';
            this.gameOver_table_td_right[i].style.padding = this.coefficient * 0.5 + 'px 0px ' + this.coefficient * 0.5 + 'px 0px';
        }

        this.blink.style.fontSize = this.coefficient * 10 + 'px';
        this.blink.style.marginTop = this.coefficient * 10 + 'px';

        this.scoreTable.style.padding = this.coefficient * 7 + 'px';
        this.scoreTable.style.borderWidth = this.coefficient * 3 + 'px';
        this.scoreTable.style.marginBottom = this.coefficient * 7 + 'px';

        for (i = 0; i < this.td_scoreName.length; i++) {
            this.td_scoreName[i].style.width = this.coefficient * 86 + 'px';
            this.td_scoreName[i].style.fontSize = this.coefficient * 12 + 'px';
        }

        for (i = 0; i < this.td_scoreValue.length; i++) {
            this.td_scoreValue[i].style.width = this.coefficient * 86 + 'px';
            this.td_scoreValue[i].style.fontSize = this.coefficient * 10 + 'px';
        }
        
        this.gameHolder.style.height = this.height + 'px';

        this.leftCorner.style.height = this.coefficient * 400 + 'px';

        this.rightCorner.style.height = this.coefficient * 280 + 'px';

        this.title.style.height = this.coefficient * 60 + 'px';
        this.title.style.margin = this.coefficient * 30 + 'px';
    }

    this.showInfo = function() {
        this.scoreBoard.innerHTML = Math.floor(score); //Show score on the score board
        this.levelBoard.innerHTML = level; //Show level on the score board
        this.highscoreBoard.innerHTML = highscore; //Show high score on the score board
    }

    this.loadingFinished = function () {
        this.loading.style.visibility = 'hidden';
    }
}