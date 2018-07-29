const TILE_SIZE = 64;
const EPSILON = 0.01;

function spriteFactory(scene, assetPath, name, numInstances) {
  console.log("Create sprite factory: " + name);

  var factory = new BABYLON.SpriteManager(name,
    assetPath,
    numInstances,
    TILE_SIZE,
    scene,
    EPSILON,
    BABYLON.Texture.NEAREST_SAMPLINGMODE);
  return factory;
}

function sprite(factory, name) {
  console.log("Create sprite: " + name);

  var sprite = new BABYLON.Sprite(name, factory);
  sprite.height = factory.cellHeight;
  sprite.width = factory.cellWidth;
  sprite.position.z = 1;
  return sprite;
}
