export const windowWidth = window.innerWidth;
export const windowHeigth = window.innerHeight;

export const characterHeight = 64;
export const characterWidth = 32;

export const aboveGround = 70;
export const groundStart = 0;

export const tileScale = 3;

export const scale = 2;

export const playerSheet = "src/assets/sheet.json";
export const tileSheet = "src/assets/tilemap/tilesheet.json";
export const backgroundSheet = "src/assets/backgrounds/sheet.json";
export const controlSheet = "src/assets/controls/sheet.json";

export const linkedIn = "src/assets/linkedin.png";
export const telegram = "src/assets/telegram.png";

export const marioFont = "src/assets/fonts/mario_font.ttf";

export const sounds = {
  coinSound : "src/assets/sounds/coin.ogg",
  background: "src/assets/sounds/bg.ogg",
}


export const worlds = {
  aboutme: 0,
  experience: 1,
  skills: 2,
};

export const introPopupDimensions = {
  width: windowWidth / 2,
  height: windowHeigth / 1.1,
};

export const whiteStyle = new PIXI.TextStyle({
  fontFamily: "MarioFont",
  fontSize: 36,
  fill: 0xffffff, // White color
  align: "center",
});

export const whiteStyleSize = (size) =>
  new PIXI.TextStyle({
    fontFamily: "MarioFont",
    fontSize: size,
    fill: 0xffffff, // White color
    align: "center",
  });

export const whiteStyleWBreak = (size) =>
  new PIXI.TextStyle({
    fontFamily: "MarioFont",
    fontSize: size,
    fill: 0xffffff, // White color
    lineHeight: 23,
    wordWrap: true,
    wordWrapWidth: 250,
  });

export const primaryText = (size) =>
  new PIXI.TextStyle({
    fontFamily: "MarioFont",
    fontSize: size,
    fill: 0x071952,
    lineHeight: 23,
  });

export const primaryTextWrap = (size) =>
  new PIXI.TextStyle({
    fontFamily: "MarioFont",
    fontSize: size,
    fill: 0x071952,
    lineHeight: 23,
    wordWrap: true,
    wordWrapWidth: 250,
  });

export const linkedinUrl =
  "https://www.linkedin.com/in/idris-shah-hyder-467aa0178/";

export const telegramUrl = "https://t.me/developerhyder";
export const characterSpeed = 5;
export const animationSpeed = {
  slow: 0.05,
  medium: 0.5,
};
export const idleFrames = ["playerIdle1", "playerIdle2"];

export const coinFrames = ["coin1", "coin2"];

export const leftMovingFrames = {
  baseFrame: "playerLeft",
  maxIndex: 9,
};

export const rightMovingFrames = {
  baseFrame: "playerRight",
  maxIndex: 9,
};

export const playerIdleFrames = {
  baseFrame: "playerIdle",
  maxIndex: 2,
};
export const playerActions = {
  left: 0,
  right: 1,
  forward: 2,
};

export const popupIntroPara =
  "Welcome, Player 1! I'm Idris, and this is my resume. Explore my skills, achievements, experience, and education as we power-up ";
