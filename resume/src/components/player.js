import {
  animationSpeed,
  characterHeight,
  characterSpeed,
  idleFrames,
  playerActions,
  scale,
  windowWidth,
} from "../utils/globals.js";

export function setProtagonist(PIXI, ground, characterSpriteSheet) {
  let sprite = null;
  let spritesheet = null;
  spritesheet = characterSpriteSheet;
  function createAnimation(frameName) {
    const textures = frameName.map((name) => spritesheet.textures[name]);
    return textures;
  }
  const initialFrames = idleFrames;
  sprite = new PIXI.AnimatedSprite(createAnimation(initialFrames));
  sprite.animationSpeed = animationSpeed.slow;
  sprite.loop = true;
  sprite.x = windowWidth / 2 - sprite.width / 2;
  sprite.y = ground.bounds.maxY - scale * characterHeight;
  sprite.zIndex=1;
  sprite.changeAnimation = (newFrames) => {
    const newTextures = newFrames.map((name) => spritesheet.textures[name]);
    sprite.textures = newTextures;
    sprite.play();
  };
  sprite.changeAnimationSpeed = (speed) => {
    sprite.animationSpeed = speed;
    sprite.play();
  };
  sprite.currentDirection = playerActions.forward;
  sprite.currentSpeed = characterSpeed;
  return sprite;
}
