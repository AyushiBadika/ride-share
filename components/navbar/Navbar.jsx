import styles from "./Navbar.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo}>
          <img src="\logo.png" />
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
        <Link href="/ride">
          <div className={(styles.menuItem, styles.hide)}>
            <AddCircleOutlineSharpIcon style={{ fontSize: "36px", fill: "#01AFF4" }} />
            <p>Publish a ride</p>
          </div>
        </Link>

        <MenuIcon className={styles.menuIcon} />
        <div className={styles.menuItem} onClick={handleOpen}>
          <AccountCircleSharpIcon className="cursor-pointer" style={{ fontSize: "36px", fill: "#01AFF4" }} />
          {open ? <KeyboardArrowUpSharpIcon className="cursor-pointer" /> : <KeyboardArrowDownSharpIcon className="cursor-pointer" />}
          {open && (
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
          )}
        </div>
      </div>
    </div>
  );
}
