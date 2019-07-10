
export function createContextMenus() {
  chrome.contextMenus.create({
    'id': 'editable-paste-text',
    'title': 'Paste Text',
    'contexts': ['editable']
  });
  chrome.contextMenus.create({
    'id': 'select-search-wikipedia',
    'title': 'Wikipedia Search',
    'contexts': ['selection']
  });
}

/**
 * @param [info]{@link https://developers.chrome.com/extensions/contextMenus#event-onClicked}
 *   info - An object
 *
 * @param [Tab]{@link https://developers.chrome.com/extensions/tabs#type-Tab}
 *   tab - A tab object
 */
export async function handleContextMenus(info, tab) {
  if (tab.url.startsWith('chrome://')) {
    notifyNotice('Paste text doesn\'t work on chrome://', {seconds: 5});
    return;
  }

  switch (info.menuItemId) {

    case 'editable-paste-text':
      if (info.editable) {
        const result = await chrome.storage.local.get(['paste-text']);
        const paste_text = result['paste-text'];
        console.log(paste_text);
        if (!paste_text) {
          notifyNotice('Click on the chrome extension and change the text to paste');
          return;
        }

        const results = await chrome.tabs.executeAsyncFunction(
          tab.id,
          async (paste_text) => {
            console.log(paste_text);
            // Assume: elem is an input or textarea element.
            const elem = document.activeElement;

            const start = elem.selectionStart;
            const end = elem.selectionEnd;
            elem.value = elem.value.slice(0, start) + paste_text + elem.value.substr(end);

            // Set cursor after selected text
            elem.selectionStart = start + paste_text.length;
            elem.selectionEnd = elem.selectionStart;
            return paste_text;
          },
          paste_text);

        console.log(results);
      }
      break;


    case 'select-search-wikipedia':
      const create_props = {
        url: `https://en.wikipedia.org/wiki/Special:Search/${info.selectionText}`,
        active: true
      };
      await chrome.tabs.create(create_props);
      console.log('select wikipedia search: success');
      break;


    default:
      console.log('bad voodoo');
  }
}
