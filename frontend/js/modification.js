import uploadHeaderView from './dashboard/views/Parametre/uploadHeaderView';
import uploadLogoView from './dashboard/views/Parametre/uploadLogoView';

const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-logo');
const imageView = document.getElementById('img-modif-view');
const dropArea2 = document.getElementById('drop-area-2');
const inputFile2 = document.getElementById('input-preambule');
const imageView2 = document.getElementById('img-modif-view-2');

inputFile.addEventListener('change', uploadImage);

async function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = '';
  console.log(imgLink);

  const formData = new FormData();
  formData.append('logo', inputFile);

  try {
    uploadLogoView.renderSpinner('Modifier Header...');
    const res = await fetch('http://localhost:3000/Parametre/uploadLogo', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('JWT'),
      },
      body: formData,
    });

    const data = await res.json();
    console.log(`upload successful`, data);
  } catch (error) {
    console.error(`${inputElement.name} upload failed`, error);
  } finally {
    uploadLogoView.unrenderSpinner();
  }
}

dropArea.addEventListener('dragover', function (e) {
  e.preventDefault();
});
dropArea.addEventListener('drop', async function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  await uploadImage();
});

inputFile2.addEventListener('change', uploadImage2);

async function uploadImage2() {
  let imgLink = URL.createObjectURL(inputFile2.files[0]);
  imageView2.style.backgroundImage = `url(${imgLink})`;
  imageView2.textContent = '';
  console.log(imgLink);

  const formData = new FormData();
  formData.append('header', inputFile);

  try {
    uploadHeaderView.renderSpinner('Modifier Header...');
    const res = await fetch('http://localhost:3000/Parametre/uploadHeader', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('JWT'),
      },
      body: formData,
    });

    const data = await res.json();
    console.log(`upload successful`, data);
  } catch (error) {
    console.error(`${inputElement.name} upload failed`, error);
  } finally {
    uploadHeaderView.unrenderSpinner();
  }
}

dropArea2.addEventListener('dragover', function (e) {
  e.preventDefault();
});
dropArea2.addEventListener('drop', async function (e) {
  e.preventDefault();
  inputFile2.files = e.dataTransfer.files;
  await uploadImage2();
});
