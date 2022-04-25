var player, mx, my, shoot, bullet, bulletclass, mtlloader,objloader, gun, body;
            var controller,mesh, meshFloor;
            var scene,camera,renderer,light,ambient;
            var bboxbullet, bboxgun;
            var enemybbclass, egunclass, eclass;
            var run;
            var running = false;
            //sounds
            var shot,hop, load;
            //comp
            var comp = 0;
            var dist = 0;

            var stoneTexture = new THREE.TextureLoader().load('images/stone.jpg');
            var dirtTexture = new THREE.TextureLoader().load( 'images/dirt.jpg' );
            var leafTexture = new THREE.TextureLoader().load('images/leaf.jpg' );
            var woodTexture = new THREE.TextureLoader().load( 'images/wood.png');
            var brickTexture = new THREE.TextureLoader().load( 'images/brick.png' );
            var diamondTexture = new THREE.TextureLoader().load( "images/diamond.png" );
            var goldTexture = new THREE.TextureLoader().load( 'images/gold.png');
            var emeraldTexture = new THREE.TextureLoader().load( 'images/emerald.png');
            var obsidianTexture = new THREE.TextureLoader().load( 'images/obsidian.jpg');
            var grassTexture = new THREE.TextureLoader().load( 'images/grass.png');
            var pigTexture = new THREE.TextureLoader().load( 'images/pigFace.jpg');
            var waterTexture = new THREE.TextureLoader().load( 'images/water.jpg');

            var stoneLT= new THREE.TextureLoader().load('images/stonelt.png');
        var dirtLT= new THREE.TextureLoader().load( 'images/dirtlt.png' );
        var leafLT= new THREE.TextureLoader().load('images/leaflt.png' );
        var woodLT= new THREE.TextureLoader().load( 'images/woodlt.png');
var brickLT= new THREE.TextureLoader().load( 'images/bricklt.png' );
var diamondLT= new THREE.TextureLoader().load( "images/diamondlt.png" );
var goldLT= new THREE.TextureLoader().load( 'images/goldlt.png');
var emeraldLT= new THREE.TextureLoader().load( 'images/emeraldlt.png');
var obsidianLT= new THREE.TextureLoader().load( 'images/obsidianlt.png');

            var starterBlock = [
                new THREE.MeshBasicMaterial({map:dirtTexture}),
                new THREE.MeshBasicMaterial({map:dirtTexture}),
                new THREE.MeshBasicMaterial({map:grassTexture}),
                new THREE.MeshBasicMaterial({map:dirtTexture}),
                new THREE.MeshBasicMaterial({map:dirtTexture}),
                new THREE.MeshBasicMaterial({map:dirtTexture}),
            ];
            var pigHead= [
                new THREE.MeshBasicMaterial({color:0xffb3b3}),
                new THREE.MeshBasicMaterial({color:0xffb3b3}),
                new THREE.MeshBasicMaterial({color:0xffb3b3}),
                new THREE.MeshBasicMaterial({color:0xffb3b3}),
                new THREE.MeshBasicMaterial({color:0xffb3b3}),
                new THREE.MeshBasicMaterial({map:pigTexture}),
            ];
            //the bulit blocks
            var colorTile = stoneTexture;
            var opacity = false
    
            //parts
            var animal, animalH, animalL2, animalL3, animalL4, animalL1;
            var aipos = [[0,0],[5,5],[5,10],[10,4],[40,40],[40,45],[-100,85],[-100, 90]];
            player = {
                height:2.5,
                speed:0.1,
                turndegree:0,
                jump:false,
                y:0,
                shots:30,
                reload:false,
                health:100,
                v:-0.5,
                h:0.6,
                zoom:1
            };
            var start;
            var destroy = false;
            var destroyTimer; 
            var breaking;
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();
            var hitting = 0;
            var interacting  =[];
        function updown(e){
            if(e.deltaY == 100){
                camera.position.y-=1
            }
            if(e.deltaY == -100){
                camera.position.y+=1
            }
        }
        controller = {
            keyListner:function(event){
                var key_state=(event.type=="keydown")?true:false;
                switch(event.keyCode){
                case 32:controller.jump=key_state;
                break;
                case 87:controller.forward=key_state;
                break;
                case 83:controller.backward=key_state;
                break;
                case 65:controller.shiftleft=key_state;
                break;
                case 68:controller.shiftright=key_state;
                break;
                case 82:controller.rl=key_state;
                break;

                case 49:controller.glass=key_state;
                break;
                case 50:controller.red=key_state;
                break;
                case 51:controller.orange=key_state;
                break;
                case 52:controller.yellow=key_state;
                break;
                case 53:controller.green=key_state;
                break;
                case 54:controller.blue=key_state;
                break;
                case 55:controller.purple=key_state;
                break;
                case 56:controller.white=key_state;
                break;
                case 57:controller.black=key_state;
                break;
                } }}
                 function mousepos(e){
                    mx = e.clientX;
                    my = e.clientY;
                 }
                 function clicked(e){
                    start = Date.now();
                    breaking = setInterval(function(){
                        destroy = true
                    }, 1000);

                 }
                 function upped(e){
                     clearInterval(breaking);
                     var delta = Date.now()-start
                     if(e.button == 0){
                         if(delta<500){
                            shoot = true;
                         }
                     }
                 }
        var text2 = document.createElement('div');
        text2.style.position = 'absolute';
        text2.style.width = 500;
        text2.style.height = 500;
        text2.style.font = "20px arial,serif";
        text2.style.color = "#000000";
        text2.style.top = 85 + '%';
        text2.style.left = 35 + '%';
        text2.innerHTML = '<table id = "displayInventory"><tr>\
<td style="background-image:url(images/stonelt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">1</div></td>\
<td style="background-image:url(images/leaflt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">2</div></td>\
<td style="background-image:url(images/woodlt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">3</div></td>\
<td style="background-image:url(images/bricklt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">4</div></td>\
<td style="background-image:url(images/goldlt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">5</div></td>\
<td style="background-image:url(images/diamondlt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">6</div></td>\
<td style="background-image:url(images/dirtlt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">7</div></td>\
<td style="background-image:url(images/obsidianlt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">8</div></td>\
<td style="background-image:url(images/emeraldlt.png); background-repeat:no-repeat; background-size:cover; border:4px solid grey; width: 40px; height:40px; vertical-align:bottom"><div class=  "currentChoose">9</div></td>\
</tr></table>'
        document.body.appendChild(text2);
        var text1 = document.createElement('div');
        text1.id = "sp";
        text1.style.position = 'absolute';
        text1.style.width = 650;
        text1.style.height = 300;
        text1.style.top = 40 + '%';
        text1.style.left = 42 + '%';
        document.body.appendChild(text1);
eclass = [];
egunclass=[];
bulletclass = [];
run = true;
var bodies = [];
var placing = [];
var team = 0x111111;
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
    document.getElementById('sp').innerHTML = "<img src = 'https://i.ya-webdesign.com/images/csgo-crosshair-png-1.png' width = 250px; height = 250px;>";
function make(x,z){
    animal = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1.5),
        new THREE.MeshPhongMaterial({color:0xffb3b3, wireframe:false})
        ); 
        animalL1= new THREE.Mesh(
        new THREE.BoxGeometry(0.25,1,0.25),
        new THREE.MeshPhongMaterial({color:0xffb3b3, wireframe:false})
        ); 
        animalL2= new THREE.Mesh(
        new THREE.BoxGeometry(0.25,1,0.25),
        new THREE.MeshPhongMaterial({color:0xffb3b3, wireframe:false})
        ); 
        animalL3= new THREE.Mesh(
        new THREE.BoxGeometry(0.25,1,0.25),
        new THREE.MeshPhongMaterial({color:0xffb3b3, wireframe:false})
        ); 
        animalL4= new THREE.Mesh(
        new THREE.BoxGeometry(0.25,1,0.25),
        new THREE.MeshPhongMaterial({color:0xffb3b3, wireframe:false})
        ); 
        animalH= new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshFaceMaterial(pigHead)
        ); 

    animal.position.set(x,2,z);
    animalL1.position.set(x-0.35,1.25,z-0.5);
    animalL2.position.set(x+0.35,1.25,z+0.5);
    animalL3.position.set(x-0.35,1.25,z+0.5);
    animalL4.position.set(x+0.35,1.25,z-0.5);
    animalH.position.set(x,2.25,z-1.25);

    //bodies.push([animal, animalH, animalL1, animalL2, animalL3, animalL4]);
    scene.add(animal, animalH, animalL1, animalL2, animalL3, animalL4);
    //eclass.push([x,z]);
}
for(let i = 1; i<5; i++){
    make(Math.floor(Math.random()*20-10)+50,Math.floor(Math.random()*20-10)+50)
}
    gun = new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.5,0.5),
        new THREE.MeshBasicMaterial( {map:colorTile, opacity:opacity } )
    );
    // The cube can have shadows cast onto it, and it can cast shadows
    gun.position.set(0,2,0);
    scene.add(gun);

for(let x = 0; x<40; x++){
    for(let z = 0; z<40; z++){
        mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshFaceMaterial(starterBlock)
    );
    mesh.geometry.faces[3].material = grassTexture;
    mesh.elementsNeedUpdate = true;
    mesh.position.set(2*x, 0, 2*z)
    scene.add(mesh)
    }
}
    bullet = new THREE.Mesh(
        new THREE.BoxGeometry(0.1,0.2,0.2),
        new THREE.MeshBasicMaterial({color:0xf8ffba})   
        );
    ebullet = new THREE.Mesh(
        new THREE.SphereGeometry(0.5,0.2,0.2),
        new THREE.MeshBasicMaterial({color:0xffee00})   
        );
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    light = new THREE.DirectionalLight(0xffffff, 0.8, 18);
    light.position.set(-3,6,-3);
    light.castShadow = true;
    // Will not light anything closer than 0.1 units or further than 25 units
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 2500;
    scene.add(light);
    camera.position.set(40, player.height, 40);
    camera.lookAt(new THREE.Vector3(0,player.height,0));
    camera.zoom*=player.zoom;
    camera.updateProjectionMatrix();
    camera.rotation.order = "YZX";
    gun.rotation.order = "YZX";
    bullet.rotation.order = "YZX";
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x51BAF2, 1 ); 
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Enable Shadows in the Renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);
    animate();
}
    function animate(){
        //1366;
        requestAnimationFrame(animate);        
        player.turndegree = (-720/window.innerWidth*mx/20);
        player.turndegreeu = -(90+2/window.innerHeight*my);
        camera.rotation.y=player.turndegree;
        camera.rotation.x = player.turndegreeu;

        var stoneTexture = new THREE.TextureLoader().load('images/stone.jpg');
        var dirtTexture = new THREE.TextureLoader().load( 'images/dirt.jpg' );
        var leafTexture = new THREE.TextureLoader().load('images/leaf.jpg' );
        var woodTexture = new THREE.TextureLoader().load( 'images/wood.png');
        var brickTexture = new THREE.TextureLoader().load( 'images/brick.png' );
        var diamondTexture = new THREE.TextureLoader().load( "images/diamond.png" );
        var goldTexture = new THREE.TextureLoader().load( 'images/gold.png');
        var emeraldTexture = new THREE.TextureLoader().load( 'images/emerald.png');
        var obsidianTexture = new THREE.TextureLoader().load( 'images/obsidian.jpg');

        if(controller.glass){
            gun.material.map = stoneTexture;
            gun.material.wireframe = false
                colorTile = stoneTexture
                opacity = false

                }
                if(controller.red){
                    gun.material.wireframe = false
                    opacity = false;
                gun.material.map = leafTexture;
                    colorTile = leafTexture
                }
                if(controller.orange){
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = woodTexture;
                    colorTile = woodTexture
                }
                if(controller.yellow){
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = brickTexture;
                    colorTile = brickTexture
                }
                if(controller.blue){
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = diamondTexture;
                    colorTile = diamondTexture
                }
                if(controller.green){
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = goldTexture;
                    colorTile = goldTexture
                }
                if(controller.purple){
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = dirtTexture;
                    colorTile = dirtTexture
                }
                if(controller.black){
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = emeraldTexture;
                    colorTile = emeraldTexture
                }
                if(controller.white){ 
                    gun.material.wireframe = false
                    opacity = false;
                    gun.material.map = obsidianTexture;
                    colorTile =obsidianTexture
                }
        gun.position.set(
            camera.position.x+Math.sin(camera.rotation.y+Math.PI/4)*player.h,
            camera.position.y+player.v,
            camera.position.z+Math.cos(camera.rotation.y+Math.PI/4)*player.h,
        );
        gun.rotation.set(
            -(camera.rotation.x+Math.PI)+hitting,
            camera.rotation.y-Math.PI,
            camera.rotation.z
        );
        for(var i = 0; i<0; i++){
        egun.position.set(
            eclass[i][0]-Math.sin(enemy.rotation.y+Math.PI/4)*0.6,
            enemy.position.y,
            eclass[i][1]+Math.cos(enemy.rotation.y+Math.PI/4)*0.6+1,
        );
        egun.rotation.set(
            eclass[i][0],
            enemy.rotation.y-Math.PI,
            eclass[i][1]
        );
        }
        if(controller.forward){
            camera.position.x+=Math.sin(camera.rotation.y)*player.speed;
            camera.position.z+=Math.cos(camera.rotation.y)*player.speed;
            running = true;
        }
        else if(controller.backward){
            camera.position.x-=Math.sin(camera.rotation.y)*player.speed;
            camera.position.z-=Math.cos(camera.rotation.y)*player.speed;
            running = true;
        }
        else if(controller.shiftleft){
            camera.position.x+=Math.sin(camera.rotation.y+Math.PI/2)*player.speed;
            camera.position.z+=Math.cos(camera.rotation.y+Math.PI/2)*player.speed;
            running = true;
        }
        else if(controller.shiftright){
            camera.position.x+=Math.sin(camera.rotation.y-Math.PI/2)*player.speed;
            camera.position.z+=Math.cos(camera.rotation.y-Math.PI/2)*player.speed;
            running = true;
        }
        else{
            running = false;
            camera.rotation.z=180*(Math.PI/180);
        }

        if(player.shots == 0&&player.reload == false){
            //load.play();
            gun.position.y-=1;
            scene.remove(gun);
            player.reload = true;
            setTimeout(function(){
                player.shots = 30;
                player.reload = false;
                scene.add(gun);
            }, 1200);
        }
        for(var en = 0; en<bodies.length; en++){
        var firstBB = new THREE.Box3().setFromObject(bullet);
        var secondBB = new THREE.Box3().setFromObject(bodies[en][9]);
        var collision = firstBB.intersectsBox(secondBB);
        if(collision == true){
            scene.remove(bullet);
            for(var parts = 0; parts<bodies[en].length; parts++)
            scene.remove(bodies[en][parts]);
        }
        }
        if(camera.position.z>=125){
          camera.position.z = 125;
        }
        if(camera.position.z<=-125){
          camera.position.z = -125;
        }
        if(camera.position.x>=125){
          camera.position.x = 125;
        }
        if(camera.position.x<=-125){
          camera.position.x = -125;
        }    
        	// update the picking ray with the camera and mouse position
	        raycaster.setFromCamera( mouse, camera );
            // calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects( scene.children );

        
            for ( var i = 0; i < intersects.length; i++ ) { 
                //intersects[0].object.material.color.set( 0xFFFFE0 );\
                if(shoot == true){    
                    mesh=  new THREE.Mesh(
                    new THREE.BoxGeometry(2,2,2),
                    new THREE.MeshBasicMaterial({map:colorTile, opacity:opacity } )   
                    );
                    if(intersects[0].object.position.y<camera.position.y-3){
                        mesh.position.set(intersects[0].object.position.x, intersects[0].object.position.y+2 ,intersects[0].object.position.z)
                    }
                    //bottom
                    else if(intersects[0].object.position.y>camera.position.y+3){
                        mesh.position.set(intersects[0].object.position.x, intersects[0].object.position.y-2 ,intersects[0].object.position.z)
                    }
                    //x, less (left side face)
                    else if(intersects[0].object.position.x>camera.position.x&&Math.abs(intersects[0].object.position.x-camera.position.x)>Math.abs(intersects[0].object.position.z-camera.position.z)){
                    mesh.position.set(intersects[0].object.position.x-2, intersects[0].object.position.y ,intersects[0].object.position.z)
                    }
                    //z less (front side)
                    else if(intersects[0].object.position.z>camera.position.z&&Math.abs(intersects[0].object.position.x-camera.position.x)<Math.abs(intersects[0].object.position.z-camera.position.z)){
                        mesh.position.set(intersects[0].object.position.x, intersects[0].object.position.y ,intersects[0].object.position.z-2)
                    }
                    //on top
                    //z, more (back side)
                    else if(intersects[0].object.position.z<camera.position.z&&Math.abs(intersects[0].object.position.x-camera.position.x)<Math.abs(intersects[0].object.position.z-camera.position.z)){
                        mesh.position.set(intersects[0].object.position.x, intersects[0].object.position.y ,intersects[0].object.position.z+2)
                    }
                    //x, more (right side)
                    else if(intersects[0].object.position.x<camera.position.x&&Math.abs(intersects[0].object.position.x-camera.position.x)>Math.abs(intersects[0].object.position.z-camera.position.z)){
                        mesh.position.set(intersects[0].object.position.x+2, intersects[0].object.position.y ,intersects[0].object.position.z)
                        }   
                        hitting-=2
                        setTimeout(function(){
                            hitting+=2;
                        }, 100)
                scene.add(mesh);
                shoot = false;
                }
                else if(destroy == true){
                    hitting-=2
                        setTimeout(function(){
                            hitting+=2;
                        }, 100);
                        scene.remove(intersects[0].object);
                    destroy = false;
                        /*
                    for(let x = 0; i<2; x++){
                        for(let z= 0; i<2;z++){
                            for(let y = 0; i<2; y++){
                        mesh= new THREE.Mesh(
                        new THREE.BoxGeometry(0.05,0.05,0.05),
                        new THREE.MeshBasicMaterial({color:0xffffff})   
                            );                 
                            interacting.push(mesh);
                            mesh.position.set(intersects[0].object.position.x+x/10,intersects[0].object.position.y+y/10,intersects[0].object.position.z+z/10)
                            scene.add(mesh);
                        }
                        }
                        }
                    setTimeout(function(){
                        for(let i=0; i<intearcting.length; i++){
                            scene.remove(interacting[i]);
                        }
                    },100)
                    */
                }

}
        renderer.render(scene, camera);
    }
    setInterval(function(){
        bulletclass = [];
        if(running == true){
            if(camera.rotation.z < (181*(Math.PI/180))){
                camera.rotation.z=181*(Math.PI/180);
            }
            else{
                camera.rotation.z=179*(Math.PI/180);
            }
        }
    }, 500);
window.addEventListener("keydown", controller.keyListner)
window.addEventListener("keyup", controller.keyListner)
window.addEventListener("mousemove", mousepos, false)
window.addEventListener('mousedown', clicked, false)
window.addEventListener('mouseup', upped, false);
window.addEventListener("mousewheel", updown, false);
window.onload =init;