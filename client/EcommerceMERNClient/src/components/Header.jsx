import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../CustomCSS/MyLink.module.css";
import styles2 from "../CustomCSS/Header.module.css";
import { useLocation } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from "../authContextAPI";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../CartContextAPI";
import { Avatar, Badge, Button, Switch, Space } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
const ButtonGroup = Button.Group;
import { AiTwotoneCarryOut } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  //const [currentUser] = useCurrentUser();

  const categories = useCategory();
  const [cart] = useCart();

  //cart antd starts here

  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);
  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };
  const random = () => {
    const newCount = Math.floor(Math.random() * 100);
    setCount(newCount);
  };
  const onChange = (checked) => {
    setShow(checked);
  };
  //cart antd ended here

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      email: null,
      role: null,
      phone: null, //new extra
      address: null, //new extra
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfull");

    // Delay navigation using setTimeout
    setTimeout(() => {
      navigate("/login");
    }, 3000); // Delay for 3 seconds (adjust as needed)
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <SearchInput />
              <li>
                <Link
                  className={`${styles.MyLink} px-[10px] py-[5px] my-[3px] uppercase `}
                  to="/"
                >
                  Home Small
                </Link>
              </li>

              {!categories ? (
                <>
                  <li>Nothing</li>
                </>
              ) : (
                <>
                  <div className="dropdown relative">
                    <div
                      className={`${styles.MyLink} ${styles2.myAction3} px-[10px] py-[5px] mx-[3px] uppercase rounded-[5px] `}
                    >
                      <button className="uppercase">Categories</button>
                      <div
                        className={`shadow bg-base-100 rounded-box w-30 ${styles2.myAction4} `}
                      >
                        <div
                          className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] dropdown dropdown-right`}
                        >
                          {/* <div tabIndex={0} role="button" className="">Category</div> */}
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <Link
                                className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] my-[1px] uppercase `}
                                to={`/categories`}
                              >
                                All Categories
                              </Link>
                            </li>
                            {categories.map((c) => (
                              <li key={c?._id}>
                                <Link
                                  className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] my-[1px] uppercase `}
                                  to={`/category/${c.slug}`}
                                >
                                  {c?.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!auth.user ? (
                <>
                  <li>
                    <Link
                      className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] uppercase my-[3px] `}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] uppercase my-[3px] `}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <div className="dropdown relative">
                    <div
                      className={`${styles.MyLink} ${styles2.myAction} px-[10px] py-[5px] mx-[3px] uppercase rounded-[5px] `}
                    >
                      <button className="uppercase">{auth?.user}</button>
                      <div
                        className={`shadow bg-base-100 rounded-box w-30 ${styles2.myAction2} `}
                      >
                        <li>
                          <Link
                            className={`block px-4 py-2 text-sm hover:bg-orange-400 hover:text-white`}
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`block px-4 py-2 text-sm hover:bg-orange-400 hover:text-white`}
                            to={`/dashboard/${
                              auth?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </Link>
                        </li>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <li>
                <Link
                  className={`${styles.MyLink} px-[10px] py-[5px] my-[3px] uppercase `}
                  to="/cart"
                >
                  <Badge count={cart?.length}>
                    {/* <Avatar shape="square" size="small" /> */}
                    <AiTwotoneCarryOut className="text-2xl" />
                  </Badge>
                </Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" to="/">
            <FaShoppingBag /> Shop on Desire
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <SearchInput />
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] uppercase `}
                to="/"
              >
                Home Big
              </Link>
            </li>
            <div
              className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] dropdown dropdown-bottom`}
            >
              <div tabIndex={0} role="button" className="">
                Category
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    className={`${styles.MyLink} px-[10px]  mx-[3px] my-[1px] uppercase `}
                    to={`/categories`}
                  >
                    All Categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c?._id}>
                    <Link
                      className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] my-[1px] uppercase `}
                      to={`/category/${c.slug}`}
                    >
                      {c?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {!auth.user ? (
              <>
                <li>
                  <Link
                    className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] uppercase `}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] uppercase `}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <li
                    tabIndex={0}
                    role="button"
                    className={`${styles.MyLink} px-[10px] py-[5px] mx-[3px] uppercase rounded-[10px] text-red-600 `}
                  >
                    {auth?.user}
                  </li>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-30"
                  >
                    <li>
                      <Link
                        className={`hover:bg-orange-400 hover:text-white`}
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`hover:bg-orange-400 hover:text-white`}
                        to={`/dashboard/${auth?.role === 1 ? "admin" : "user"}`}
                      >
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <li>
              <Link
                className={`px-[10px] py-[5px] mx-[3px] uppercase `}
                to="/cart"
              >
                {/* Cart({cart?.length}) */}
                <Badge count={cart?.length}>
                  {/* <Avatar shape="square" size="small" /> */}
                  <AiTwotoneCarryOut className="text-2xl" />
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
