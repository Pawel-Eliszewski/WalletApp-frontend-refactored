import { Notify } from "notiflix";

Notify.init({
  width: "260px",
  position: "center-top",
  distance: "10px",
  opacity: 1,
  borderRadius: "20px",
  rtl: false,
  timeout: 4000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: "rgba(0,0,0,0.5)",
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
  cssAnimationDuration: 400,
  cssAnimationStyle: "fade",
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  textColor: "#ffffff",
  success: {
    background: "#24cca7",
    notiflixIconColor: "#ffffff",
  },
  failure: {
    background: "#ff6596",
    notiflixIconColor: "#a90237",
  },
  info: {
    background: "#6e78e8",
    notiflixIconColor: "#c5c9ff",
  },
});

export default Notify;
