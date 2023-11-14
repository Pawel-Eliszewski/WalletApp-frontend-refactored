import { Notify, Report } from "notiflix";

export const configureNotiflixStyles = (colorScheme) => {
  let notifySuccessBackground = "#24cca7";
  let notifySuccessIconColor = "#ffffff";
  let notifyFailureBackground = "#ff6596";
  let notifyFailureIconColor = "#a90237";
  let notifyInfoBackground = "#6e78e8";
  let notifyInfoIconColor = "#c5c9ff";

  if (colorScheme === "dark") {
    notifySuccessBackground = "#1f7e56";
    notifySuccessIconColor = "#bdbdbd";
    notifyFailureBackground = "#8c0030";
    notifyFailureIconColor = "#ff6596";
    notifyInfoBackground = "#404b9d";
    notifyInfoIconColor = "#c5c9ff";
  }

  Notify.init({
    width: "260px",
    position: "center-top",
    distance: "10px",
    opacity: 1,
    borderRadius: "20px",
    rtl: false,
    timeout: 3500,
    messageMaxLength: 110,
    plainText: true,
    showOnlyTheLastOne: true,
    clickToClose: false,
    pauseOnHover: true,
    ID: "NotiflixNotify",
    className: "notiflix-notify",
    zindex: 4001,
    fontFamily: "Quicksand",
    fontSize: "16px",
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: "fade",
    closeButton: false,
    useIcon: true,
    useFontAwesome: false,
    textColor: "#ffffff",
    success: {
      background: notifySuccessBackground,
      notiflixIconColor: notifySuccessIconColor,
    },
    failure: {
      background: notifyFailureBackground,
      notiflixIconColor: notifyFailureIconColor,
    },
    info: {
      background: notifyInfoBackground,
      notiflixIconColor: notifyInfoIconColor,
    },
  });

  Report.init({
    className: "notiflix-report",
    width: "320px",
    backgroundColor: "#f8f8f8",
    borderRadius: "25px",
    rtl: false,
    zindex: 4002,
    backOverlay: true,
    backOverlayColor: "rgba(0,0,0,0.5)",
    backOverlayClickToClose: true,
    fontFamily: "Quicksand",
    svgSize: "110px",
    plainText: true,
    titleFontSize: "16px",
    titleMaxLength: 34,
    messageFontSize: "13px",
    messageMaxLength: 400,
    buttonFontSize: "14px",
    buttonMaxLength: 34,
    cssAnimation: true,
    cssAnimationDuration: 360,
    cssAnimationStyle: "fade",
    failure: {
      svgColor: "#ff6596",
      titleColor: "#1e1e1e",
      messageColor: "#242424",
      buttonBackground: "#ff6596",
      buttonColor: "#fff",
      backOverlayColor: `${colorScheme === "dark" ? "#00000090" : "#00000050"}`,
    },
  });
};

export { Notify, Report };
