const isInstallPromptShown = localStorage.getItem("isInstallPromptShown");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  if (!isInstallPromptShown) {
    showInstallPrompt();
  }
});

function showInstallPrompt() {
  const userLanguage = (navigator.language || navigator.userLanguage)
    .split("-")[0]
    .toLowerCase();

  const translations = {
    en: "You can install this application on your device. It is recommended for the best user experience.",
    pl: "Możesz zainstalować tę aplikację na swoim urządzeniu. Jest to najlepszy sposób korzystania z tej aplikacji.",
  };

  const translatedMessage = translations[userLanguage] || translations["en"];

  alert(translatedMessage);

  localStorage.setItem("isInstallPromptShown", "true");
}
