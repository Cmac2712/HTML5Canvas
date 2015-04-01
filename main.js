var Animation = (function () {
		  
		  var canvas  = document.getElementById('canvas'),
		      context = canvas.getContext('2d'),
		      shape   = {
		        height: 10,
		        width:  10,
		        posX:   40,
		        posY:   40,
			speed:   1,
		        fill: '#e66',
			dir: ''
		      }; 

		  canvas.width     = 500;  
		  canvas.height    = 500;
		  canvas.style.backgroundColor = '#ddd';

		  /**
		   *   * Draw shape
		   *     */
		  
		  function _draw () {
		    context.beginPath();
		    context.rect(shape.posX, shape.posY, shape.width, shape.height);
		    context.fillStyle = shape.fill;
		    context.fill();
		  }
		  
		  /**
		   *   * Clear canvas
		   *     */
		  
		  function _clear () {
		    context.clearRect(0, 0, canvas.width, canvas.height);
		  }

		  function changeVal (prop, val) {
			shape[prop] = val;
		  }
		  
		  /**
		   *   * Update frames
		   *     */
		  
		  function frames () {
		   
		    if (shape.dir==='r') {
			shape.posX+= shape.speed
		    } else if (shape.dir==='l') {
			shape.posX-= shape.speed; 
		    } else if (shape.dir==='u') {
			shape.posY+= shape.speed; 
		    } else if (shape.dir==='d') {
			shape.posY-= shape.speed; 
		    } else {
			shape.posX = shape.posX;
			shape.posY = shape.posY;
		    }

		    _clear();
		    _draw();

		    requestAnimationFrame(
			    function() {
		            frames();
		          }
		        );
		  }
		  
		    return {
		    init:  frames,
		    changeVal: changeVal
		  };
		  
		})();

var Input = (function() {

    function listen () {
	document.addEventListener('keydown', function (e){
	    if (e.keyCode === 37) Animation.changeVal('dir','l');
	    if (e.keyCode === 39) Animation.changeVal('dir','r');	    				 
	    if (e.keyCode === 38) Animation.changeVal('dir','d');
	    if (e.keyCode === 40) Animation.changeVal('dir','u');
	});

	document.addEventListener('keyup', function (e){
		Animation.changeVal('dir',null);
		if (e.keyCode === 17) Animation.changeVal('speed',1);
	});
	
	document.addEventListener('keydown', function (e){
		if (e.keyCode === 17) Animation.changeVal('speed',10);
	});
    }
    
    return {
	listen: listen
    }
})();

Input.listen();
Animation.init();
