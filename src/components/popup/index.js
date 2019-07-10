import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { notifySuccess } from '../../common/notifications.js';

chrome.storage.local.get(['paste-text'], result => {
  if (result['paste-text']) {
    $('#paste-text-input').placeholder = result['paste-text'];
  }
});

$('#paste-text-button').click(event => {
  const paste_text = $('#paste-text-input').value;

  chrome.storage.local.set({ 'paste-text': paste_text }, () => {
    $('#paste-text-input').placeholder = paste_text;
    notifySuccess('Paste text successfully updated!', {seconds: 5});
  });
});
