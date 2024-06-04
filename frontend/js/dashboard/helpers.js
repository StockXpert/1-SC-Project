import { TIMEOUT_SEC, FUSE_OPTIONS } from './config.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3/dist/fuse.esm.js';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const timeoutRes = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(500);
    }, s * 1000);
  });
};
export const isNodeList = function (obj) {
  return NodeList.prototype.isPrototypeOf(obj);
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
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export function formatDateProfile(inputDate) {
  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Extract the day, month, and year from the Date object
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
  const year = date.getUTCFullYear();

  // Format the date as dd/mm/yyyy
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

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
// export const getJSON = async function (url) {
//   try {
//     console.log('getJSON executing ...');
//     // console.log(localStorage.getItem('JWT'));
//     const fetchPro = fetch(url, {
//       method: 'GET',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//         'content-Type': 'application/json',
//       },
//     });
//     // console.log(fetchPro);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // console.log(res);
//     const data = await res.json();
//     // console.log(data);
//     // localStorage.setItem('JWT', data.jwt);
//     if (!res.ok)
//       throw new Error(`${data.error} (${res.statusText} - ${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const te

export const getJSON = async function (url) {
  try {
    // console.log(localStorage.getItem('JWT'));
    const res = await Promise.race([
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'content-Type': 'application/json',
        },
      }),
      timeout(TIMEOUT_SEC),
    ]);

    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: localStorage.getItem('JWT'),
    //     'content-Type': 'application/json',
    //   },
    // });
    const data = await res.json();
    // console.log(data);
    // console.log(res);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const getJSONBody = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: localStorage.getItem('JWT'),
    //     'content-Type': 'application/json',
    //   },
    // });
    const data = await res.json();
    // console.log(data);
    // console.log(res);
    // if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC), // Assuming timeout function is defined elsewhere
    ]);

    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    renderError('API Error', error.message); // More specific error handling possible
    console.error('Error in sendJSON:', error); // Optional for logging detailed errors
    throw error; // Re-throw for potential global error handling (optional)
  }
};

export const putJSON = async function (url, uploadData) {
  try {
    console.log('putJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    console.log([res, data]);
    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const putJSONReturnResResp = async function (url, uploadData) {
  // try {
  console.log('putJSON');
  const res = await Promise.race([
    fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }),
    timeout(TIMEOUT_SEC),
  ]);
  const data = await res.json();
  console.log([res, data]);
  return [res, data];
  //   if (!res.ok) throw new Error(`${data.message} (${res.status}`);
  //   return data;
  // } catch (err) {
  //   throw err;
  // }
};

export const delJSON = async function (url, uploadData) {
  try {
    console.log('delJSON');
    const res = await Promise.race([
      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('JWT'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const delJSONReturnResResp = async function (url, uploadData) {
  // try {
  console.log('delJSONReturn');
  console.log(uploadData);
  const res = await Promise.race([
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }),
    timeout(TIMEOUT_SEC),
  ]);
  const data = await res.json();
  // console.log(data);
  return [res, data];
  // if (!res.ok) throw new Error(`${data.message} (${res.status}`);
  // return data;
  // } catch (err) {
  // throw err;
  // }
};
export const postJSONReturnResResp = async function (url, uploadData) {
  // try {
  console.log(uploadData);
  const res = await Promise.race([
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }),
    timeout(TIMEOUT_SEC),
  ]);
  const data = await res.json();
  // console.log(data);
  return [res, data];
  // if (!res.ok) throw new Error(`${data.message} (${res.status}`);
  // return data;
  // } catch (err) {
  // throw err;
  // }
};
export const postJSONReturnResRespNoTO = async function (url, uploadData) {
  try {
    console.log(uploadData);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const data = await res.json();
    // console.log(data);

    if (!res.ok) throw new Error(`${data.message} (${res.status}`);
    // return data;.
    return [res, data];
  } catch (err) {
    throw err;
  }
};

export const getJSONReturnResResp = async function (url) {
  // try {
  const res = await Promise.race([
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('JWT'),
        'Content-Type': 'application/json',
      },
    }),
    timeout(TIMEOUT_SEC),
  ]);
  const data = await res.json();
  console.log([res, data]);
  if (!res.ok && res.status !== 403) {
    // return res;
    throw new Error(`${res.statusText} (${res.status}) : ${data.error}
  `);
  }
  return [res, data];
  // } catch (err) {
  //   throw err;
  // }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     console.log(data);

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const putJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'PUT',
//       headers: {
//         Authorization: localStorage.getItem('JWT'),
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

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
export const roleTranslator = function (RoleInTheBackend) {
  switch (RoleInTheBackend) {
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

export const findNodeIndex = function (nodeList, targetNode) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i] === targetNode) {
      return i; // Return the index if the node matches the target node
    }
  }
  return -1; // Return -1 if the target node is not found in the NodeList
};

export const getUpdateObject = function (oldObj, newObj) {
  const updateObj = {};

  // Iterate through properties of the new object
  for (const key in newObj) {
    // Check if the property exists in the old object and has a different value
    if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
      // Add the property to the update object with the new value
      updateObj[key] = newObj[key];
    }
  }

  return updateObj;
};

export const removeUndefinedProperties = function (obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export const removeChildrenFromSecond = function (element) {
  if (element.children.length >= 2) {
    for (let i = element.children.length - 1; i >= 1; i--) {
      element.removeChild(element.children[i]);
    }
  }
};
export const getCheckboxStates = function (checkboxes) {
  const checkboxStates = [];
  checkboxes.forEach(function (checkbox) {
    checkboxStates.push(checkbox.checked);
  });
  return checkboxStates;
};
export const setCheckboxStates = function (nodeList, booleanArray) {
  nodeList.forEach((checkbox, index) => {
    checkbox.checked = booleanArray[index];
  });
};

export const checkSpecialArray = function (nodeList, specialArray) {
  const result = [];
  nodeList.forEach(checkbox => {
    result.push(specialArray.includes(checkbox.name));
  });
  return result;
};

export const compareAndGetUpdates = function (oldArray, newArray) {
  const resultObj = {
    add: [],
    delete: [],
  };
  oldArray.forEach((value, index) => {
    resultObj.add.push(newArray[index] && !value);
    resultObj.delete.push(!newArray[index] && value);
  });
  return resultObj;
};

export const filterNodeList = function (nodeList, booleanArray) {
  const filteredArray = [];
  nodeList.forEach((node, index) => {
    if (booleanArray[index]) {
      filteredArray.push(node);
    }
  });
  return filteredArray;
};
export const compareBooleanArrays = function (array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
};

export const getPermissions = function (roles = [], designation) {
  const role = roles.find(role => role.role === designation);
  if (role) {
    return role.droits;
  } else {
    return 'Role not found';
  }
};

export const includesDesignation = (objectsArray, searchString) => {
  return objectsArray.some(obj => obj.designation == searchString);
};

export const filterByArticle = (array, articleName) => {
  return array.filter(obj => obj.article === articleName);
};

export const removeElements = (originalArray, partialArray) => {
  // Create a set of unique identifiers from the partial array
  const partialSet = new Set(partialArray.map(obj => JSON.stringify(obj)));

  // Filter out elements from the original array that exist in the partial array
  return originalArray.filter(obj => !partialSet.has(JSON.stringify(obj)));
};
export const removeArrayByBooleans = (dataArray, booleanArray) => {
  const filteredArray = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (!booleanArray[i]) {
      filteredArray.push(dataArray[i]);
    }
  }
  return filteredArray;
};
export const getFormattedDate = (seperator = '-') => {
  const today = new Date();

  const year = today.getFullYear();

  // JavaScript months are zero-based, so we add 1 to get the correct month
  const month = (today.getMonth() + 1).toString().padStart(2, '0');

  const day = today.getDate().toString().padStart(2, '0');

  return `${year}${seperator}${month}${seperator}${day}`;
};
export const renderError = function (heading, content) {
  console.log('RENDING AN ERROR');
  const container = document.querySelector('.error-message-container');
  const hideWindow = () => {
    container.classList.add('hidden');
    document.querySelector('.overlayError').classList.add('hidden');
  };
  //reset the window
  document.querySelector('.heading-error-message').innerHTML = '';
  document.querySelector('.error-content').innerHTML = '';
  //show the window (somehow)
  container.classList.remove('hidden');
  document.querySelector('.overlayError').classList.remove('hidden');
  //adding content
  document.querySelector('.heading-error-message').innerHTML = heading;
  document.querySelector('.error-content').innerHTML = content;
  //add closing ELs
  container.querySelector('.close-btn').addEventListener('click', hideWindow);
  document.querySelector('.overlayError').addEventListener('click', hideWindow);
};

export const getStatusClass = function (status) {
  switch (status) {
    case 'servie': //#0084ff
      return 'served-status-bdci';
    case 'prete': //#45e011
      return 'finish-status-bdci';
    case 'visee par dg': //#ff6417
      return 'v-directeur-status';
    case 'visee par resp': //#ff9625
      return 'v-responsable-status';
    case 'demandee': //#fbff00
      return 'enattente-status';
    case 'refusee': // #e01313
      return 'canceled-status';
    default:
      return 'canceled-status';
  }
};

export const isObjectInArray = function (array, objectToCheck) {
  console.log(array);
  return array.some(item => {
    // Compare each element's properties with objectToCheck's properties
    return item.designation === objectToCheck.designation;
  });
};
export const objectIndexInArray = function (array, objectToCheck) {
  return array.findIndex(item => {
    // Compare each element's properties with objectToCheck's properties
    return item.designation === objectToCheck.designation;
  });
};
// Remove leading zeros
// export const validateInput = function (input) {
//   input.value = input.value.replace(/^0+/, '0');
//   // Ensure the value is at least 1
//   if (parseInt(input.value) < 1 || isNaN(parseInt(input.value))) {
//     input.value = '0'; // Set value to 1 if less than 1 or not a number
//   }
// };
export const validateInput = function (input, type = 'quantite') {
  switch (type) {
    case 'quantite':
      input.value = input.value.replace(/^0+/, '');
      // Ensure the value is at least 1
      if (parseInt(input.value) < 1 || isNaN(parseInt(input.value))) {
        input.value = ''; // Set value to 1 if less than 1 or not a number
      }
      break;
    // TODO: allow for ending . and at commit 45.=>45
    case 'prixUnitaire':
      // Remove non-numeric characters except dot
      input.value = input.value.replace(/[^\d.]/g, '');

      // Remove leading dot
      input.value = input.value.replace(/^\./, '');

      // Remove extra dots
      input.value = input.value.replace(/(\..*)\./g, '$1');

      // Remove decimals beyond two digits
      input.value = input.value.replace(/(\.\d\d)\d+/g, '$1');

      // Ensure the value is not empty
      if (input.value === '') {
        input.value = ''; // Default to 0 if empty
      }

      // Ensure the value is valid
      if (isNaN(parseFloat(input.value))) {
        input.value = ''; // Default to 0 if not a valid number
      }
      break;
  }
};
// export const validateInput2 = function (input) {
//   input.value = input.value.replace(/^0+/, '0');
//   // Ensure the value is at least 1
//   if (parseInt(input.value) < 1 || isNaN(parseInt(input.value))) {
//     input.value = '0'; // Set value to 1 if less than 1 or not a number
//   }
// };
export const validateInputPrice = function (input) {
  // Remove non-numeric characters except dot
  input.value = input.value.replace(/[^\d.]/g, '');

  // Remove leading dot
  input.value = input.value.replace(/^\./, '');

  // Remove extra dots
  input.value = input.value.replace(/(\..*)\./g, '$1');

  // Remove decimals beyond two digits
  input.value = input.value.replace(/(\.\d\d)\d+/g, '$1');

  // Ensure the value is not empty
  if (input.value === '') {
    input.value = '0'; // Default to 0 if empty
  }

  // Ensure the value is valid
  if (isNaN(parseFloat(input.value))) {
    input.value = '0'; // Default to 0 if not a valid number
  }
};

// inputValidation.js

export const validateIntegerInput = function (input, maxValue = 0) {
  input?.addEventListener('input', event => {
    let value = event.target.value;

    // Remove leading zeros
    value = value.replace(/^0+/, '');

    // Replace non-numeric characters with empty string
    value = value.replace(/\D/g, '');

    // Convert to integer
    let intValue = parseInt(value);

    // Ensure value is within the range
    if (isNaN(intValue) || intValue < 0) {
      intValue = 0;
    } else if (intValue >= maxValue) {
      if (maxValue) intValue = maxValue; // If maxValue is inclusive, use maxValue instead of maxValue - 1
    }

    // Update input value
    event.target.value = intValue;
  });
};

export const subtractObjects = (mainArray, subArray, key) => {
  const subValues = new Set(subArray.map(obj => obj[key]));
  return mainArray.filter(obj => !subValues.has(obj[key]));
};
export function fillMissingProperties(array) {
  return array.map(item => ({
    designation: item.designation || '',
    seuil: item.seuil === null || item.seuil === undefined ? 0 : item.seuil,
    quantite_demande:
      item.quantite_demande === null || item.quantite_demande === undefined
        ? 0
        : item.quantite_demande,
    quantite_accorde:
      item.quantite_accorde === null || item.quantite_accorde === undefined
        ? 0
        : item.quantite_accorde,
    quantite_servie:
      item.quantite_servie === null || item.quantite_servie === undefined
        ? 0
        : item.quantite_servie,
    quantite:
      item.quantite === null || item.quantite === undefined ? 0 : item.quantite,
  }));
}
export const getVisibleHeight = function (element) {
  const elementRect = element.getBoundingClientRect();
  const parentRect = element.parentElement.getBoundingClientRect();

  const visibleTop = Math.max(elementRect.top, parentRect.top);
  const visibleBottom = Math.min(elementRect.bottom, parentRect.bottom);

  return visibleBottom - visibleTop;
};
export function findParentWithCustomMaxHeight(element) {
  let parent = element.parentElement;

  while (parent) {
    const maxHeight = window.getComputedStyle(parent).maxHeight;
    if (maxHeight && maxHeight !== 'none' && maxHeight !== 'auto') {
      // Check if the max-height is custom
      return parent;
    }
    parent = parent.parentElement;
  }

  // If no parent with custom max-height is found, return null
  return null;
}
export function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}

export function getVisibleHeight2(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  let parentEl = findParentWithCustomMaxHeight(element);
  const rect2 = parentEl?.getBoundingClientRect();
  // Calculate the visible top and bottom of the element relative to the viewport
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.max(rect.bottom, rect2?.bottom);

  // Calculate the visible height
  const visibleHeight = visibleBottom - visibleTop;
  return Math.min(visibleHeight, parentEl?.offsetHeight);
}
export function findClosestTrParent(checkboxElement) {
  // Traverse up the DOM tree until a <tr> parent element is found
  let currentElement = checkboxElement.parentElement;
  while (currentElement && currentElement.tagName !== 'TR') {
    currentElement = currentElement.parentElement;
  }
  return currentElement; // Returns the closest <tr> parent element or null if not found
}

export function customSortForCmdsInt(a, b) {
  // Define the order based on the 'etat' property
  //TODO: use custom orders for each role ? maybe the dg sees a diff order?
  const order = {
    demandee: 1,
    'visee par resp': 2,
    'visee par dg': 3,
    prete: 4,
    servie: 5,
    refusee: 6,
  };

  // Compare the 'etat' properties
  const etatComparison = order[a.etat] - order[b.etat];
  if (etatComparison !== 0) {
    return etatComparison;
  }

  // If 'etat' is the same, compare the 'date_demande'
  const dateComparison = new Date(b.date_demande) - new Date(a.date_demande);
  if (dateComparison !== 0) {
    return dateComparison;
  }

  // If 'date_demande' is the same, compare the 'num_demande'
  return b.num_demande - a.num_demande;
}

export function newCustomSortForCmdsInt(a, b) {
  // Check if 'etat' is "demandee"
  const aIsDemandee = a.etat === 'demandee';
  const bIsDemandee = b.etat === 'demandee';

  // Prioritize 'demandee' entries
  if (aIsDemandee && !bIsDemandee) return -1;
  if (!aIsDemandee && bIsDemandee) return 1;

  // Compare the 'date_demande' properties (latest first)
  const dateComparison = new Date(b.date_demande) - new Date(a.date_demande);
  if (dateComparison !== 0) return dateComparison;

  // If 'date_demande' is the same, compare the 'num_demande' (higher first)
  return b.num_demande - a.num_demande;
}
export function xor(a, b) {
  return a !== b;
}
export function generateMonthLabels() {
  const months = [];
  const currentDate = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    const monthName = date.toLocaleString('default', { month: 'long' });
    months.push(monthName);
  }
  return months;
}
export const createChartOld = (ctx, dataFromBack, dataName) => {
  //   {
  //     "labels": [
  //         "C1@esi-sba.dz",
  //         "Magasinier@esi-sba.dz",
  //         "o.aliabbou@esi-sba.dz",
  //         "saidsenhadji06@gmail.com"
  //     ],
  //     "dataSet": [
  //         15,
  //         4,
  //         2,
  //         2
  //     ]
  // }
  const labels = dataFromBack.labels;
  const data = {
    labels: labels,
    datasets: [
      {
        label: dataName,
        data: dataFromBack.dataSet,
        backgroundColor: ['#477ce2'],
        borderColor: ['#477ce2'],
        borderWidth: 1,
      },
    ],
  };
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
// helpers.js

export function createChart(ctx, response, dataName) {
  const data = response.dataSet;
  const shortLabels = response.id; // Assuming these are the shorter labels
  const fullLabels = response.labels; // Assuming these are the full labels

  new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data: {
      labels: shortLabels, // Use shorter labels for x-axis
      datasets: [
        {
          label: dataName,
          data: data,
          backgroundColor: ['#477ce2'],
          borderColor: ['#477ce2'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            title: function (tooltipItems) {
              const index = tooltipItems[0].dataIndex;
              return fullLabels[index]; // Use full labels for tooltips
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: function (value, index) {
              return 'ID:' + shortLabels[index]; // Ensure shorter labels are used on x-axis
            },
          },
        },
      },
      barThickness: 40, // Set the width of the bars
    },
  });
}

// export function createPieChart(ctx, response, dataName) {
//   // Convert the response object to arrays for labels and data
//   const labels = Object.keys(response[0]);
//   const data = Object.values(response[0]);
//   console.log(labels, data);

//   // Check if labels and data are populated correctly
//   console.log(labels); // Debug: Print labels to console
//   console.log(data); // Debug: Print data to console

//   new Chart(ctx, {
//     type: 'pie',
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: dataName,
//           data: data,
//           backgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//             '#FFCE56',
//             '#4BC0C0',
//             '#9966FF',
//             '#FF9F40',
//           ],
//           borderColor: '#fff',
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//           align: 'start', // Aligns the legend horizontally
//           labels: {
//             boxWidth: 10, // Width of the color box next to each label
//             padding: 20, // Padding between labels
//           },
//         },
//         tooltip: {
//           callbacks: {
//             label: function (tooltipItem) {
//               const label = tooltipItem.label || '';
//               const value = tooltipItem.raw;
//               return `${label}: ${value}`;
//             },
//           },
//         },
//       },
//     },
//   });
// }
export function createPieChart(ctx, response, dataName) {
  // Convert the response object to arrays for labels and data
  const labels = Object.keys(response[0]);
  const data = Object.values(response[0]);

  // Calculate the desired radius in pixels (assuming 1rem = 16px)
  const remToPx = rem =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const radiusInRem = 10; // For example, 10rem
  const radiusInPx = remToPx(radiusInRem);

  // Check if labels and data are populated correctly
  // console.log(labels); // Debug: Print labels to console
  // console.log(data); // Debug: Print data to console

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          label: dataName,
          data: data,
          backgroundColor: [
            '#f9c012', //demandee
            '#e01313', //refusee
            '#ff9625', //viseeResp
            '#ff6417', //viseeDg
            '#49bf20', //prete
            '#0084ff', //servie
          ],
          borderColor: '#fff',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start', // Aligns the legend horizontally
          labels: {
            boxWidth: 10, // Width of the color box next to each label
            padding: 20, // Padding between labels
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const label = tooltipItem.label || '';
              const value = tooltipItem.raw;
              return `${label}: ${value}`;
            },
          },
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      elements: {
        arc: {
          // Adjust the radius of the pie chart
          borderWidth: 1,
          radius: radiusInPx,
        },
      },
    },
  });
}
export function renderConfirmWindow(
  windowClass,
  confirmFunction,
  cancelFunction = () => {},
  errorText,
  confirmsArgument = ''
) {
  let window = document.querySelector(windowClass);
  window.querySelector('.supp-confirm-text').innerHTML = errorText;
  window.querySelector('.supp-confirm-annuler').addEventListener('click', e => {
    e.preventDefault();
    cancelFunction();
    window.classList.add('hidden');
  });
  window
    .querySelector('.supp-confirm-confirmer')
    .addEventListener('click', e => {
      e.preventDefault();
      confirmFunction(confirmsArgument);
      window.classList.add('hidden');
    });
  window.classList.remove('hidden');
}
export function removeAllEventListeners(element) {
  const newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
}
export function resetConfirmWindowBtnsEventListenners(windowClass) {
  let window = document.querySelector(windowClass);
  removeAllEventListeners(window.querySelector('.supp-confirm-confirmer'));
  removeAllEventListeners(window.querySelector('.supp-confirm-annuler'));
}
export function organizeProducts(designations, quantities, references) {
  const result = [];
  let refIndex = 0;
  designations.forEach((designation, i) => {
    const quantite = parseInt(quantities[i], 10);
    const product = {
      designation: designation,
      quantite: quantite,
      refs: [],
    };
    for (let j = 0; j < quantite; j++) {
      product.refs.push(references[refIndex]);
      refIndex++;
    }
    result.push(product);
  });

  return result;
}
export function extractChapitres(items) {
  const chapitres = items.map(item => item.chapitre);
  return [...new Set(chapitres)];
}
export function extractArticles(items) {
  const articles = items.map(item => item.article);
  return [...new Set(articles)];
}
export function isInputUnused(input) {
  if (input.type === 'file') {
    return input.files.length === 0;
  } else if (input.type === 'checkbox' || input.type === 'radio') {
    return !input.checked;
  } else if (
    input.type === 'text' ||
    input.type === 'number' ||
    input.type === 'textarea'
  ) {
    return input.value.trim() === '';
  }
  return false;
}
