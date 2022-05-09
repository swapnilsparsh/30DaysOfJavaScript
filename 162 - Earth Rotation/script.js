var earthTexture = document.getElementById("Earth");
var cloudTexture = document.getElementById("Clouds");
var earthOffset = 380;
var cloudOffset = 510;
TweenMax.to(this, 50, {
  cloudOffset: "+=512",
  repeat: -1,
  ease: Linear.easeNone
});
TweenMax.to(this, 120, {
  earthOffset: "+=640",
  repeat: -1,
  ease: Linear.easeNone,
  onUpdate: updateTextures
});

function updateTextures() {
  earthTexture.setAttribute("patternTransform", "translate(" + earthOffset + " 128)");
  cloudTexture.setAttribute("patternTransform", "translate(" + cloudOffset + " 128)");
}