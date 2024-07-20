import {
  aboveGround,
  backgroundSheet,
  controlSheet,
  groundStart,
  marioFont,
  playerSheet,
  primaryText,
  sounds,
  tileSheet,
  whiteStyleSize,
  windowHeigth,
  windowWidth,
  worlds,
} from "../utils/globals.js";
import { gravity } from "../utils/physics.js";
import {
  createClouds,
  helperText,
  onkeydown,
  onkeyup,
  updateClouds,
  updateScene,
} from "../utils/utility.js";
import {
  createGround,
  createGroundSprite,
  createGroundSprites,
} from "./ground.js";
import { createHUD, handleDynamicHUD } from "./hud.js";
import { setProtagonist } from "./player.js";
import { createAboutMeWorld, createIntro } from "./worlds.js";

async function loadFont(name, url) {
  const font = new FontFace(name, `url(${url})`);
  await font.load();
  document.fonts.add(font);
}
async function loadAssets() {
  await loadFont("MarioFont", "src/assets/fonts/mario_font.ttf");
}

export async function gamelogic(PIXI) {
  await loadAssets();
  const app = new PIXI.Application();
  await app.init({ background: "#1099bb", resizeTo: window });

  const warningDiv = document.getElementById("landscape-warning");
  PIXI.sound.add("coin-sound", sounds.coinSound);
  await PIXI.sound.Sound.from({
    url: sounds.background,
    preload: true,
    loaded: function (err, sound) {
      sound.play({
        volume: 0.1,
        loop: true,
      });
    },
  });

  // bgSound.play();

  async function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < height) {
      // Portrait mode
      app.view.style.display = "none";
      warningDiv.style.display = "block";
    } else {
      // Landscape mode
      app.view.style.display = "block";
      warningDiv.style.display = "none";
      if (windowWidth < windowHeigth) {
        window.location.reload();
      }
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
  await resize();

  // REMOVE THIS
  // helperText(PIXI, app);

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);
  // ground line
  let groundLine = setBaseScene(PIXI);
  app.stage.addChild(groundLine);

  let tileTextures = await PIXI.Assets.load(tileSheet);
  let characterTextures = await PIXI.Assets.load(playerSheet);
  let controlTextures = await PIXI.Assets.load(controlSheet);

  const characterSprite = setProtagonist(PIXI, groundLine, characterTextures);
  let dynamicHUDData = createHUD(PIXI, app, tileTextures);

  let timerCount = 0;
  let coinCount = 0;
  setInterval(() => {
    timerCount++;
    dynamicHUDData.time.text = `${timerCount}`;
  }, 1000);

  app.stage.addChild(characterSprite);
  characterSprite.scale.set(2, 2);
  characterSprite.play();

  let gContainer = await createAboutMeWorld(app, PIXI, tileTextures);
  const coins = gContainer.children.filter((item) => item.label == "coin");
  const introContainer = createIntro(app, PIXI, tileTextures, characterTextures);
  gContainer.sortChildren();
  await createBg(PIXI, app, gContainer.y);
  let cloudContainer = createClouds(PIXI, tileTextures);
  cloudContainer.x = 100;
  cloudContainer.y = 100;
  cloudContainer.zIndex = -2;
  let idValue = 0;

  app.stage.addChild(cloudContainer);

  let controls = [];

  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    controls = createControls(PIXI, controlTextures);
    controls.forEach((item) => {
      item.interactive = true;
      item.buttonMode = true;
      item.on("pointerdown", () => {
        if(introContainer.visible) {
          introContainer.visible = false;
        }
        item.scale.set(0.9, 0.9);
        idValue++;
        dynamicHUDData.name.text = idValue;
        if (item.label == "right") {
          onkeydown(
            {
              keyCode: 39,
            },
            characterSprite
          );
        } else if (item.label == "left") {
          onkeydown(
            {
              keyCode: 37,
            },
            characterSprite
          );
        } else if (item.label == "power") {
          onkeydown(
            {
              keyCode: 32,
            },
            characterSprite
          );
        }
      });
      item.on("pointerup", () => {
        item.scale.set(1, 1);
        if (item.label == "right") {
          onkeyup(
            {
              keyCode: 39,
            },
            characterSprite
          );
        } else if (item.label == "left") {
          onkeyup(
            {
              keyCode: 37,
            },
            characterSprite
          );
        } else if (item.label == "power") {
          onkeyup(
            {
              keyCode: 32,
            },
            characterSprite
          );
        }
      });
      app.stage.addChild(item);
    });
  }

  document.addEventListener("keydown", (key) => {
    idValue++;
    dynamicHUDData.name.text = idValue;
    onkeydown(key, characterSprite);
  });

  document.addEventListener("keyup", (key) => {
    onkeyup(key, characterSprite);
  });

  // console.log("check collision ", checkCollision(characterSprite, coins[0]), characterSprite.getBounds(), coins[0].getBounds())
  app.ticker.add((delta) => {
    updateScene(gContainer, characterSprite, delta.deltaTime);
    updateClouds(
      cloudContainer,
      gContainer.x,
      characterSprite,
      delta.deltaTime
    );
    handleDynamicHUD(dynamicHUDData, delta.deltaTime);
    coinCount = handleCharacterCollision(
      characterSprite,
      coins,
      dynamicHUDData.coins,
      coinCount
    );
  });
}

function handleCharacterCollision(
  characterSprite,
  coins,
  coinsText,
  coinCount
) {
  for (let i = coins.length - 1; i >= 0; i--) {
    if (checkCollision(characterSprite, coins[i])) {
      coins[i].visible = false;
      coinCount++;
      coinsText.text = `${coinCount}`;
      PIXI.sound.play("coin-sound");
    }
  }
  return coinCount;
}
function setBaseScene(PIXI) {
  const graphics = new PIXI.Graphics();
  //TODO set the ratios here
  const groundHeight = windowHeigth - aboveGround;
  graphics.moveTo(0, groundHeight);
  graphics.lineTo(windowWidth, groundHeight);
  graphics.stroke({ width: 1, color: 0xffd900 });
  return graphics;
}

function getElementByName(name, app) {
  return app.stage.getChildByName();
}

async function createBg(PIXI, app) {
  let bgTextures = await PIXI.Assets.load(backgroundSheet);
  const pointyMountains = new PIXI.Sprite(
    bgTextures.textures["pointy_mountains"]
  );
  pointyMountains.x = 0;
  pointyMountains.zIndex = -4;
  pointyMountains.scale.set(2, 2);
  pointyMountains.y = windowHeigth - pointyMountains.height;
  pointyMountains.tint = 0x399918;
  app.stage.addChild(pointyMountains);
}

function checkCollision(sprite1, sprite2) {
  // return sprite1.x > sprite2.x;
  const bounds1 = sprite1.getBounds();
  const bounds2 = sprite2.getBounds();
  return bounds1.minX < bounds2.maxX && bounds1.maxX > bounds2.minX;
}

function createControls(PIXI, controlTextures) {
  let sprites = [];

  let leftSprite = new PIXI.Sprite(controlTextures.textures["leftArrow"]);
  leftSprite.x = windowWidth - 3 * leftSprite.width;
  leftSprite.y = windowHeigth - aboveGround - leftSprite.height / 2;
  leftSprite.zIndex = 3;
  leftSprite.label = "left";
  sprites.push(leftSprite);

  let rightSprite = new PIXI.Sprite(controlTextures.textures["rightArrow"]);
  rightSprite.x = windowWidth - leftSprite.width - leftSprite.width / 2;
  rightSprite.y = windowHeigth - aboveGround - leftSprite.height / 2;

  rightSprite.label = "right";
  rightSprite.zIndex = 3;
  sprites.push(rightSprite);

  let powerSprite = new PIXI.Sprite(controlTextures.textures["powerButton"]);
  powerSprite.x = powerSprite.width;
  powerSprite.y = windowHeigth - aboveGround - leftSprite.height / 2;
  powerSprite.zIndex = 3;
  powerSprite.label = "power";
  sprites.push(powerSprite);
  return sprites;
}
