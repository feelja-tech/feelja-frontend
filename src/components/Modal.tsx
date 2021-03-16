import React, { PropsWithChildren, ReactElement, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ModalProps {}

export function Modal(props: PropsWithChildren<ModalProps>): ReactElement {
  const { children } = props;

  const dispatch = useDispatch();

  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        backgroundColor: "rgba(1,1,1,0.7)",
        display: "flex",
        zIndex: 2,
      }}
      onTap={() => {
        // dispatch(setModalState({ show: false }));
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={{
          width: "80%",
          height: "50%",
          borderRadius: 15,
          backgroundColor: "#fff",
          margin: "auto",
          zIndex: 3,
        }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
