"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  // adds eventlistner that updates on every input on the colorwheel
  document.querySelector("#colorwheel").addEventListener("input", showColor);
}

function showColor() {
  // displays the value from the colorwheel as a background color on #color_box
  const colorPicked = document.querySelector("#colorwheel").value;
  document.querySelector("#color_box").style.backgroundColor = colorPicked;

  // call multiple functions with the value from the colorwheel
  showHEX(colorPicked);
  calculateColorPickedToRGB(colorPicked);
}

function showHEX(colorPicked) {
  // the value from the colorwheel is already in hexidecimal and doesn't have to convert it
  const hexTxt = document.querySelector("#hex");
  hexTxt.querySelector("span").textContent = colorPicked;
}

function calculateColorPickedToRGB(colorPicked) {
  // divide the hexdecimal to double digits/characters and converting them to rgb values
  let rHex = colorPicked.substring(1, 3);
  let gHex = colorPicked.substring(3, 5);
  let bHex = colorPicked.substring(5);

  let r = parseInt(rHex, 16);
  let g = parseInt(gHex, 16);
  let b = parseInt(bHex, 16);

  // calling showRGB and calculateRGBToHSL with the r, g and b parameters
  showRGB(r, g, b);
  calculateRGBToHSL(r, g, b);
}

function showRGB(r, g, b) {
  // uses the r, g and b parameters in string literal and displaying it in the DOM
  const rgbTxt = document.querySelector("#rgb");
  rgbTxt.querySelector("span").textContent = `rgb(${r}, ${g}, ${b})`;
}

function calculateRGBToHSL(r, g, b) {
  // converts RGB to HSL. I have no idea whats going on here..
  // ***** beginning of borrowed code - conversion of rgb to hsl *****
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  // ***** end of borrowed code *****

  // rounds values of h, s and l to whole numbers with no decimals
  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  // calls showHSL with the h, s and l parameters
  showHSL(h, s, l);
}

function showHSL(h, s, l) {
  // uses the h, s and l parameters and display them in the DOM
  const hslTxt = document.querySelector("#hsl");
  hslTxt.querySelector("span").textContent = h + "° " + s + "% " + l + "%";
}
