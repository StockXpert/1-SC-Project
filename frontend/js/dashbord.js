const profileContainer = document.querySelector('.profile');
// console.log(profileContainer);

document.addEventListener('DOMContentLoaded', e => {
  // console.log(localStorage.getItem('JWT'));
  fetchUserInfo();
});

function displayUserInfo(user) {
  const html = `
    <div class="info">
      <p>${user.email}</p>
      <small class="text-muted">${user.role}</small>
    </div>
      <div class="profile-photo">
      <img src="../img/use-img.jpeg" alt="photo du user" />
    </div>
  `;
  profileContainer.innerHTML = html;
}

async function fetchUserInfo() {
  try {
    const res = await fetch('http://localhost:3000/Users/showUser', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Some shit is wrong');
    const data = await res.json();
    const [user] = data.response;
    // console.log(user);
    // console.log(data.response);
    displayUserInfo(user);
  } catch (error) {
    console.error(error);
  }
}
