
export default async function onMessageHandler(data_obj, tab, reply) {
  console.log('Message Received');
  console.log(data_obj);
  console.log(tab);

  switch(data_obj.type) {
    case 'reddit-karma':
      await chrome.browserAction.setBadgeText({ text: '123' });
      console.log('display reddit karma: success')
      reply({success: true});
      break;

    default:
      console.log('match type: failure', data_obj);
      reply({success: false});
  }
}
