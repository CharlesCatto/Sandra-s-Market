import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.videoPlayer}>
        {/* Background video */}
        <video
          className={styles.myVideo}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
        >
          <source src="../../public/img/christmasMarket.mp4" type="video/mp4" />
        </video>
        {/* Shadow overlay */}
        <div className={styles.shadow} />
        {/* Content */}
        <div className={styles.content}>
          <h1 className={styles.titleHome}>HOME</h1>
          <div className={styles.textContainer}>
            <p className={styles.pHome}>
              Discover the magic of Christmas Markets around the world!{" "}
              <span className={styles.hideOnMobile}>
                From twinkling lights and hand-crafted treasures to the scent of
                mulled wine and fresh gingerbread, our guide will take you on an
                enchanting journey through the best holiday markets. Find unique
                gifts, experience local traditions, and let the warmth of
                Christmas cheer surround you.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
