const VIEW_TOP = 1;
const VIEW_BOTTOM = 448;
const VIEW_LEFT = 1;
const VIEW_RIGHT = 512;

function createContext(canvasName) {
  console.log("Create context: " + canvasName);

  var canvas = document.getElementById(canvasName);
  var engine = new BABYLON.Engine(canvas);
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(.1, .5, .5);

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
