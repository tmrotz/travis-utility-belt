import { createContextMenus, handleContextMenus } from './context-menus.js';
import handleOnCreated from './downloads.js';
import onMessageHandler from './content-script.js';
import { saveState, loadState } from '../../common/storage-manager.js';
require('chrome-extension-async');

createContextMenus();
chrome.contextMenus.onClicked.addListener(handleContextMenus);

chrome.downloads.onCreated.addListener(handleOnCreated);

chrome.runtime.onMessage.addListener(onMessageHandler);

chrome.runtime.onInstalled.addListener(() => {
  console.log('extension installed');
  loadState();
});

chrome.runtime.onSuspend.addListener(() => {
  console.log('suspending');
  saveState();
});
