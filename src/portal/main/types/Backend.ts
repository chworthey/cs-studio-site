const endpoint = 'https://wortheystudiosapi.azurewebsites.net';

export function SendMessage(body: string, subject: string | undefined, important: boolean, onComplete: (success: boolean) => void) {
  const url = subject ? `${endpoint}/api/message?subject=${subject}` : `${endpoint}/message`; 
  fetch(url, {
    method: 'POST',
    body: body
  })
  .then(response => {
    const success = response.status === 202;
    onComplete(success);
  })
  .catch(() => {
    onComplete(false);
  });
};
