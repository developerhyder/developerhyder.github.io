//

import {
  aboutEndText,
  aboutMeBg,
  aboutMeBgFour,
  aboutMeBgThree,
  aboutMeBgTwo,
  aboutMeText,
  aboutMeTextRel,
  coins,
  credits,
  endCoins,
  projectsDeloitte,
  projectsText,
} from "../utils/constants.js";
import {
  aboveGround,
  groundStart,
  linkedIn,
  linkedinUrl,
  primaryText,
  primaryTextWrap,
  telegram,
  telegramUrl,
  tileScale,
  whiteStyleWBreak,
  windowHeigth,
  windowWidth,
} from "../utils/globals.js";
import { createAnimation } from "../utils/utility.js";
import { createGroundSprites } from "./ground.js";
import { createIntroPopup } from "./hud.js";
import { setProtagonist } from "./player.js";

export async function createAboutMeWorld(app, PIXI, tileTextures) {
  let gContainer = new PIXI.Container();
  gContainer.x = groundStart;
  gContainer.y = aboveGround; // Set y to aboveGround from the bottom of the window
  let groundSprites = createGroundSprites(PIXI, 0, tileTextures);
  groundSprites.forEach((item) => {
    gContainer.addChild(item);
  });
  let namedSprites = [];

  let x = 0;
  let lastItem = null;
  createAboutMeWorldBg(
    PIXI,
    300,
    groundSprites[0].y,
    tileTextures,
    aboutMeBg
  ).forEach((item) => {
    gContainer.addChild(item);
    x = item.x;
    lastItem = item;
    if (item.label != "Sprite") {
      namedSprites.push(item);
    }
  });

  createAboutMeWorldBg(
    PIXI,
    x,
    groundSprites[0].y,
    tileTextures,
    aboutMeBgTwo
  ).forEach((item) => {
    gContainer.addChild(item);
    x = item.x;
    if (item.label != "Sprite") {
      namedSprites.push(item);
    }
  });

  createPopups(PIXI, x, groundSprites[0].y, projectsText, tileTextures).forEach(
    (item) => {
      x = item.x + item.width;
      gContainer.addChild(item);
    }
  );

  createAboutMeWorldBg(
    PIXI,
    x,
    groundSprites[0].y,
    tileTextures,
    aboutMeBgThree
  ).forEach((item) => {
    gContainer.addChild(item);
    x = item.x;
    if (item.label != "Sprite") {
      namedSprites.push(item);
    }
  });

  createPopups(
    PIXI,
    x,
    groundSprites[0].y,
    projectsDeloitte,
    tileTextures
  ).forEach((item) => {
    x = item.x + item.width;
    gContainer.addChild(item);
  });
  createAboutMeWorldBg(
    PIXI,
    x,
    groundSprites[0].y,
    tileTextures,
    aboutMeBgFour
  ).forEach((item) => {
    gContainer.addChild(item);
    x = item.x;
    if (item.label != "Sprite") {
      namedSprites.push(item);
    }
  });

  let linkedin = await PIXI.Assets.load(linkedIn);
  const linkedInSprite = new PIXI.Sprite(linkedin);
  linkedInSprite.scale.set(0.2, 0.2);
  linkedInSprite.x = x + 250;
  linkedInSprite.y = groundSprites[0].y - 2 * linkedInSprite.height;
  linkedInSprite.interactive = true;
  linkedInSprite.buttonMode = true;

  linkedInSprite.on("pointerdown", () => {
    window.open(linkedinUrl, "_blank").focus();
  });

  gContainer.addChild(linkedInSprite);

  x = linkedInSprite.x;

  let telegramI = await PIXI.Assets.load(telegram);
  const telegramSprite = new PIXI.Sprite(telegramI);
  telegramSprite.scale.set(0.2, 0.2);
  telegramSprite.x = x + 250;
  telegramSprite.interactive = true;
  telegramSprite.buttonMode = true;
  telegramSprite.y = groundSprites[0].y - 2 * telegramSprite.height;
  gContainer.addChild(telegramSprite);

  telegramSprite.on("pointerdown", () => {
    window.open(telegramUrl, "_blank").focus();
  });

  aboutMeTextBg(PIXI, groundSprites[0].y).forEach((item) => {
    gContainer.addChild(item);
  });

  aboutMeCustomText(PIXI, namedSprites).forEach((item) => {
    gContainer.addChild(item);
  });

  // place coins
  createAboutMeWorldBg(
    PIXI,
    0,
    groundSprites[0].y,
    tileTextures,
    coins
  ).forEach((item) => {
    gContainer.addChild(item);
    if (item.label != "Sprite") {
      namedSprites.push(item);
    }
  });

  createPopups(
    PIXI,
    x + 300,
    groundSprites[0].y,
    credits,
    tileTextures
  ).forEach((item) => {
    x = item.x + item.width;
    gContainer.addChild(item);
  });

  aboutEnd(PIXI, groundSprites[0].y, x).forEach((item) => {
    gContainer.addChild(item);
  });

  createAboutMeWorldBg(
    PIXI,
    x,
    groundSprites[0].y,
    tileTextures,
    endCoins
  ).forEach((item) => {
    gContainer.addChild(item);
    if (item.label != "Sprite") {
      namedSprites.push(item);
    }
  });

  app.stage.addChild(gContainer);

  return gContainer;
}

export function createIntro(app, PIXI, tileTextures, characterTextures) {
  let introContainer = new PIXI.Container();
  createIntroPopup(PIXI, introContainer, tileTextures, characterTextures);
  app.stage.addChild(introContainer);

  return introContainer;
}

function createAboutMeWorldBg(PIXI, x, y, tileTextures, spritesInfo) {
  let sprites = [];
  spritesInfo.forEach((item) => {
    let sprite = null;
    if (item.animated) {
      sprite = new PIXI.AnimatedSprite(
        createAnimation(item.name, tileTextures)
      );
    } else {
      sprite = new PIXI.Sprite(tileTextures.textures[item.name]);
    }

    if (item.id) {
      sprite.label = item.id;
    }
    if (item.grounded) {
      x += item.x;
      sprite.x = x;
      sprite.scale.set(tileScale, tileScale);
      sprite.y = y - sprite.height;
    } else {
      x += item.x;
      sprite.x = x;
      sprite.scale.set(tileScale, tileScale);
      sprite.y = y - (item?.y ?? 0) - sprite.height;
    }

    if (item.flipX) {
      sprite.scale.x = -tileScale;
    }
    if (item.animated) {
      sprite.animationSpeed = 0.044;
      sprite.play();
    }
    sprites.push(sprite);
  });
  return sprites;
}

function aboutMeTextBg(PIXI, y) {
  let texts = [];

  let x = windowWidth / 6;
  aboutMeText.forEach((item) => {
    let text = new PIXI.Text({
      text: item.text,
      style:
        item.style == "primary"
          ? primaryText(item.size)
          : whiteStyleWBreak(item.size),
    });

    x += item.x;
    text.y = y - windowHeigth / 3 + item.y;
    text.x = x;
    x += text.width;
    texts.push(text);
  });
  return texts;
}

function aboutEnd(PIXI, y, x) {
  let texts = [];

  aboutEndText.forEach((item) => {
    let text = new PIXI.Text({
      text: item.text,
      style:
        item.style == "primary"
          ? primaryTextWrap(item.size)
          : whiteStyleWBreak(item.size),
    });

    x += item.x;
    text.y = y - windowHeigth / 3 + item.y;
    text.x = x;;
    x += text.width;
    texts.push(text);
  });
  return texts;
}

function aboutMeCustomText(PIXI, sprites) {
  let texts = [];
  sprites.forEach((item) => {
    aboutMeTextRel.forEach((relItem) => {
      if (item.label == relItem.id) {
        let text = new PIXI.Text({
          text: relItem.text,
          style:
            relItem.style == "primary"
              ? primaryText(relItem.size)
              : whiteStyleWBreak(relItem.size),
        });
        text.y = item.y - text.height - relItem.y;
        text.x = relItem.x + item.x;
        texts.push(text);
      }
    });
  });
  return texts;
}

function createProjectPopup(PIXI, config, tileTextures, textContent) {
  let container = new PIXI.Container();

  const popupBackground = new PIXI.Graphics()
    .roundRect(0, 0, config.width, config.height, 10)
    .fill({ color: 0x36c2ce, alpha: 0.9 })
    .stroke({ width: 5, color: 0x4535c1 });

  container.addChild(popupBackground);
  container.x = config.x;
  container.y = config.y;

  const titleText = new PIXI.Text({
    text: textContent.title,
    style: primaryTextWrap(16),
  });
  titleText.x = config.width / 5;
  titleText.y = 20;

  const subText = new PIXI.Text({
    text: textContent.text,
    style: primaryTextWrap(12),
  });
  subText.x = config.width / 5;
  subText.y = 80;
  container.addChild(titleText);
  container.addChild(subText);
  return container;
}

function createPopups(PIXI, x, y, projects, tileTextures) {
  let containers = [];

  projects.forEach((item) => {
    x += item.x;
    let container = createProjectPopup(
      PIXI,
      {
        x,
        y: y - item.y,
        width: 400,
        height: 200,
      },
      tileTextures,
      item
    );
    containers.push(container);
  });
  return containers;
}
