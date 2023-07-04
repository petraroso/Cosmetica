import { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxAvatar, RxHeart } from "react-icons/rx";
import { SlBasket } from "react-icons/sl";
import { GoSearch } from "react-icons/go";
import Dropdown from "../Dropdown";
import DropdownForUser from "../DropdownForUser";
import DropdownForAdmin from "../DropdownForAdmin";
import Navigation from "../Navigation";
import { logout } from "../../redux/actions/userActions";
//useSelector to get state from store
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownForUser, setOpenDropdownForUser] = useState(false);
  const [openDropdownForAdmin, setOpenDropdownForAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  //get userInfo property
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef);

  //dispatching redux so data is available throughout
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    //trims spaces from the left and right side
    if (searchQuery.trim()) {
      navigate(`/product-list/search/${searchQuery}/`);
    } else {
      navigate("/product-list");
    }
  };
  function useOutsideAlerter(ref) {
    useEffect(() => {
      //Alert if clicked on outside of element
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenDropdown(false);
          setOpenDropdownForAdmin(false);
          setOpenDropdownForUser(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <div>
      <div className={styles.header}>
        <div>
          <RxHamburgerMenu
            className={styles.dropdownIcon}
            style={{ height: "1.7rem", width: "1.7rem" }}
            onClick={() => setOpenDropdown((prev) => !prev)}
          />
          {openDropdown && (
            <Dropdown categories={categories} dropdownRef={dropdownRef} />
          )}
        </div>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className={styles.brandName}
        >
          <h2>COSMETICA</h2>
        </Link>

        <div className={styles.headerIcons}>
          {userInfo && userInfo.isAdmin ? (
            <>
              <RxAvatar
                className={styles.userIcon}
                style={{
                  height: "1.7rem",
                  width: "1.7rem",
                  color: "#ff85ba",
                }}
                onClick={() => setOpenDropdownForAdmin((prev) => !prev)}
              />
              {openDropdownForAdmin && (
                <DropdownForAdmin
                  userInfo={userInfo}
                  logout={logout}
                  dropdownRef={dropdownRef}
                />
              )}
            </>
          ) : userInfo && userInfo.name && !userInfo.isAdmin ? (
            <>
              <RxAvatar
                className={styles.userIcon}
                style={{ height: "1.7rem", width: "1.7rem" }}
                onClick={() => setOpenDropdownForUser((prev) => !prev)}
              />
              {openDropdownForUser && (
                <DropdownForUser
                  userInfo={userInfo}
                  logout={logout}
                  dropdownRef={dropdownRef}
                />
              )}
            </>
          ) : (
            <Link className={styles.login} to="/login">
              Login
            </Link>
          )}

          <RxHeart
            className={styles.icon}
            style={{ height: "1.7rem", width: "1.7rem" }}
          />
          {userInfo && userInfo.name && !userInfo.isAdmin ? (
            <>
              <Link to="/user/cart-details">
                <SlBasket
                  className={styles.icon}
                  style={{ height: "1.7rem", width: "1.7rem", color: "black" }}
                />
              </Link>
              {itemsCount === 0 ? (
                ""
              ) : (
                <div className={styles.itemsInCart}>{itemsCount}</div>
              )}
            </>
          ) : (
            <>
              <Link to="/cart">
                <SlBasket
                  className={styles.icon}
                  style={{ height: "1.7rem", width: "1.7rem", color: "black" }}
                />
              </Link>
              {itemsCount === 0 ? (
                ""
              ) : (
                <div className={styles.itemsInCart}>{itemsCount}</div>
              )}
            </>
          )}
        </div>
      </div>
      <form
        className={styles.searchBarContainer}
        onKeyUp={submitHandler}
        onChange={(e) => setSearchQuery(e.target.value)}
      >
        <GoSearch style={{ margin: "0.7rem" }} />
        <input
          type="search"
          placeholder="Pretražite proizvode..."
          name="searchBar"
          //const="true"
          //value={searchTerm}
          //onChange={handleChanges}
          className={styles.searchBar}
        />
        <button className={styles.searchButton} onClick={submitHandler}>
          Pretražite
        </button>
      </form>
      <Navigation categories={categories} />
    </div>
  );
}
