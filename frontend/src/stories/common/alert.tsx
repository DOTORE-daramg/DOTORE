import { toast } from "react-toastify";

export const errorAlert = (msg: string) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
  });
};

export const successAlert = (msg: string) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
  });
};

export const warnAlert = (msg: string) => {
  toast.warn(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
  });
};
