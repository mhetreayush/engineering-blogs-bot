const { exec } = require('child_process');
const axios = require('axios');

const PORT = 3000; // Local port contributors will expose
const REGISTER_URL = 'https://revisit-whatsapp-webhook-tunnel.onrender.com/register-url'; // Replace with your actual endpoint to register the URL

// Function to start ngrok and fetch the public URL
const startNgrok = () => {
  return new Promise((resolve, reject) => {
    exec(`ngrok http ${PORT}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error starting ngrok: ${stderr}`);
        return;
      }

      const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex to match the ngrok URL
      const urlMatch = stdout.match(urlRegex);
      if (urlMatch) {
        resolve(urlMatch[0]); // Return the first matched URL
      } else {
        reject('Could not find ngrok URL');
      }
    });
  });
};

// Function to send the ngrok URL to your server
const registerUrl = async (url) => {
  try {
    await axios.post(REGISTER_URL, { url });
    console.log(`Successfully registered URL: ${url}`);
  } catch (error) {
    console.error('Error registering URL:', error);
  }
};

// Main function to execute the script
const main = async () => {
  try {
    const ngrokUrl = await startNgrok();
    await registerUrl(ngrokUrl);
  } catch (error) {
    console.error(error);
  }
};

main();
