import style from "./Message.module.css";

const Message = ({own}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? `${style.message} ${style.own}`:`${style.message}`}>
      <div className={style.messageTop}>
        <img
          src={PF + "person/noAvtar.jpeg"}
          alt=""
          className={style.messageImage}
        />
        <p className={style.messageText}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quaerat
          id quod quisquam possimus tempora commodi culpa tempore fugiat, quidem
          blanditiis enim beatae, voluptatibus amet, soluta recusandae qui
          molestias iusto.
        </p>
      </div>
      <div className={style.messageBottom}>1 hour ago</div>
    </div>
  );
};

export default Message;
