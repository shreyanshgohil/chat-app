import style from "./ChatOnline.module.css";

const ChantOnline = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={style.chatOnline}>
      <div className={style.chatOnlineFriend}>
        <div className={style.chatOnlieImgContainer}>
          <img
            src={PF + "person/noAvtar.jpeg"}
            alt=""
            className={style.onlineUserImage}
          />
          <div className={style.chatOnlieBadge}>&nbsp;</div>
        </div>
        <div className={style.chatOnlieName}>Shreyansh gohil</div>
      </div>
    </div>
  );
};

export default ChantOnline;
