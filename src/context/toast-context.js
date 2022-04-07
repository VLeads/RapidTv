import { createContext, useContext, useReducer, useState } from "react";
import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_SUCCESS,
  ACTION_TYPE_WARNING,
} from "utils";

const ToastContext = createContext({
  showToast: false,
  toastMsg: "",
  toastClass: "",
});

const ToastProvider = ({ children }) => {
  const [notShowPlaylistNames, setNotShowPlaylistNames] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState({
    videoData: null,
    modalState: false,
  });

  const [toastState, toastDispatch] = useReducer(
    function toastReducer(toastState, toastDispatch) {
      switch (toastDispatch.type) {
        case ACTION_TYPE_SUCCESS:
          return {
            toastClass: "success",
            toastMsg: toastDispatch.payload,
          };
        case ACTION_TYPE_ERROR:
          return {
            toastClass: "error",
            toastMsg: toastDispatch.payload,
          };
        case ACTION_TYPE_WARNING:
          return {
            toastClass: "warning",
            toastMsg: toastDispatch.payload,
          };
        default:
          return toastState;
      }
    },
    { toastMsg: "", toastClass: "" }
  );

  const [showToast, setShowToast] = useState(false);

  return (
    <ToastContext.Provider
      value={{
        toastState,
        toastDispatch,
        showToast,
        setShowToast,
        isModalOpen,
        setIsModalOpen,
        notShowPlaylistNames,
        setNotShowPlaylistNames,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
