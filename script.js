"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  // adds eventlistener that updates on every input on the colorwheel
  document.querySelector("#colorwheel").addEventListener("input", getColor);
}

function getColor() {
  const colorPicked = document.querySelector("#colorwheel");

  // defines hex, rgb, and hsl as the return values of the different functions
  const hex = getHex(colorPicked);
  const rgb = calculateHexToRGB(hex);
  const hsl = calculateRGBToHSL(rgb);

  // call multiple functions with the value from the colorwheel
  displayColorPicked(hex);
  showHEX(hex);
  showRGB(rgb);
  showHSL(hsl);
}

function displayColorPicked(hex) {
  document.querySelector("#color_box").style.backgroundColor = hex;
}

function getHex(colorPicked) {
  const colorHex = colorPicked.value;
  return colorHex;
}

function showHEX(colorPicked) {
  // the value from the colorwheel is already in hexidecimal and doesn't have to convert it
  const hexTxt = document.querySelector("#hex");
  hexTxt.querySelector("span").textContent = colorPicked;
}

function calculateHexToRGB(hex) {
  // divide the hexdecimal to double digits/characters and converting them to rgb values
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5), 16);

  return { r, g, b };
}

function showRGB(rgb) {
  // uses the r, g and b parameters in string literal and displaying it in the DOM
  const rgbTxt = document.querySelector("#rgb");
  rgbTxt.querySelector("span").textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function calculateRGBToHSL(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
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

  // ***** end of borrowed code *****

  // rounds values of h, s and l to whole numbers with no decimals
  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  // calls showHSL with the h, s and l parameters
  return { h, s, l };
}

function showHSL(hsl) {
  // uses the h, s and l parameters and display them in the DOM
  const hslTxt = document.querySelector("#hsl");
  hslTxt.querySelector("span").textContent = hsl.h + "° " + hsl.s + "% " + hsl.l + "%";
}
