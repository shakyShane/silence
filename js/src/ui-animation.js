window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var utils = getUtils(context, width, height);

    var centerX = width/2;
    var centerY = height/2;

    var radius      = 30;
    var borderWidth = 6;
    
    //utils.drawCircle(centerX, centerY, 100, utils.degreesToRads(180), utils.degreesToRads(350));
    //utils.drawCircle(centerX, centerY, 80, null, null, "white");
    
    var norm = 0;
    
    render();
    
    function render () {

        /**
         * Clear the screen
         */
        context.clearRect(0, 0, width, height);

        // Outer line
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, utils.degreesToRads(360), false);
        context.lineWidth = 1;

        // Outer line color
        context.strokeStyle = 'blue';
        context.stroke();
        
        var startingAngle = utils.degreesToRads(0);
        var arcSize       = utils.degreesToRads(norm);
        var endingAngle   = startingAngle + arcSize;
        
        context.save();
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
        context.closePath();
        context.fillStyle = "blue";
        context.fill();
        context.restore();
        
        utils.drawCircle(centerX, centerY, radius-borderWidth, 0, Math.PI * 2, "white");
        utils.drawRect(centerX-6, centerY-6, 14, 14, "blue");
    
        if (norm <= 360) {
            norm += 1;
        } else {
            
        }
        
        requestAnimationFrame(render);
    }
    
    
    //function convertToRadians(degree) {
        //return degree*(Math.PI/180);
    //}
    //
    //function incrementAngle() {
    //    angle++;
    //    if(angle > 360) {
    //        angle = 0;
    //    }
    //}

    //function drawRandomlyColoredRectangle() {
    //    <!-- clear the drawing surface -->
    //    context.clearRect(0,0,width,height);
    //    <!-- you can also stroke a rect, the operations need to happen in order -->
    //    incrementAngle();
    //    context.save();
    //    context.lineWidth = 10;
    //    context.translate(200,200);
    //    context.rotate(convertToRadians(angle));
    //
    //    <!-- set the fill style -->
    //    context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    //    context.fillRect(-25,-25,50,50);
    //    context.strokeRect(-25,-25,50,50);
    //    context.restore();
    //}
    //
    //setInterval(drawRandomlyColoredRectangle, 20);
};