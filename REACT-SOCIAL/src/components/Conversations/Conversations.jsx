import style from "./Consevetsation.module.css";

const Conversations = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={style.consevetsation}>
      <img
        className={style.conversationImage}
        src={PF + "person/noAvtar.jpeg"}
        alt=""
      />
      <span className={style.conversationName}>shreyansh gohil</span>
    </div>
  );
};

export default Conversations;
