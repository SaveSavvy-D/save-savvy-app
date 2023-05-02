import { toast } from "react-toastify";
import ToastColors from "../constants/toastColors";

export const showNotification = (
  message,
  type = ToastColors.info,
  id = undefined
) => {
  toast(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type,
    toastId: id,
    progress: undefined,
    theme: "colored",
  });
};
