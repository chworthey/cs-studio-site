export function SendMessage(body: string, subject: string | undefined, _important: boolean, onComplete: (success: boolean) => void) {
  const endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
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
