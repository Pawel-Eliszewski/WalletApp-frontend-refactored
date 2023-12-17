// const isInstallPromptShown = localStorage.getItem("isInstallPromptShown");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  // if (!isInstallPromptShown) {
  //   localStorage.setItem("isInstallPromptShown", "true");
  // }
  showInstallPrompt(event);
});

function showInstallPrompt(event) {
  const userLanguage = (navigator.language || navigator.userLanguage)
    .split("-")[0]
    .toLowerCase();

  console.log(userLanguage);

  const translations = {
    en: "You can install this application on your device. It is recommended for the best user experience.",
    pl: "Możesz zainstalować tę aplikację na swoim urządzeniu. Jest to najlepszy sposób korzystania z tej aplikacji.",
  };

  const translatedMessage = translations[userLanguage] || translations["en"];

  alert(translatedMessage);

  const installButton = document.createElement("button");
  installButton.innerText = "Install App";
  installButton.addEventListener("click", () => {
    event.prompt();
    event.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        hideInstallButton();
      } else {
        return;
      }
    });
  });

  document.body.appendChild(installButton);
}

function hideInstallButton() {
  const installButton = document.querySelector("button");
  if (installButton) {
    installButton.style.display = "none";
  }
}
