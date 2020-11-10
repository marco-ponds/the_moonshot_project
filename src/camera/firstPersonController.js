import { BaseScript, Scene, Input, math } from 'mage-engine';

export default class FirstPersonController extends BaseScript {

    constructor() {
        super('firstPersonController');
    }

    start(camera, { target }) {
        this.camera = camera;
        this.target = target;

        this.sensitivity = 0.1;
        this.xRotation = 0;

        this.mouse = {
            x: 0,
            y: 0
        };

        Input.enable();

        document.addEventListener('click', this.handleClick);
        Input.mouse.addEventListener('mouseMove', this.handleMouseMove);
    }

    handleClick = () => {
        //Scene.getDOMElement().requestPointerLock();
    }

    handleMouseMove = ({ mouse }) => {
        this.mouse.x = mouse.normalized.x * this.sensitivity;
        this.mouse.y = mouse.normalized.y * this.sensitivity;
    }

    physicsUpdate(dt) {
        this.xRotation -= this.mouse.y;
        this.xRotation = math.clamp(this.xRotation, -Math.PI/2, Math.PI);

        this.camera.setRotation({ y: this.xRotation });
        this.target.setRotation({ y: this.mouse.x * dt });
    }

}