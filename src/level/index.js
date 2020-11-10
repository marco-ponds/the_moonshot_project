import {
    Level,
    Box,
    Scene,
    Cylinder,
    Controls,
    Models,
    AmbientLight,
    SunLight,
    constants,
    Scripts
} from 'mage-engine';

import FirstPersonController from '../camera/firstPersonController';

export default class Intro extends Level {

    setupLights() {
        this.ambientLight = new AmbientLight({ color: 0xffffff });
        this.sunLight = new SunLight({ position: { x: 100, y: 100, z: 100 }});
    }

    setUpStars() {
        Scene.setBackground('stars');
    }

    createArk() {
        const model = Models.getModel('ark');
        model.setMaterialFromName(constants.MATERIALS.STANDARD);
        model.enablePhysics({ mass: 0 });
    }

    createCube() {
        const box = new Box(1, 1, 1, 0xf0f0f0);
        box.setPosition({ y: 6, z: 1 });
        box.setWireframe(true);
        box.enablePhysics({ mass: 10 });

        window.box = box;

        return box;
    }

    onCreate() {
        this.setupLights();
        this.createArk();
        this.setUpStars();

        Scripts.create('FirstPersonController', FirstPersonController);

        const player = this.createCube();
        player.add(Scene.getCamera());

        // Scene.getCamera().addScript('FirstPersonController', { target: player });

        Controls.setFirstPersonControl({
            close: 0,
            far: 0.5,
            jumpSpeed: 5,
            speed: 30,
            slowDownFactor: 10,
            //position: { x: 0, y: 4, z: 1 },
            mass: 1,
            height: 1,
            target: player
        });

        //Controls.setOrbitControl();

    }
}
