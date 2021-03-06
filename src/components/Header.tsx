import { Link, useLocation } from "react-router-dom";
import { PlayStore } from "styled-icons/boxicons-logos";
import styled from "styled-components";

import "./Header.scss";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Browse", path: "/browse" },
  { name: "Favorite", path: "/favorite" },
];
const logoTitle = "BOOVIE";

export const MyPlayStore = styled(PlayStore)`
  color: #71fadc;
`;
const Header = () => {
  const { pathname, search } = useLocation();
  const [scroll, setScroll] = useState(false);
  const activeLink = pathname + search;

  useEffect(() => {
    let timer: any;
    const handler = () => {
      clearTimeout(timer);
      setScroll(true);
      timer = setTimeout(() => {
        setScroll(false);
      }, 1000);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`header ${scroll ? "scroll" : "noScroll"}`}>
      <MyLogo />
      <ul className="nav__links">
        {navLinks.map(({ name, path }) => {
          return (
            <li className={`${path === activeLink && "active"} `} key={name}>
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const MyLogo = () => {
  return (
    <div className="logo__wrapper">
      <MyPlayStore size={"3rem"} title="BooMovie" />
      {logoTitle.split("").map((e, idx) => {
        return <span key={e + idx}>{e}</span>;
      })}
    </div>
  );
};

export default Header;
