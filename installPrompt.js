window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  showInstallPrompt(event);
});

function showInstallPrompt() {
  alert("Install this application on your device");
}
