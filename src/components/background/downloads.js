
/**
 * @param [DownloadItem]{@link https://developers.chrome.com/extensions/downloads#type-DownloadItem}
 *   dl_item - A DownloadItem object
 */
export default async function downloads(dl_item) {
  chrome.downloads.pause(dl_item.id);

  const query = {
    url: dl_item.url,
    finalUrl: dl_item.finalUrl,
    totalBytes: dl_item.totalBytes,
    fileSize: dl_item.fileSize,
    exists: true
  }

  let found_dl_items = {};
  try {
    found_dl_items = await chrome.downloads.search(query);
  } catch (error) {
    console.log('get download items: failure');
    console.log(error);
    return;
  }

  for (let found_dl_item of found_dl_items) {
    if (dl_item.id === found_dl_item.id) {
      continue;
    }

    if (dl_item.state !== 'interrupted') {
      chrome.downloads.cancel(dl_item.id);
      console.log('cancel download: success');
      return;
    }
  }

  chrome.downloads.resume(dl_item.id);
}
