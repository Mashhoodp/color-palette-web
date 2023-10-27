var colorThief = new ColorThief();

function getColorPalette() {
  var sourceImage = $('#my-img')[0];
  var palette = colorThief.getPalette(sourceImage, 4);
  if (!palette) { return; }

  for (var i = 0; i < palette.length; i++) {
    $(`#color-${i + 1}`).css('background-color', 'rgb(' + palette[i] + ')');
  }
}

$(document).ready(function() {
  $("#file-input").on('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      $('#my-img').attr('src', reader.result);
      $('#my-img').on('load', function() {
        getColorPalette();
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

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
