import {
    Scene,
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    PointLight,
    MeshBuilder,
    Engine,
    Mesh,
    Plane,
} from 'babylonjs';

const canvas = getCanvas();
const engine = createEngine(canvas);
const scene = createScene(engine);
const camera = createCamera(scene);
const lights = createLights(scene);
const sphere = createSphere(scene);
const box = createBox(scene);
const plane = createPlane(scene);
const ground = createGround(scene);
const line = createLine(scene);

setupControls(canvas, camera);
startRenderLoop(engine, scene);

function getCanvas() {
    return document.querySelector("canvas");
}

function createEngine(canvas) {
    const engine = new Engine(
        canvas, 
        true, 
        { preserveDrawingBuffer: true, stencil: true },
    );
    window.addEventListener("resize", () => {
        engine.resize();
    });
    return engine;
}

function createScene(engine) {
    return new Scene(engine);
}

function createCamera(scene) {
    return new ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        10,
        Vector3.Zero(),
        scene,
    );
}

function createLights(scene) {
    const light1 = new HemisphericLight(
        "light1",
        new Vector3(1, 1, 0),
        scene,
    );
    const light2 = new PointLight(
        "light2",
        new Vector3(0, 1, -1),
        scene,
    );
    return [light1, light2];
}

function createSphere(scene) {
    const sphere = MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 2 },
        scene,
    );
    sphere.position = new Vector3(1, 4, -4);
    return sphere;
}

function createBox(scene) {
    const box = MeshBuilder.CreateBox(
        "box",
        { height: 2, width: 1, depth: 0.5 },
        scene,
    );
    box.position = new Vector3(2, -1, 2);
    box.rotation = new Vector3(0, 0.5, 0);
    return box;
}

function createPlane(scene) {
    const sourcePlane = new Plane(0, -1, 1, 0);
    sourcePlane.normalize();
    const plane = MeshBuilder.CreatePlane(
        "plane", 
        { 
            height:2, 
            width: 1, 
            sourcePlane, 
            sideOrientation: Mesh.DOUBLESIDE
        }, 
        scene,
    );
    plane.position = new Vector3(-3, 0, -3);
    plane.rotation = new Vector3(-0.2, 1.1, 0);
    return plane;
}

function createGround(scene) {
    const ground = MeshBuilder.CreateGround(
        "ground", 
        { height: 1.5, width: 2.5, subdivisions: 4 }, 
        scene,
    );
    ground.position = new Vector3(0, -0.5, -2);
    ground.rotation = new Vector3(0.4, 0.15, 0);
    ground.scaling = new Vector3(1.25, 1, 4);
    return ground;
}

function createLine(scene) {
    const points = [
		new Vector3(0, 0, 0),
		new Vector3(0, 1, 1),
		new Vector3(0, 1, 0)
	]; 
	const line = MeshBuilder.CreateLines(
        "lines", 
        { points }, 
        scene,
    );
    line.position = new Vector3(-1, 1, 0);
    line.rotation = new Vector3(0.3, 2.1, 0);
    line.scaling = new Vector3(3, 1.5, 3);
    return line;
}

function setupControls(canvas, camera) {
    camera.attachControl(canvas, true);
}

function startRenderLoop(engine, scene) {
    engine.runRenderLoop(() => {
        scene.render();
    });
}