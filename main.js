function main() {
    const canvas = document.querySelector('.screen');
    const renderer = new THREE.WebGLRenderer({ canvas, antialiasing: true });
    // renderer.shadowMap.enabled = true;

    const fov = 95;
    const aspect = 2;
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);

        let lightX = -1;
        let lightY = 2;
        const lightZ = 2;
        light.position.set(lightX, lightY, lightZ);

        scene.add(light);
    }


    const height = 1.6;
    

    //Д

    const material3 = new THREE.MeshStandardMaterial({
        color: '#aff',
        roughness: 0.4,
        metalness: 0.6,
        side: THREE.DoubleSide
    });

    const widthLP = 0.3;
    const heightLP = height;
    const longPlaneGeometry = new THREE.PlaneGeometry(widthLP, heightLP);

    const widthSP = 0.3;
    const heightSP = heightLP / 2;
    const shortPlaneGeometry = new THREE.PlaneGeometry(widthSP, heightSP);

    const widthXSP = 0.3;
    const heightXSP = heightSP / 2;
    const xShortPlaneGeometry = new THREE.PlaneGeometry(widthXSP, heightXSP);

    const plane1 = new THREE.Mesh(longPlaneGeometry, material3);

    const plane2 = new THREE.Mesh(shortPlaneGeometry, material3);
    plane2.position.x = plane1.position.x + heightSP / 2;
    plane2.position.y = heightLP / 2;
    plane2.rotateZ(Math.PI / 2);

    const plane3 = new THREE.Mesh(longPlaneGeometry, material3);
    plane3.position.x = plane1.position.x + height / 4;
    plane3.position.y = - height / 2;
    plane3.rotateZ(Math.PI / 2);

    const plane4 = new THREE.Mesh(longPlaneGeometry, material3);
    plane4.position.x = plane1.position.x + heightLP / 2;

    const plane5 = new THREE.Mesh(xShortPlaneGeometry, material3);
    plane5.position.x = plane3.position.x - heightLP / 2 + widthXSP / 2;
    plane5.position.y = - heightLP / 2 - heightXSP / 2;

    const plane6 = new THREE.Mesh(xShortPlaneGeometry, material3);
    plane6.position.x = plane3.position.x + heightLP / 2 - widthXSP / 2;
    plane6.position.y = - heightLP / 2 - heightXSP / 2;

    const groupD = new THREE.Group();
    groupD.add(plane1);
    groupD.add(plane2);
    groupD.add(plane3);
    groupD.add(plane4);
    groupD.add(plane5);
    groupD.add(plane6);
    groupD.position.x = 1;

    scene.add(groupD);
    

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
