import React from "react";
import styles from "./DonateCallout.module.css";
import { useTranslation } from "react-i18next";

const DonateCallout = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.calloutSection}>
      <div className={styles.container}>
        <h2 className={styles.text}>
          {t("home.donateCallout", "Support Our Mission")}
        </h2>
        <div className={styles.accentLine} />
      </div>
    </section>
  );
};

export default DonateCallout;