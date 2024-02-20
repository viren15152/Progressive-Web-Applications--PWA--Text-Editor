// Select the button element with the ID "buttonInstall"
const butInstall = document.getElementById("buttonInstall");

// Event listener for the "beforeinstallprompt" event, which is triggered when the app is eligible to be installed
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the event for later use
  window.deferredPrompt = event;
  // Make the install button visible
  butInstall.classList.toggle("hidden", false);
});

// Event listener for when the install button is clicked
butInstall.addEventListener("click", async () => {
  // Retrieve the deferred prompt event
  const promptEvent = window.deferredPrompt;
  // If there's no prompt event, exit the function
  if (!promptEvent) {
    return;
  }
  // Show the installation prompt
  promptEvent.prompt();
  // Clear the deferred prompt once the prompt is shown
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.classList.toggle("hidden", true);
});

// Event listener for the "appinstalled" event, triggered when the app is successfully installed
window.addEventListener("appinstalled", (event) => {
  // Clear the deferred prompt once the app is installed
  window.deferredPrompt = null;
  // Log a message indicating successful installation
  console.log("👍", "appinstalled", event);
});


