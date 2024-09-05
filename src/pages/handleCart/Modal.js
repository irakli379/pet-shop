import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ onClose, children }) {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.ribbon}></div>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          {children}
          <button className={styles.buyButton} onClick={onClose}>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
