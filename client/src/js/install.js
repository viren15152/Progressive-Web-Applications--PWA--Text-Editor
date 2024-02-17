const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the browser's default prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  butInstall.hidden = false;
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.hidden = true;
  // Show the browser's install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Log the outcome of the prompt
  console.log('User choice:', outcome);
  // Clear the deferredPrompt variable
  deferredPrompt = null;
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // The PWA was installed
  console.log('PWA was installed');
});


