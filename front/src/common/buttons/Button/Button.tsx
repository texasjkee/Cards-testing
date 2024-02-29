import { FC, HTMLProps } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, isLoading = false }) => {
  return (
    <button className={styles.button}>
      {/* TODO: best practice */}
      {!isLoading && children}
      {isLoading && <div className={styles["dot-flashing"]} />}
    </button>
  );
};
