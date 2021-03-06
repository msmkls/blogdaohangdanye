Win10.onReady(function () {
    var scene, camera, renderer, sphere, sphere2, torus, torus2;
    var shape = [];

    function init () {
        var t = THREE;

        scene = new t.Scene();
        camera = new t.PerspectiveCamera(105,window.innerWidth/window.innerHeight, 1,5000);
        camera.position.z = 2000;

        renderer = new t.WebGLRenderer({alpha:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor( 0xffffff, 0);
        renderer.shadowMapSoft = true;
        renderer.autoClear = false;
        document.getElementById('win10-desktop-scene').appendChild(renderer.domElement);

        window.addEventListener("resize", function (argument) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        });

        var  controls = new THREE.OrbitControls( camera );
    }

    function createObj() {

        var sphereMaterial = new THREE.MeshPhongMaterial({
            color      : new THREE.Color("#fff"),
            emissive   : new THREE.Color("#3c0752"),
            shininess  : new THREE.Color("#fc6bcf"),
            shininess  :  10,
            shading    :  THREE.FlatShading,
            transparent: 1,
            opacity    : 1,
            side 	   : THREE.DoubleSide
        });

        var geometry = new THREE.DodecahedronGeometry( 500, 1);
        sphere = new THREE.Mesh( geometry, sphereMaterial );
        sphere.receiveShadow = true;
        sphere.castShadow = true;
        scene.add(sphere );

        var sphereMaterial2 = new THREE.MeshPhongMaterial({
            color      : new THREE.Color("#fff"),
            emissive   : new THREE.Color("#fc6bcf"),
            shininess  : new THREE.Color("#fff"),
            shininess  :  10,
            shading    :  THREE.SmoothShading,
            transparent: 1,
            opacity    : 1,
            wireframe: true
        });

        var geometry2 = new THREE.DodecahedronGeometry( 650, 1);
        sphere2 = new THREE.Mesh( geometry2, sphereMaterial2 );
        sphere2.receiveShadow = true;
        sphere2.castShadow = true;
        // scene.add( sphere2 );

        var torusMaterial = new THREE.MeshPhongMaterial({
            color      : new THREE.Color("#fff"),
            emissive   : new THREE.Color("#fc6bcf"),
            shininess  : new THREE.Color("#fff"),
            shininess  :  10,
            shading    :  THREE.FlatShading,
            transparent: 1,
            opacity    : 1,
            wireframe	: true
        });

        var geometry3 = new THREE.TorusGeometry( 580, 100, 5, 40 );
        torus = new THREE.Mesh( geometry3, torusMaterial );
        torus.receiveShadow = true;
        torus.castShadow = true;
        scene.add( torus );


        var torusM = new THREE.MeshPhongMaterial({
            color      : new THREE.Color("#fff"),
            emissive   : new THREE.Color("#c256c3"),
            shininess  : new THREE.Color("#fff"),
            shininess  :  10,
            shading    :  THREE.FlatShading,
            transparent: 1,
            opacity    : 1,
            wireframe	: true
        });

        var geometry4 = new THREE.TorusGeometry( 580, 80, 5, 40 );
        torus2 = new THREE.Mesh( geometry4, torusM);
        torus2.receiveShadow = true;
        torus2.castShadow = true;
        scene.add( torus2 );
    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        sphere2.rotation.y += 0.002
        sphere2.rotation.x += 0.002
        sphere2.rotation.z += 0.002

        // sphere.rotation.y += 0.002
        // sphere.rotation.x += 0.002
        // sphere.rotation.z += 0.002

        torus.rotation.y += 0.05
        torus.rotation.x += 0.01
        torus.rotation.z += 0.05

        torus2.rotation.y += 0.01
        torus2.rotation.x += 0.05
        torus2.rotation.z += 0.01

        for(var x = 0; x< shape.length;x++) {
            shape[x].position.z -= 5

            if(shape[x].position.z < -1000) {
                shape[x].position.z = getRandomArbitrary(0,2000)
            }
        }
    }

    function createSpotlights() {

        var sp = [];
        var helper = [];

        var spProps = [
            [0xfc6bcf , 1, 2000,128,0],
            [0x6bd6ff , 1, 2000,120,0,1],
            [0x6bd6ff , 1, 2000,100,0,1],
            [0x6bd6ff , 0.8, 2500,128,0,1]
        ];
        var spPos = [
            [0,800,800],
            [700,1000,1000],
            [700,1000,-1000],
            [0,-1300, 1200]
        ];

        for(var x = 0;x < spPos.length; x++) {
            // === spotlight
            sp[x] = new THREE.SpotLight(...spProps[x]);
            sp[x].position.set(...spPos[x])
            sp[x].castShadow = true;
            scene.add(sp[x]);
            sp[x].shadow.mapSize.width = 1024;
            sp[x].shadow.mapSize.height = 1024

            // === spotlight helper
            helper[x] = new THREE.SpotLightHelper( sp[x] );
            // scene.add( helper[x] );
        }

    }

    function randomStars() {
        var material;

        var rs = [];

        var pos = {
            x : 0,
            y : 0,
            z : 0
        }
        var color = "#fc6bcf";

        for(var x = 0; x < 200; x++) {
            material = new THREE.MeshPhongMaterial({
                color      : new THREE.Color("#fff"),
                emissive   : new THREE.Color("#35bad8"),
                shininess  : new THREE.Color("#fff"),
                shininess  :  100,
                shading    :  THREE.FlatShading,
            });
            if(x %2 == 0) {
                material.emissive = new THREE.Color(color);
            }

            pos.x = getRandomArbitrary(-(window.innerWidth+500),window.innerWidth+500);
            pos.y = getRandomArbitrary(-(window.innerHeight+1000),window.innerHeight+1000);
            pos.z = getRandomArbitrary(-1000,2000);

            rs[x] = new THREE.TetrahedronGeometry(getRandomArbitrary(2,20),1);
            shape[x] = new THREE.Mesh(rs[x], material);
            shape[x].castShadow = true;
            shape[x].position.set(pos.x,pos.y,pos.z);
            scene.add(shape[x])
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    init();
    createObj();
    createSpotlights();
    randomStars();
    render();
});

