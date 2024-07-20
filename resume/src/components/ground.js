import {
  aboveGround,
  tileScale,
  tileSheet,
  windowHeigth,
  windowWidth,
} from "../utils/globals.js";

// export async function createGround(PIXI, container) {
//   try {
//     const loadedSprite = await PIXI.Assets.load(tileSheet);

//     let x = 100;
//     for (let i = 0; i < 10; i++) {
//       let sprite = new PIXI.Sprite(loadedSprite.textures["tile1"]);
//       sprite.x = x;
//       sprite.y = windowHeigth - aboveGround;
//       x += 14;
//       container.addChild(sprite);
//     }
//   } catch (error) {
//     console.error("Error loading sprite:", error);
//   }
//   return container;
// }

export async function createGround(PIXI, container) {
  await PIXI.Assets.load(tileSheet).then((loadedSpriteSheet) => {
    let x = 100;
    for (let i = 0; i < 10; i++) {
      let sprite = new PIXI.Sprite(loadedSpriteSheet.textures["tile1"]);
      sprite.x = x;
      sprite.y = windowHeigth - aboveGround;
      x += 14;
      container.addChild(sprite);
    }
  });
  return container;
}

export async function createGroundSprite(PIXI, x, y) {
  let sprite = null;
  await PIXI.Assets.load(tileSheet).then((loadedSpriteSheet) => {
    sprite = new PIXI.Sprite(loadedSpriteSheet.textures["tile1"]);
    sprite.x = x;
    sprite.y = y;
    sprite.scale.set(3, 6);
  });

  return sprite;
}

export function createGroundSprites(PIXI, startingPoint, tileTextures) {
  let sprites = [];
  let loadedSpriteSheet = tileTextures;
  let x = startingPoint;
  let gX = startingPoint;
  for (let i = 0; i < 100; i++) {
    let sprite = new PIXI.Sprite(loadedSpriteSheet.textures["tile1"]);
    sprite.x = x;
    let groundSprite = new PIXI.Sprite(loadedSpriteSheet.textures["tile2"]);
    groundSprite.x = gX;
    groundSprite.y = windowHeigth - 2*aboveGround + 42;
    sprite.y = windowHeigth - 2*aboveGround ;
    x += sprite.width * tileScale;
    gX += groundSprite.width * tileScale;
    groundSprite.scale.set(tileScale, tileScale);
    sprite.scale.set(tileScale, tileScale);
    sprites.push(sprite);
    sprites.push(groundSprite);
  }
  for (let i = 0; i < 100; i++) {
    let sprite = new PIXI.Sprite(loadedSpriteSheet.textures["tile1"]);
    sprite.x = x;
    sprite.y = windowHeigth - 2*aboveGround ;
    x += sprite.width * tileScale;
    sprite.scale.set(tileScale, tileScale);
    sprites.push(sprite);
  }
  return sprites;
}

export async function getSpriteTexture(PIXI) {
  let texture = null;
  try {
    const loadedSprite = await PIXI.Assets.load(tileSheet);
    texture = loadedSprite.textures["title1"];
  } catch (error) {
    console.error("Error loading sprite:", error);
  }
  return texture;
}
