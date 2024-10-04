const MINUTE = 1000 * 60;

export const keepServerAlive = () => {
  // This middleware starts an interval which does nothing, just to keep the server alive
  setInterval(() => {
    console.log('Keeping server alive...');
  }, MINUTE * 10); // Logs message every 10 seconds, adjust this interval as needed
};
