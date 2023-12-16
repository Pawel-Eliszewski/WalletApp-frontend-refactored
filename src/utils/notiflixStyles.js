import { Notify, Report } from "notiflix";

export const configureNotiflixStyles = (colorScheme) => {
  let notifyTextColor = "#ffffff";
  let notifySuccessBackground = "#24cca7";
  let notifySuccessIconColor = "#ffffff";
  let notifyFailureBackground = "#ff6596";
  let notifyFailureIconColor = "#a90237";
  let notifyInfoBackground = "#6e78e8";
  let notifyInfoIconColor = "#c5c9ff";
  let reportFailureBackground = "#f8f8f8";
  let reportFailureSvgColor = "#ff6596";
  let reportFailureButtonColor = "#ffffff";
  let reportFontColor = "#1e1e1e";

  if (colorScheme === "dark") {
    notifyTextColor = "#e0e0e0";
    notifySuccessBackground = "#127962";
    notifySuccessIconColor = "#bdbdbd";
    notifyFailureBackground = "#8c0030";
    notifyFailureIconColor = "#ff6596";
    notifyInfoBackground = "#404b9d";
    notifyInfoIconColor = "#c5c9ff";
    reportFailureBackground = "#202020";
    reportFailureSvgColor = "#85324d";
    reportFailureButtonColor = "#bdbdbd";
    reportFontColor = "#bdbdbd";
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
    plainText: false,
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
    success: {
      textColor: notifyTextColor,
      background: notifySuccessBackground,
      notiflixIconColor: notifySuccessIconColor,
    },
    failure: {
      textColor: notifyTextColor,
      background: notifyFailureBackground,
      notiflixIconColor: notifyFailureIconColor,
    },
    info: {
      textColor: notifyTextColor,
      background: notifyInfoBackground,
      notiflixIconColor: notifyInfoIconColor,
    },
  });

  Report.init({
    className: "notiflix-report",
    width: "320px",
    borderRadius: "25px",
    rtl: false,
    zindex: 4002,
    backgroundColor: reportFailureBackground,
    backOverlay: true,
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
      svgColor: reportFailureSvgColor,
      titleColor: reportFontColor,
      messageColor: reportFontColor,
      buttonBackground: reportFailureSvgColor,
      buttonColor: reportFailureButtonColor,
      backOverlayColor: "#000000b0",
    },
  });
};

export { Notify, Report };
