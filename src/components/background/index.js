import { createContextMenus, handleContextMenus } from './context-menus.js';
import handleOnCreated from './downloads.js';
import onMessageHandler from './content-script.js';
require('chrome-extension-async');

createContextMenus();
chrome.contextMenus.onClicked.addListener(handleContextMenus);

chrome.downloads.onCreated.addListener(handleOnCreated);

chrome.runtime.onMessage.addListener(onMessageHandler);

chrome.runtime.onInstalled.addListener(() => {
  console.log('extension installed');
});
