import { useState } from "react";
import _ from "lodash";
import notificationConstants from "../constants/notificationConstants";

// eslint-disable-next-line import/prefer-default-export
export const createFilterChangeHandler = (onChange) => (
  name,
  path = "target.value"
) => (e) => {
  const newValue = _.get(e, path, e);

  onChange({
    [name]: newValue,
  });
};

export const apiErrorHandler = (errorRes, setFailureNotificationMessage) => {
  if (errorRes.message === "Network Error") {
    setFailureNotificationMessage(errorRes.message);
  } else {
    console.log("errorReserrorRes", errorRes.response);
    if (_.get(errorRes, "response.data.error")) {
      setFailureNotificationMessage(_.get(errorRes, "response.data.error"));
    } else {
      setFailureNotificationMessage(
        _.get(errorRes, "response.statusText", "Unknown Error")
      );
    }
  }
};

export const useLoader = () => {
  const [loaderOpen, setLoaderOpen] = useState(false);

  return {
    loaderOpen,
    setLoaderOpen,
  };
};

export const useNotification = () => {
  const [notificationToast, setNotificationToast] = useState(false);
  const [successNotificationMessage, setSuccessNotificationMessage] = useState(
    false
  );
  const [failureNotificationMessage, setFailureNotificationMessage] = useState(
    false
  );

  return {
    notificationToast,
    setNotificationToast,
    successNotificationMessage,
    setSuccessNotificationMessage,
    failureNotificationMessage,
    setFailureNotificationMessage,
  };
};