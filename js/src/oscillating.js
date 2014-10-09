window.onload = function () {

    var canvas     = document.getElementById("canvas");
    var context    = canvas.getContext("2d");
    var width      = canvas.width = window.innerWidth;
    var height     = canvas.height = window.innerHeight;
    var utils      = getUtils(context, width, height);
    var centerX    = width/2;
    var centerY    = height/2;
    var numObjects = 10;
    var slice      = Math.PI * 2 / numObjects;
    var x;
    var y;
    var angle        = 0;
    var speed        = 1;
    var radius       = 30;
    var baseRadius   = 30;
    var centerOffset = 10;
    var pulse        = 10;

    /**
     * oscillating
     */
    oscillating();

    function oscillating() {

        utils.clearRect();
        context.save();

        speed        += .05;
        baseRadius   += .05;
        centerOffset += .02;

        radius = pulse;

        /**
         * Oscillate the item within 200 px either side of center
         * @type {number}
         */
        var startX = centerX + Math.sin(centerOffset) * 100;

        /**
         * Translates and rotate the canvas
         */
        context.translate(startX, centerY);
        context.rotate(speed);

        /**
         * Draw the cross hair
         */
        for (var i = 0, n = numObjects; i < n; i += 1) {
            angle = i * slice;
            x = Math.cos(angle) * radius;
            y = Math.sin(angle) * radius;
            utils.drawDot(x, y, 1, "red");
        }


        /**
         * Restore and loop
         */
        context.restore();
        requestAnimationFrame(oscillating);
    }
};