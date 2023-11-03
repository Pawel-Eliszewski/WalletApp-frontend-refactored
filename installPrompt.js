const isInstallPromptShown = localStorage.getItem("isInstallPromptShown");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  if (!isInstallPromptShown) {
    showInstallPrompt(event);
    localStorage.setItem("isInstallPromptShown", "true");
  }
});

function showInstallPrompt() {
  alert("Install this application on your device");
}
