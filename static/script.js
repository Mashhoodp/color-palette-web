var input = document.getElementById('file-input');
  var img = document.getElementById('my-img');

  input.addEventListener('change', function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });

