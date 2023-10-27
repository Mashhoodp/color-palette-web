$(document).ready(function() {
  $(".color").on('click', function(e) {
    var color = $(this).css('background-color');
    copyToClipboard(color);
  });
});

function copyToClipboard(text) {
  var hexColor = rgbToHex(text);
  navigator.clipboard.writeText(hexColor).then(function() {
    alert('Color code copied: ' + hexColor);
  }).catch(function(err) {
    console.error('Unable to copy to clipboard. Error:', err);
  });
}

function rgbToHex(rgb) {
  var regex = /\d+/g;
  var colors = rgb.match(regex);
  var r = parseInt(colors[0]);
  var g = parseInt(colors[1]);
  var b = parseInt(colors[2]);
  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}