import styles from "./Navbar.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import PortraitIcon from "@mui/icons-material/Portrait";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [openRightDropdown, setOpenRightDropdown] = useState(false);
  const [openLeftSidebar, setOpenLeftSidebar] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  function handleLeftSideBarToggle() {
    setOpenLeftSidebar(!openLeftSidebar);
    setOpenRightDropdown(false);
  }
  function handleRightDropdownToggle() {
    setOpenRightDropdown(!openRightDropdown);
    setOpenLeftSidebar(false);
  }

  return (
    <>
      <div className={openLeftSidebar ? "active-left-tab" : "hidden-left-tab"}>
        <Link href="/">
          <div className="flex gap-1 items-center py-3 px-2 shadow-sm" onClick={handleLeftSideBarToggle}>
            <SearchOutlinedIcon style={{ fontSize: "30px", fill: "#01AFF4" }} />
            <p>Search</p>
          </div>
        </Link>
        <Link href={isLoggedIn ? "/publish-ride" : "/login"}>
          <div
            className="flex gap-1 items-center py-3 px-2 shadow-sm"
            onClick={() => {
              handleLeftSideBarToggle();
              if (!isLoggedIn) toast("Log in to publish ride!");
            }}
          >
            <AddCircleOutlineSharpIcon style={{ fontSize: "30px", fill: "#01AFF4" }} />
            <p>Publish a ride</p>
          </div>
        </Link>
        <Link href="/login" className="grow content-end">
          <div
            className="flex gap-1 items-center py-3 px-2 shadow-top"
            onClick={() => {
              logout();
              handleLeftSideBarToggle;
            }}
          >
            <LogoutIcon style={{ fontSize: "30px", fill: "#01AFF4" }} />
            <p>Log out</p>
          </div>
        </Link>
      </div>
      <div className={styles.navbar}>
        {!openLeftSidebar ? (
          <MenuIcon
            onClick={handleLeftSideBarToggle}
            sx={{
              "@media (min-width: 768px)": {
                display: "none",
              },
              cursor: "pointer",
              fontSize: "2rem",
            }}
          />
        ) : (
          <CloseIcon
            onClick={handleLeftSideBarToggle}
            sx={{
              "@media (min-width: 768px)": {
                display: "none",
              },
              cursor: "pointer",
              fontSize: "2rem",
            }}
          />
        )}

        <Link href="/">
          <div className={styles.logo}>
            <img src="\logo.png" alt="Rideshare Logo" />
            <h3>RideShare</h3>
          </div>
        </Link>
        <div className={styles.menu}>
          <Link href="/">
            <div className={(styles.menuItem, styles.hide)}>
              <SearchOutlinedIcon style={{ fontSize: "36px", fill: "#01AFF4" }} />
              <p>Search</p>
            </div>
          </Link>
          <Link href="/publish-ride">
            <div className={(styles.menuItem, styles.hide)} onClick={() => !isLoggedIn && toast("Log in to publish ride!")}>
              <AddCircleOutlineSharpIcon style={{ fontSize: "36px", fill: "#01AFF4" }} />
              <p>Publish a ride</p>
            </div>
          </Link>

          <div className={styles.menuItem} onClick={handleRightDropdownToggle}>
            <AccountCircleSharpIcon className="cursor-pointer" style={{ fontSize: "36px", fill: "#01AFF4" }} />
            {openRightDropdown ? <KeyboardArrowUpSharpIcon className="cursor-pointer" /> : <KeyboardArrowDownSharpIcon className="cursor-pointer" />}
            {openRightDropdown &&
              (!isLoggedIn ? (
                <div className={styles.authDropDown}>
                  <div>
                    <Link href="/login">
                      <div className={styles.space}>
                        Log in <KeyboardArrowRightSharpIcon />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="/signup">
                      <div className={styles.space}>
                        Sign Up <KeyboardArrowRightSharpIcon />
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={styles.authDropDown}>
                  <div>
                    <Link href="/profile">
                      <div className={styles.space}>
                        Profile <PortraitIcon />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="/login">
                      <div className={styles.space} onClick={() => logout()}>
                        Logout <LogoutIcon />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
