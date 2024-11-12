const input = document.getElementById("text-input");

input.oninput = () => {
  input.value.length > 0 ? generateQRCode() : clearCanvas();
};

const generateQRCode = () => {
  const foreground = getRandomDarkColor();
  const text = input.value;
  const canvas = document.getElementById("qr-code");

  // Generate the QR code with higher internal resolution
  const qr = new QRious({
    element: canvas,
    value: text,
    size: 3000,          // Higher resolution for better quality
    foreground: foreground,
    background: '#fff',
  });

  // Set canvas display size (will scale down the higher resolution)
  canvas.style.width = '350px';
  canvas.style.height = '350px';

  // Enable the download button
  const downloadLink = document.getElementById("download-link");
  const downloadButton = document.getElementById("download-btn");
  downloadButton.style.display = "inline-flex"; // Show the download button

  // Convert canvas to a data URL and set it as the download link
  downloadLink.href = canvas.toDataURL("image/png");
};

const clearCanvas = () => {
  const canvas = document.getElementById("qr-code");
  const context = canvas.getContext("2d");

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Hide the download button
  const downloadButton = document.getElementById("download-btn");
  downloadButton.style.display = "none";
};

const getRandomDarkColor = () => {
  // Random RGB values between 0 and 150 for dark colors
  const r = Math.floor(Math.random() * 150);
  const g = Math.floor(Math.random() * 150);
  const b = Math.floor(Math.random() * 150);
  return `rgb(${r}, ${g}, ${b})`;
};