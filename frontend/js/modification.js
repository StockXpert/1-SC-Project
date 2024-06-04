const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-logo');
const imageView = document.getElementById('img-modif-view');
const dropArea2 = document.getElementById('drop-area-2');
const inputFile2 = document.getElementById('input-preambule');
const imageView2 = document.getElementById('img-modif-view-2');

inputFile.addEventListener('change', uploadImage);

function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = '';
}

dropArea.addEventListener('dragover', function (e) {
  e.preventDefault();
});
dropArea.addEventListener('drop', function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

inputFile2.addEventListener('change', uploadImage2);

function uploadImage2() {
  let imgLink = URL.createObjectURL(inputFile2.files[0]);
  imageView2.style.backgroundImage = `url(${imgLink})`;
  imageView2.textContent = '';
}

dropArea2.addEventListener('dragover', function (e) {
  e.preventDefault();
});
dropArea2.addEventListener('drop', function (e) {
  e.preventDefault();
  inputFile2.files = e.dataTransfer.files;
  uploadImage2();
});
