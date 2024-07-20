import { characterHeight, scale, windowHeigth } from "./globals.js";
import { inverseY } from "./utility.js";

export function gravity(character, ground, deltaTime) {
  character.y += 2 * deltaTime;

  // check if it colliding with ground
  if (character.y >= ground.bounds.maxY - (scale * characterHeight)) {
    // console.log("---", deltaTime);
    character.y = ground.bounds.maxY - (scale * characterHeight);
  }
  return character.y;
}

// {
//   "minX": -0.5,
//   "minY": 649.5,
//   "maxX": 1440.5,
//   "maxY": 650.5,
//   "matrix": {
//       "array": null,
//       "a": 1,
//       "b": 0,
//       "c": 0,
//       "d": 1,
//       "tx": 0,
//       "ty": 0
//   }
// }


// {
//     "minX": 0,
//     "maxX": 229,
//     "minY": 0,
//     "maxY": 213
// }

// {
//     "minX": -0.5,
//     "minY": 464.5,
//     "maxX": 1270.5,
//     "maxY": 465.5,
//     "matrix": {
//         "array": null,
//         "a": 1,
//         "b": 0,
//         "c": 0,
//         "d": 1,
//         "tx": 0,
//         "ty": 0
//     }
// }
