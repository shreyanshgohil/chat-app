import style from "./share.module.css";
import { PermMedia, Label, FmdGood, EmojiEmotions } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext)
  return (
    <div className={style.share}>
      <div className={style.shareWrapper}>
        <div className={style.shareTop}>
          <img
            src={PF + `/person/${user.profilePicture}`}
            alt=""
            loading="lazy"
            className={style.shareProfilePicture}
          />
          <input
            type="text"
            className={style.shareInput}
            placeholder={`what's in your mind ${user.username}`}
          />
        </div>
        <hr className={style.shareHr} />
        <div className={style.shareBottom}>
          <div className={style.shareOptionContainer}>
            <ul className={style.shareOptions}>
              <li className={style.shareOption}>
                <PermMedia className={`${style.shareIcon} icon`} />
                <span className={style.shareOptionText}>Photo or video</span>
              </li>
              <li className={style.shareOption}>
                <Label className={`${style.tagOptionText} icon`} />
                <span className={style.shareOptionText}>Tag</span>
              </li>
              <li className={`${style.shareOption} `}>
                <FmdGood className={`${style.locationIcon} icon`} />
                <span className={style.shareOptionText}>Location</span>
              </li>
              <li className={`${style.shareOption}`}>
                <EmojiEmotions className={`${style.feelIcon} icon`} />
                <span className={style.shareOptionText}>Feelings</span>
              </li>
            </ul>
          </div>
          <button className={`${style.shareButton} btn`}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
