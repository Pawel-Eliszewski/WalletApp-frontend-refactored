export const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      damping: 15,
      stiffness: 150,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const handleBlurVisible = () => {
  const backdrop = document.querySelector(".backdrop-blur");
  backdrop.classList.add("backdrop-blur--visible");
};

export const handleBlurNotVisible = () => {
  const backdrop = document.querySelector(".backdrop-blur");
  backdrop.classList.remove("backdrop-blur--visible");
};
