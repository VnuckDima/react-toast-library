import React, { useState, useEffect } from "react";

import { ToastWrapper } from "../../styled-components/styleGlobal";
import ErrorBoundary from "../../layout/ErrorBoundary/ErrorBoundary";
import { IPropsType } from "../../interfaces/ToastInterface";

export const Toast = ({
  toastList,
  position,
  autoDelete,
  autoDeleteTime,
  animation,
}: IPropsType) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0]);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((i) => i.id === id);
    const toastListItem = toastList.findIndex((i) => i.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  const renderToast = list.map((toast) => (
    <div
      key={toast.id + 1}
      className={`notification toast ${position}`}
      style={{
        backgroundColor: toast.backgroundColor,
        padding: toast.toastPadding,
      }}
    >
      <button
        onClick={() => deleteToast(toast.id)}
        style={{
          color: toast.titleColor,
        }}
      >
        <span className="close">X</span>
      </button>
      <div className="notification-image">
        <img src={toast.icon} />
      </div>
      <div>
        <p
          className="notification-title"
          style={{
            color: toast.titleColor,
          }}
        >
          {toast.title}
        </p>
        <p
          className="notification-message"
          style={{
            color: toast.descColor,
          }}
        >
          {toast.description}
        </p>
      </div>
    </div>
  ));
  return (
    <ErrorBoundary>
      <ToastWrapper animation={animation}>
        <div className={`notification-container ${position}`}>
          {renderToast}
        </div>
      </ToastWrapper>
    </ErrorBoundary>
  );
};
