import { toast } from "react-toastify";

const toasts = (
    message,
    type = "error",
    position = "top-right",
    onClose = 2000,
    theme = "light"
) => {
    toast(message, {
        position: position,
        autoClose: onClose,
        type: type,
        theme: theme,
    });
};
export default toasts;
