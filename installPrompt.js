window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  showInstallPrompt(event);
});

function showInstallPrompt() {
  alert("Zainstaluj tę aplikację na pulpicie!");
}
