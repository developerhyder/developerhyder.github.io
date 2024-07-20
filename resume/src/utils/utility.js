import {
  animationSpeed,
  characterSpeed,
  leftMovingFrames,
  playerActions,
  playerIdleFrames,
  rightMovingFrames,
  whiteStyleSize,
  windowHeigth,
  windowWidth,
} from "./globals.js";

export function inverseY(y) {
  return windowY() - y;
}

export function windowY() {
  return windowWidth;
}
export const frames = (frameObj) => {
  let frames = [];
  for (let i = 1; i <= frameObj.maxIndex; i++) {
    frames.push(`${frameObj.baseFrame}${i}`);
  }

  return frames;
};
function changeCharacterAnimation(direction, characterSprite) {
  //   characterSprite.stop();
  switch (direction) {
    case playerActions.left:
      characterSprite.changeAnimation(frames(leftMovingFrames));
      characterSprite.changeAnimationSpeed(animationSpeed.medium);
      break;
    case playerActions.right:
      characterSprite.changeAnimation(frames(rightMovingFrames));
      characterSprite.changeAnimationSpeed(animationSpeed.medium);
      break;
    case playerActions.forward:
      characterSprite.changeAnimation(frames(playerIdleFrames));
      characterSprite.changeAnimationSpeed(animationSpeed.slow);
      break;
  }
}

export function onkeydown(key, characterSprite) {
  if (key.keyCode == 87 || key.keyCode == 38) {
    // up
  }
  if (key.keyCode === 83 || key.keyCode === 40) {
    //down
  }
  if (key.keyCode === 65 || key.keyCode === 37) {
    //left
    if (characterSprite.currentDirection != playerActions.left) {
      changeCharacterAnimation(playerActions.left, characterSprite);
      characterSprite.currentDirection = playerActions.left;
    }
  }
  if (key.keyCode === 68 || key.keyCode === 39) {
    // Right
    if (characterSprite.currentDirection != playerActions.right) {
      changeCharacterAnimation(playerActions.right, characterSprite);
      characterSprite.currentDirection = playerActions.right;
    }
  }
  if (key.keyCode == 32) {
    characterSprite.currentSpeed = 2 * characterSpeed;
  }

  return characterSprite.x;
}

export function onkeyup(key, characterSprite) {
  characterSprite.currentDirection = playerActions.forward;
  changeCharacterAnimation(playerActions.forward, characterSprite);
  if (key.keyCode == 32) {
    characterSprite.currentSpeed = characterSpeed;
  }
}

// TODO: complete thismethod
export function createClouds(PIXI, tileTextures) {
  let cloudContainer = new PIXI.Container();
  let x = 10;
  for (let i = 0; i < 10; i++) {
    const cloudSprite = new PIXI.Sprite(tileTextures.textures["cloudBig"]);
    cloudSprite.x = x;
    cloudSprite.y = 10 + Math.random() * 20;
    x += cloudSprite.width + 150 + Math.random() * 20;
    cloudSprite.rotation = Math.PI;
    cloudSprite.scale.set(2, 2);
    cloudContainer.addChild(cloudSprite);
  }
  x = -200;
  for (let i = 0; i < 20; i++) {
    if (i % 2 == 0) {
      const cloudSprite = new PIXI.Sprite(tileTextures.textures["cloudSmall"]);
      cloudSprite.x = x;
      cloudSprite.y = 10 + Math.random() * 20;
      x += cloudSprite.width + 150 + Math.random() * 20;
      cloudSprite.rotation = Math.PI;
      cloudSprite.scale.set(2, 2);
      cloudContainer.addChild(cloudSprite);
    } else {
      x += 50 + Math.random() * 20;
    }
  }

  return cloudContainer;
}

export function helperText(PIXI, app) {
  const style = whiteStyleSize(9);
  const topLeftText = new PIXI.Text({ text: "x: 0, y: 0", style });
  topLeftText.x = 0;
  topLeftText.y = 0;
  app.stage.addChild(topLeftText);

  const bottomLeftText = new PIXI.Text({
    text: `x: 0, y: ${windowHeigth} - 50`,
    style,
  });
  bottomLeftText.x = 0;
  bottomLeftText.y = windowHeigth - 50;
  bottomLeftText.zIndex = 2;
  app.stage.addChild(bottomLeftText);

  const topRightText = new PIXI.Text({
    text: `x:${windowWidth} - 150, y: 0`,
    style,
  });
  topRightText.x = windowWidth - 150;
  topRightText.y = 0;
  app.stage.addChild(topRightText);

  const bottomRightText = new PIXI.Text({
    text: `x:${windowWidth} - 250, y: ${windowHeigth} - 50`,
    style,
  });

  bottomRightText.x = windowWidth - 250;
  bottomRightText.y = windowHeigth - 50;
  bottomRightText.zIndex = 2;
  app.stage.addChild(bottomRightText);
}

export function createAnimation(frameName, tileTextures) {
  const textures = frameName.map((name) => tileTextures.textures[name]);
  return textures;
}

export function updateScene(container, characterSprite, deltaTime) {
  console.log("container ", container.x);
  if (container.x > 0 && container.x < 10) {
    container.x = -1;
  }
  if (container.x < -13900 && container.x > -14500) {
    container.x = -13800;
  }
  if (
    container.x <= 0 &&
    characterSprite.currentDirection == playerActions.left
  ) {
    container.x += characterSprite.currentSpeed * deltaTime;
  }
  if (
    container.x <= 0 &&
    characterSprite.currentDirection == playerActions.right
  ) {
    container.x -= characterSprite.currentSpeed * deltaTime;
  }
}

export function updateClouds(
  container,
  groundValue,
  characterSprite,
  deltaTime
) {
  if (groundValue < 0) {
    if (characterSprite.currentDirection == playerActions.left) {
      container.children.forEach((item) => {
        if (item.texture.label == "cloudBig") {
          item.x -= 0.02 * deltaTime;
        } else if (item.texture.label == "cloudSmall") {
          item.x -= 0.2 * deltaTime;
        }
      });
    } else if (characterSprite.currentDirection == playerActions.right) {
      container.children.forEach((item) => {
        if (item.texture.label == "cloudBig") {
          item.x += 0.02 * deltaTime;
        } else if (item.texture.label == "cloudSmall") {
          item.x += 0.08 * deltaTime;
        }
      });
    }
  }
}
