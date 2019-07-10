
console.log('reddit script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
});

function createAElement(links, default_classes, active_class) {
  const a = document.createElement('a');
  a.id = 'travis-unsave-link';
  a.innerText = 'Unsave';
  a.classList.add(...default_classes);
  a.onclick = () => {
    console.log('click...');
    for (let link of links) {
      link.classList.remove(active_class);
    }
    a.classList.add(active_class);
  };
  return a;
}

function getActiveLink(pathname) {
  const links = document.querySelectorAll(`a[href^='${pathname}']`);
  for (let link of links) {
    switch (link.innerText.trim()) {
      case 'OVERVIEW':
      case 'POSTS':
      case 'COMMENTS':
      case 'SAVED':
        if (link.classList.length === 2) {
          return {
            parent: link.parentElement,
            default_classes: [link.classList[0]],
            active_class: link.classList[1]
          };
        }
        break;

      case 'HIDDEN':
      case 'UPVOTED':
      case 'DOWNVOTED':
        if (link.classList.length === 3) {
          return {
          parent: link.parentElement,
          default_classes: [link.classList[0], link.classList[1]],
          active_class: link.classList[2]
          };
        }
        break;

      default:
        break;
    }
  }
}

function setupUnsaveLink() {
  console.log('checking...');

  const travis_link = $('#travis-unsave-link')[0];
  if (travis_link) {
    // updateTravisLink(travis_link, _class);
    return;
  }

  const result = /^\/(user)\/[a-z]+/.exec(window.location.pathname);
  if (!result) {
    console.log('Not on the right page');
    return;
  }
  console.log('on the right page');


  const {parent, default_classes, active_class} = getActiveLink(result[0]);
  const links = parent.querySelectorAll('a');
  const a = createAElement(links, default_classes, active_class);
  parent.appendChild(a);
}


window.onload = function() {
  console.log('onload');

  setupUnsaveLink();
  setInterval(setupUnsaveLink, 500);
};

window.addEventListener('unload', function() {
  console.log('unload');
});

window.onbeforeunload = function() {
  console.log('onbeforeunload');
};

// const div = document.createElement('div');
// div.style.position = 'fixed';
// div.style.display = 'block';
// div.style.zIndex = 100;
// div.style.top = '60px';
// div.style.left = '20px';
// div.style.width = '8%';


// const scrape_button = document.createElement('button');

// scrape_button.innerText = 'Scrape';
// scrape_button.style.color = '#003366';
// scrape_button.style.backgroundColor = '#dc0000';

// // async function scrape() {

// // }

// // scrape_button.onclick = async () => {
// //   const person_obj = await scrape();
// //   console.log(person_obj);

// //   const response = await chrome.runtime.sendMessage({type: SCRAPE, person_obj});
// //   console.log(response);
// // };


// div.appendChild(scrape_button);


// const text_box = document.createElement('input');

// text_box.style.color = '#003366';
// text_box.style.backgroundColor = '#dc0000';

// text_box.type = 'text';
// text_box.placeholder = 'API Key';

// div.appendChild(text_box);


// document.body.appendChild(div);
