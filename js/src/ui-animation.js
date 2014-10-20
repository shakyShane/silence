(function () {
    
    var Loader = function (elem) {
        this.elem = elem;
        this.context = elem.getContext("2d");
        this.width = this.elem.width;
        this.height = this.elem.height;
        this.utils = getUtils(this.context, this.width, this.height);

        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.radius = 15;
        this.innerSquare = this.radius / 2;
        this.borderWidth = 4;
        this.startAngle = 0;
        this.loading = false;
        this.loaded = false;
        this.progress = 0;
    };

    /**
     * Draw the first scene
     */
    Loader.prototype.start = function () {
        this.loading = true;
        render(this, this.startAngle);
    };

    /**
     * @param norm - value between 0 - 1 representing current progress
     */
    Loader.prototype.update = function (norm) {

        this.progress = norm;

        if (this.progress > 1.01) {
            this.loaded = true;
            this.loading = false;
            return this;
        } else {
            if (this.loading && !this.loaded) {
                render(this, norm);
            }
        }
    }

    function render(obj, norm) {

        var context = obj.context;
        var centerX = obj.centerX;
        var centerY = obj.centerY;
        var radius = obj.radius;
        var utils = obj.utils;

        var innerSquare = obj.innerSquare;
        var borderWidth = obj.borderWidth;

        /**
         * Clear the screen
         */
        context.clearRect(0, 0, 50, 50);

        // Outer line
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, utils.degreesToRads(360), false);
        context.lineWidth = 1;

        // Outer line color
        context.strokeStyle = 'blue';
        context.stroke();

        var lerped = utils.lerp(0, 360, norm);
        var startingAngle = utils.degreesToRads(270);
        var arcSize = utils.degreesToRads(lerped);
        var endingAngle = startingAngle + arcSize;

        context.save();
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
        context.closePath();
        context.fillStyle = "blue";
        context.fill();
        context.restore();

        utils.drawCircle(centerX, centerY, radius - borderWidth, 0, Math.PI * 2, "white");
        utils.drawRect(centerX - innerSquare / 2, centerY - innerSquare / 2, innerSquare, innerSquare, "blue");
    }
    
    window.Loader = Loader;
})();
