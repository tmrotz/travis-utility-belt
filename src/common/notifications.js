import SuccessImg from '../assets/success.png';
import NoticeImg from '../assets/notice.png';
import ErrorImg from '../assets/error.png';

export function notifyNotice(body) {
  notify('NOTICE', NoticeImg, body);
}

export function notifySuccess(body) {
  notify('SUCCESS', SuccessImg, body);
}

export function notifyError(body) {
  notify('ERROR', ErrorImg, body);
}

function notify(title, icon, body) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: icon,
    title: title,
    message: body,
  });
}

function getDuration(time) {
  let duration = 0;
  if (time.seconds) {
    duration += time.seconds * 1000;
  }
  if (time.minutes) {
    duration += time.minutes * 60 * 1000;
  }
  if (time.hours) {
    duration += time.hours * 60 * 60 * 1000;
  }
  if (time.days) {
    duration += time.days * 24 * 60 * 60 * 1000;
  }
  return duration;
}
