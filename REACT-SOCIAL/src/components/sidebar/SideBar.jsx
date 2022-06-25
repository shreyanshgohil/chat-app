import style from "./SideBar.module.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <div className={style.sideBar}>
      <div className={style.sidebarWrapper}>
        <ul className={style.sideBarListItems}>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/"
              className={style.sideLinks}
              
            >
              <RssFeed className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Feed</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/chats"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <Chat className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Chats</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/videos"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <PlayCircleFilledOutlined className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Videos</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/groups"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <Group className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Groups</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/bookmarks"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <Bookmark className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Bookmarks</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/question"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <HelpOutline className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Questions</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/jobs"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <WorkOutline className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Jobs</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="/events"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <Event className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Events</span>
            </NavLink>
          </li>
          <li className={style.sidebarListItem}>
            <NavLink
              to="courses"
              activeClassName={style.activeLink}
              className={style.sideLinks}
            >
              <School className={style.sidebarIcon} />
              <span className={style.sidebarListItemText}>Courses</span>
            </NavLink>
          </li>
        </ul>
        <button className={`${style.showMoreButton} btn`}>Show More</button>
        <hr className={style.sideBarBottomRow} />
        <ul className={style.sideBarFriendList}>
          {Users.map((user) => (
            <CloseFriend user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
