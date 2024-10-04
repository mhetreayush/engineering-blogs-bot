function keepAliveMiddleware() {
  // This middleware starts an interval which does nothing, just to keep the server alive
  const interval = setInterval(() => {
    console.log('Keeping server alive...');
  }, 10000); // Logs message every 10 seconds, adjust this interval as needed

  return (req, res, next) => {
    // Add cleanup if needed when the process is terminated
    res.on('finish', () => {
      clearInterval(interval); // Clear the interval on response completion if desired
    });

    next(); // Proceed to the next middleware or route handler
  };
}

module.exports = keepAliveMiddleware;
