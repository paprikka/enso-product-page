import React, { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { ButtonLink } from "../button-link";
import { Download } from "../download";
import { HGroup } from "../h-group";
import { Tracking } from "../tracking";
import styles from "./index.module.scss";

export const Hero = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModalClick = () => {
    setIsModalVisible(true);
    Tracking.track("Download Modal: show");
  };

  const handleHideModalClick = () => {
    setIsModalVisible(false);
    Tracking.track("Download Modal: hide");
  };

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.headline}>
          Write now, <br />
          edit later.
        </h1>
        <section className={styles.description}>
          <p>Ensō is a writing tool that helps you enter a state of flow.</p>

          <p>
            It does this by separating writing from editing and thus making it
            harder for you to edit yourself.
          </p>

          <HGroup>
            <Button
              level="primary"
              onClick={handleShowModalClick}
              label="Try it for yourself"
            />
            <ButtonLink
              href="https://sonnet.io/posts/ulysses"
              label="Learn more"
              level="secondary"
            />
          </HGroup>
        </section>
      </section>
      <Download isVisible={isModalVisible} onClose={handleHideModalClick} />
    </>
  );
};
