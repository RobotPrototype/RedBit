const VIEW_TOP = 224;
const VIEW_BOTTOM = -224;
const VIEW_LEFT = -256;
const VIEW_RIGHT = 256;

function createContext(canvasName) {
  console.log("Create context: " + canvasName);

  var canvas = document.getElementById(canvasName);
  var engine = new BABYLON.Engine(canvas);
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);

  camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 0), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  camera.orthoTop = VIEW_TOP;
  camera.orthoBottom = VIEW_BOTTOM;
  camera.orthoLeft = VIEW_LEFT;
  camera.orthoRight = VIEW_RIGHT;

  return {
    canvas: canvas,
    engine: engine,
    scene: scene,
    camera: camera,
  }
}
