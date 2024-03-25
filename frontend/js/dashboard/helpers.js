import { TIMEOUT_SEC, FUSE_OPTIONS } from './config.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const formatDate = inputDate => {
  // Parse input date string into a Date object
  const date = new Date(inputDate);

  // Extract year, month, and day
  const year = date.getFullYear();
  // Months are zero-based, so add 1 to get the correct month
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date in the desired format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

// export const AJAX = async function (url, uploadData = undefined) {
//   try {
//     const fetchPro = uploadData
//       ? fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(uploadData),
//         })
//       : fetch(url);

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
export const getJSON = async function (url) {
  try {
    // console.log(localStorage.getItem('JWT'));
    const fetchPro = fetch(url, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'content-Type': 'application/json',
      },
    });
    // console.log(fetchPro);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    if (!res.ok)
      throw new Error(`${data.error} (${res.statusText} - ${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const truncateEmail = function (email) {
  const formatWord = function (word) {
    return word.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  // split the email address at the @ symbol
  let parts = email.split('@');
  // set the part before the @ symbol
  let truncatedPart = parts[0];
  truncatedPart = formatWord(truncatedPart);
  return truncatedPart;
};
export const capitalizeWord = function (word) {
  return word.toUpperCase();
};
export const capitalizeFirstLetter = function (word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
export const roleTranslator = function (Brole) {
  switch (Brole) {
    case 'Service achat':
      return 'S. Achat';
    case 'Magasinier':
      return 'Magasinier';
    case 'Directeur':
      return 'Directeur';
    case 'SG':
      return 'SG';
    case 'Responsable directe':
      return 'Resp. Direct';
    case 'Consommateur':
      return 'Consommateur';
    case 'Administrateur System':
      return 'Administrateur';
  }
};

// fuzzySearchFunctionMaker:
export const fuzzySearch = (list, keys = []) => {
  const fuse = new Fuse(list, { ...FUSE_OPTIONS, keys });
  return pattern => fuse.search(pattern);
};
