import style from "./Messenger.module.css";
import TopBar from "../../components/topbar/TopBar";
import Conversations from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import ChantOnline from "../../components/chatOnline/ChantOnline";
const Messenger = () => {
  return (
    <>
      <TopBar />
      <div className={style.messenger}>
        <div className={style.chatManu}>
          <div className={style.chatMenuWrapper}>
            <input
              type="text"
              className={style.chatMenuInput}
              placeholder="Find the user"
            />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
          </div>
        </div>
        <div className={style.chatBox}>
          <div className={style.chatBoxWrapper}>
            <div className={style.chatBoxTop}>
              <Message own={true}/>
              <Message own={false}/>
              <Message own={true}/>
              <Message own={true}/>
              <Message own={true}/>
              <Message own={true}/>
            </div>
            <div className={style.chatBoxBottom}>
              <textarea className={style.chatMessageInput} placeholder="Write something ..."></textarea>
              <button className={style.chatSubmitButton}>Send</button>
            </div>
          </div>
        </div>
        <div className={style.chatOnline}>
          <div className={style.chatOnlineWrapper}>
            <ChantOnline/>
            <ChantOnline/>
            <ChantOnline/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
