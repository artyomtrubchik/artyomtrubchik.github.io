var three = THREE;

var scene = new three.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
var container = document.getElementById("canvas");
container.appendChild(renderer.domElement);



var geometry = new three.BoxGeometry(3, 3, 3);
three.ImageUtils.crossOrigin = '';
var texture1 = three.ImageUtils.loadTexture('/my/1.png');
var texture2 = three.ImageUtils.loadTexture('/my/2.png');
var texture3 = three.ImageUtils.loadTexture('/my/3.png');
var texture4 = three.ImageUtils.loadTexture('/my/4.png');
var texture5 = three.ImageUtils.loadTexture('/my/5.png');
var texture6 = three.ImageUtils.loadTexture('/my/6.png');
texture1.anisotropy = renderer.getMaxAnisotropy();

var material = new three.MeshFaceMaterial([
    new three.MeshBasicMaterial({
        map: texture1
    }),
    new three.MeshBasicMaterial({
        map: texture2
    }),
    new three.MeshBasicMaterial({
        //color: 0x0000ff,
        map: texture3
    }),
    new three.MeshBasicMaterial({
        map: texture4
    }),
    new three.MeshBasicMaterial({
        map: texture5
    }),
    new three.MeshBasicMaterial({
        map: texture6
    })
]);

//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new three.Mesh(geometry,material);



cube.rotation.x = Math.PI/4;
cube.rotation.y = Math.PI/4;
scene.add(cube);

	


var geo = new THREE.EdgesGeometry( cube.geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 30 } );
var wireframe = new THREE.LineSegments( geo, mat );
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
cube.add( wireframe );


camera.position.z = 5;

/* */
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new three.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});
/* */

$(document).on('mouseup', function(e) {
    isDragging = false;
});



// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;
function update(dt, t) {
    //console.log(dt, t);
    
    //camera.position.z += 1 * dt;
    //cube.rotation.x += 1 * dt;
    //cube.rotation.y += 1 * dt;
    
    setTimeout(function() {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;
        
        update(dt, totalGameTime);
    
        lastFrameTime = currTime;
    }, 0);
}


function render() {
    renderer.render(scene, camera);
    
    
    requestAnimFrame(render);
}

render();
update(0, totalGameTime);















function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}



