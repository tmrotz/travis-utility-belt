let state = {};


// string, array of string, object
export function getLocal(target) {
  if (typeof target === 'string') {
    return state[target];
  } else {
    console.log(`target should be a string: ${typeof target}`);
    return false;
  }
}

// object
export function setLocal(source) {
  if (typeof source === 'object') {
    Object.assign(state, source);
    return true;
  } else {
    console.log(`source should be object: ${typeof source}`);
    return false;
  }
}

export async function saveState() {
  try {
    await chrome.storage.local.set(state);
  } catch (error) {
    console.log('save state: failed');
    console.log(error);
    return false;
  }
}

export async function loadState() {
  try {
    state = await chrome.storage.local.get({});
    return Object.assign({}, state);
  } catch (error) {
    console.log('load state: failed');
    console.log(error);
    return false;
  }
}

