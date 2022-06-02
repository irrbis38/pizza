import React from "react";
import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <>
      <div className={styles.notFound}>
        <span>&#129300;</span>
        <h2>Страница не найдена</h2>
        <p>
          К сожалению, данная страница отсутствует в нашем интернет-магазине.
        </p>
      </div>
    </>
  );
}

export default NotFound;
