// This file is to create the hud and the initial screen

import {
  coinFrames,
  idleFrames,
  introPopupDimensions,
  popupIntroPara,
  primaryText,
  tileScale,
  whiteStyleSize,
  whiteStyleWBreak,
  windowHeigth,
  windowWidth,
} from "../utils/globals.js";
import { createAnimation } from "../utils/utility.js";

export function createHUD(PIXI, app, tileTextures) {
  const interval = windowWidth / 5;

  const style = whiteStyleSize(16);

  const style2 = primaryText(14);

  const nameText = new PIXI.Text({ text: "IDRIS", style });
  nameText.x = interval;
  nameText.y = 20;

  const nameTextD = new PIXI.Text({ text: "000", style: style2 });
  nameTextD.x = interval;
  nameTextD.y = 45;

  const worldTextD = new PIXI.Text({ text: "1 - 1", style: style2 });
  worldTextD.x = 3 * interval;
  worldTextD.y = 45;

  const coinText = new PIXI.Text({ text: "X", style });
  coinText.x = 2 * interval - 40;
  coinText.y = 20;
  function createAnimation(frameName) {
    const textures = frameName.map((name) => tileTextures.textures[name]);
    return textures;
  }
  const coinSprite = new PIXI.AnimatedSprite(createAnimation(coinFrames));
  coinSprite.animationSpeed = 0.05;
  coinSprite.loop = true;
  coinSprite.scale.set(2, 2);
  coinSprite.x = 2 * interval;
  coinSprite.y = 15;

  const coinTextD = new PIXI.Text({ text: "00", style: style2 });
  coinTextD.x = 2 * interval - 75;
  coinTextD.y = 20;

  app.stage.addChild(coinSprite);
  coinSprite.play();

  const worldText = new PIXI.Text({ text: "World", style });
  worldText.x = 3 * interval;
  worldText.y = 20;

  const timeText = new PIXI.Text({ text: "Time", style });
  timeText.x = 4 * interval;
  timeText.y = 20;

  const timeTextD = new PIXI.Text({ text: "Time", style: style2 });
  timeTextD.x = 4 * interval;
  timeTextD.y = 45;

  app.stage.addChild(timeText);
  app.stage.addChild(worldText);
  app.stage.addChild(coinText);
  app.stage.addChild(nameText);

  app.stage.addChild(nameTextD);
  app.stage.addChild(worldTextD);
  app.stage.addChild(timeTextD);

  app.stage.addChild(coinTextD);

  return {
    time: timeTextD,
    name: nameTextD,
    coins: coinTextD,
  };
}


export function handleDynamicHUD(dynamicHUDData, deltaTime) {

  // dynamicHUDData.time.text = `${Math.round(deltaTime*100)}`

}
export function createIntroPopup(
  PIXI,
  popupContainer,
  tileTextures,
  characterTextures
) {
  const popupBackground = new PIXI.Graphics()
    .roundRect(
      0,
      0,
      introPopupDimensions.width,
      introPopupDimensions.height,
      10
    )
    .fill(0x36c2ce, 0.9)
    .stroke({ width: 5, color: 0x4535c1 });
  popupContainer.addChild(popupBackground);
  popupContainer.x = (windowWidth - popupContainer.width) / 2;
  popupContainer.y = (windowHeigth - popupContainer.height) / 2;
  popupContainer.zIndex = 10;

  const titleText = new PIXI.Text("Adventures of Idris !", primaryText(18));
  titleText.anchor.set(0.5);
  titleText.x = introPopupDimensions.width / 2;
  titleText.y = 50; // Top center
  popupContainer.addChild(titleText);
  const avatar = new PIXI.AnimatedSprite(
    createAnimation(idleFrames, characterTextures)
  );
  avatar.animationSpeed = 0.044;
  avatar.loop = true;
  avatar.x = introPopupDimensions.width / 2;
  avatar.y = 70;
  avatar.scale.set(2, 2);
  popupContainer.addChild(avatar);
  avatar.play();
  createHeartSprite(PIXI, tileTextures).forEach((item) =>
    popupContainer.addChild(item)
  );
  createCoinSprites(PIXI, tileTextures).forEach((item) =>
    popupContainer.addChild(item)
  );
  creatGroundForPopup(PIXI, tileTextures).forEach((item) =>
    popupContainer.addChild(item)
  );
  // Create a start button

  let boardContainer = createTextBoard(PIXI, tileTextures);
  boardContainer.x = 100;
  boardContainer.y = 100;

  let playButtonContainer = createPlayButton(PIXI, tileTextures);
  playButtonContainer.x =
    introPopupDimensions.width / 2 - playButtonContainer.width / 2;
  playButtonContainer.y = introPopupDimensions.height / 2 + 100;
  popupContainer.addChild(playButtonContainer);
  popupContainer.addChild(boardContainer);

  const hintText = new PIXI.Text(
    "(!) click on play to begin (!)",
    primaryText(12)
  );
  hintText.anchor.set(0.5);
  hintText.x = introPopupDimensions.width / 2;
  hintText.y = introPopupDimensions.height / 2 + 70;

  popupContainer.addChild(hintText);

  playButtonContainer.interactive = true;
  playButtonContainer.buttonMode = true;
  playButtonContainer.on("pointerdown", () => {
    popupContainer.visible = false;
  });
  return popupContainer;
}

// const pillarSprite = new PIXI.Sprite(tileTextures.textures["completePillar"]);
//   pillarSprite.x = -8;
//   pillarSprite.y = 54;
//   pillarSprite.scale.set(tileScale, tileScale);
//   popupContainer.addChild(pillarSprite);

//   const roofSprite = new PIXI.Sprite(tileTextures.textures["pillarRoof2"]);
//   roofSprite.x = -12;
//   roofSprite.y = 0;
//   roofSprite.scale.set(tileScale, tileScale);
//   popupContainer.addChild(roofSprite);

function createTextBoard(PIXI, tileTextures) {
  let container = new PIXI.Container();

  //board sprite
  const textStyle = whiteStyleWBreak(12);
  const text = new PIXI.Text(popupIntroPara, textStyle);
  container.addChild(text);
  text.anchor.set(0.5);
  text.x = 50;
  text.y = 70;

  return container;
}

function createPlayButton(PIXI, tileTextures) {
  let container = new PIXI.Container();
  const sprite = new PIXI.Sprite(tileTextures.textures["longBrick"]);
  //board sprite
  const textStyle = whiteStyleWBreak(12);
  sprite.scale.set(2, 2);
  const text = new PIXI.Text("PLAY", textStyle);
  container.addChild(sprite);
  container.addChild(text);
  text.anchor.set(0.5);
  text.x = sprite.width / 2;
  text.y = sprite.height / 2 + 5;
  return container;
}

function createCoinSprites(PIXI, tileTextures) {
  let sprites = [];
  let x = introPopupDimensions.width / 2 + 110;
  for (let i = 0; i < 3; i++) {
    const coinSprite = new PIXI.AnimatedSprite(
      createAnimation(coinFrames, tileTextures)
    );
    coinSprite.x = x;
    coinSprite.y = 160;
    coinSprite.scale.set(2, 2);
    coinSprite.animationSpeed = 0.05;
    coinSprite.loop = true;
    coinSprite.play();
    x += coinSprite.width + 5;
    sprites.push(coinSprite);
  }

  return sprites;
}

function createHeartSprite(PIXI, tileTextures) {
  let sprites = [];
  let x = introPopupDimensions.width / 2 + 100;
  for (let i = 0; i < 3; i++) {
    const heartSprite = new PIXI.Sprite(tileTextures.textures["fullHeart"]);
    heartSprite.x = x;
    heartSprite.y = 120;
    heartSprite.scale.set(2, 2);
    x += heartSprite.width + 5;
    sprites.push(heartSprite);
  }
  return sprites;
}

function creatGroundForPopup(PIXI, tileTextures) {
  let sprites = [];
  let x = 100;

  const cactus = new PIXI.Sprite(tileTextures.textures["trueCactus"]);
  cactus.x = x;
  cactus.scale.set(3, 3);

  cactus.y = introPopupDimensions.height - cactus.height ;
  sprites.push(cactus);

  //   const cactus2 = new PIXI.Sprite(tileTextures.textures["cactusBig"]);
  //   cactus2.x = introPopupDimensions.width / 2;
  //   cactus2.y = introPopupDimensions.height - cactus2.height * 2 - 10;
  //   cactus2.scale.set(2, 2);
  //   sprites.push(cactus2);

  const cactus3 = new PIXI.Sprite(tileTextures.textures["cactusSmall"]);
  cactus3.x = introPopupDimensions.width / 3 - 40;
  cactus3.y = introPopupDimensions.height - cactus3.height * 2 ;
  cactus3.scale.set(2, 2);
  sprites.push(cactus3);

  //   const tree = new PIXI.Sprite(tileTextures.textures["tree"]);
  //   tree.x = introPopupDimensions.width / 1.5;
  //   tree.y = introPopupDimensions.height - tree.height * 2 - 10;
  //   tree.scale.set(2, 2);
  //   sprites.push(tree);

  const rightSign = new PIXI.Sprite(tileTextures.textures["rightBoard"]);
  rightSign.x = introPopupDimensions.width - 150;
  rightSign.y = introPopupDimensions.height - rightSign.height * 2 ;
  rightSign.scale.set(2, 2);
  sprites.push(rightSign);

  return sprites;
}
