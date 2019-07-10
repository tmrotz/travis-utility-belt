import SuccessImg from '../assets/success.png';
import NoticeImg from '../assets/notice.png';
import ErrorImg from '../assets/error.png';

export function notifyNotice(body, time) {
  notify('NOTICE', NoticeImg, body, time);
}

export function notifySuccess(body, time) {
  notify('SUCCESS', SuccessImg, body, time);
}

export function notifyError(body, time) {
  notify('ERROR', ErrorImg, body, time);
}

function notify(title, icon, body, time) {
  const milliseconds = getDuration(time);
  const n = new Notification(title, { icon: icon, body: body });
  setTimeout(n.close.bind(n), milliseconds);
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
