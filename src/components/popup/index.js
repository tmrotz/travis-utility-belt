import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { notifySuccess } from '../../common/notifications.js';

window.onload = function() {
  console.log('onload');


  chrome.storage.local.get(['paste-text'], result => {
    if (result['paste-text']) {
      document.getElementById('paste-text-input').placeholder = result['paste-text'];
    }
  });

  document.getElementById('paste-text-button').onclick = () => {
    const paste_text = document.getElementById('paste-text-input').value;

    chrome.storage.local.set({ 'paste-text': paste_text }, () => {
      document.getElementById('paste-text-input').value = '';
      document.getElementById('paste-text-input').placeholder = paste_text;
      notifySuccess('Paste text successfully updated!');
    });
  }
};

window.addEventListener('unload', function() {
  console.log('unload');
});
