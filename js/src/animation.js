window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var utils = getUtils(context);

    var centerX = height/2;
    var centerY = width/2;

    var gridX = 100;
    var gridY = 100;

    // Move coordinates to center of screen

    var startX = 0;
    var startY = -100;

    var speed = 10;
    var dir = "dow n";

    var p = particle.create(0, centerY, speed, Math.PI*2);

    var obj = {
        x: 0,
        y: 571
    };

    var startSize  = 0;
    var thrustup   = vector.create(0.1, 0);
    var thrustdown = vector.create(-0.1, 0);

    var loop;
    var ltr = true;
    var score = 0;

    var hitArea = 100;
    var speedMin = 20;

    var playing  = true;
    var barColor = "lightgray";
    var barMin   = 50;
    var barMax   = 100;
    var newBarWidth;
    var reset;

    var speedMax = width/2-speedMin-hitArea/2-speedMin;

    render(gridX, gridY, obj.x, obj.y);

    /**
     * The win screen
     */
    function winScreen() {
        context.clearRect(0, 0, width, height);
        utils.addLabel(width/2-50, height/2-20, "YOU WON", "red");
    }

    function render(gridX, gridY, objX, objY) {

        /**
         * Clear the canvas
         */
        context.clearRect(0, 0, width, height);

        /**
         * new bar `width`, based on speed/score
         */
        newBarWidth = utils.lerp(barMin, barMax, utils.norm(20, 10, speed));

        /**
         * The actual bar
         */
        utils.drawRect(width/2-newBarWidth/2, 0, newBarWidth, height, barColor);


        /**
         *
         */
        utils.drawRect(width/2-newBarWidth/2, 0, newBarWidth, height, barColor);

        /**
         * Score Label
         */
        utils.addLabel(20, 40, "Score: " + score, "black");

        /**
         * Speed label
         */
        utils.addLabel(20, 80, "Speed:", "black");

        /**
         * Speed bar
         */
        utils.drawRect(speedMin, 100, utils.lerp(speedMin, speedMax, utils.norm(10, 20, speed)), speedMin, "blue");


        if (p.position.getX() >= width && ltr) {
            p.velocity.setX(-speed);
            ltr = false;
        } else {
            if (p.position.getX() <= 0) {
                ltr = true;
            }
            if (ltr) {
                p.velocity.setX(speed);
            }
        }

        /**
         * Any states to reset
         */
        if (reset) {
            if (ltr) {
                if (p.position.getX() > reset) {
                    barColor = "lightgray";
                    reset = undefined;
                }
            } else {
                if (p.position.getX() < reset) {
                    barColor = "lightgray";
                    reset = undefined;
                }
            }
        }

        p.update();

        utils.drawRect(p.position.getX(), p.position.getY(), 5, 10);

        if (!playing) {
            cancelAnimationFrame(loop);
            winScreen();
        } else {
            loop = requestAnimationFrame(render);
        }
    }

    document.body.addEventListener("keydown", function (evt) {
        switch (evt.keyCode) {
            case 32 : // up
                if (hit(p)) {
                    score += 1;
                    barColor = "green";
                    if (win(score)) {
                        playing = false;
                    } else {
                        if (ltr) {
                            p.velocity.setX(speed+=1);
                            reset = p.position.getX() + 100;
                        } else {
                            p.velocity.setX(-speed -1);
                            reset = p.position.getX() - 100;
                            speed += 1;
                        }
                    }
                }
                break;
        }

        function win(score) {
            return score === 10;
        }

        function hit(p) {
            var pos = p.position.getX();
            return pos > width/2-newBarWidth/2 && pos < width/2+newBarWidth/2;
        }
    });
};