import Icon128 from '../../assets/icon128.png';
import SuccessImg from '../../assets/success.png';
import ErrorImg from '../../assets/error.png';
const down_dict = {};


/**
 * @param [DownloadItem]{@link https://developers.chrome.com/extensions/downloads#type-DownloadItem}
 *   dl_item - A DownloadItem object
 * @param [function]{@link https://developer.chrome.com/extensions/downloads#event-onDeterminingFilename}
 *   suggest - A function?
 */
// export default async function handleDeterminingFilename(dl_item, suggest) {
export default async function handleOnCreated(dl_item) {
  console.log(dl_item);
  await chrome.downloads.pause(dl_item.id);
  console.log('pause download: success');

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
      console.log('found myself');
      continue;
    }

    if (found_dl_item.state === 'in_progress') {
      await chrome.downloads.cancel(dl_item.id);
      console.log('cancel download: success');
      return;

    } else if (found_dl_item.state === 'complete') {
      console.log(found_dl_item);
      chrome.notifications.create({
        type: 'basic',
        iconUrl: Icon128,
        title: 'File already exists',
        message: 'It seems like the file ' + dl_item.filename + ' already exists',
        contextMessage: 'Click to show the file',
        buttons: [
          {title: 'Download Anyway', iconUrl: SuccessImg},
          {title: 'Cancel Download', iconUrl: ErrorImg}
        ]
      }, function (notification_id) {
        down_dict[notification_id] = dl_item.id;
        console.log(`Notification id: ${notification_id}`);
      });
      return;
    }
  }

  await chrome.downloads.resume(dl_item.id);
  console.log('resume download: success');
}

chrome.notifications.onButtonClicked.addListener(async (noti_id, button_index) => {

  console.log(down_dict);
  console.log(noti_id);
  console.log('button clicked');
  const id = down_dict[noti_id];
  if (!id) {
    console.log('dl-item not there?');
    return;
  }
  delete down_dict[noti_id];

  if (button_index === 0) {
    console.log('Resume Download');
    await chrome.downloads.resume(id);
    console.log('resume download: success');

  } else if (button_index === 1) {
    console.log('Cancel download');
    await chrome.downloads.cancel(id);
    console.log('cancel download: success');
  }

  chrome.notifications.clear(noti_id);
});

chrome.notifications.onClicked.addListener(function (noti_id) {
  console.log('Notification clicked. Cancel download by default');
  const id = down_dict[noti_id];
  if (!id) {
    console.log('dl-item not there?');
    return;
  }
  delete down_dict[noti_id];

  chrome.notifications.clear(noti_id);
  chrome.downloads.cancel(id);
});
