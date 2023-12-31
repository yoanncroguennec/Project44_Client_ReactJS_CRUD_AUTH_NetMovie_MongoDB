import React, { useState, useEffect, useRef } from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import { CSSTransition } from "react-transition-group";
// ICONS
import { BsFillInfoCircleFill, BsBook } from "react-icons/bs";
import { FaArrowCircleLeft, FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PopupConfidentiality_DropdownNavbar, PopupAboutUs } from "../../";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DropdownMenu({
  token,
  handleTokenAndId,
  id_Of_ConnectedUser,
  open,
  setOpen,
}) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  // const [open, setOpen] = useState(true);

  //////////////////////// SECTION CHECK IF THE LOGGED IN USER IS ADMIN
  const [userInfosConnected, setUserInfosConnected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${id_Of_ConnectedUser}`
        );
        setUserInfosConnected(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id_Of_ConnectedUser]);

  const { firstName, lastName, email, admin } = userInfosConnected;

  function tt() {
    setOpen(!open);
    handleTokenAndId(null, null);
  }

  function DropdownItem(props) {
    console.log("props :", props);
    return (
      <a
        href='#'
        className='menu-item'
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div
      className='dropdown'
      style={{
        background: "transparent",
        border: "none",
        height: "450px",
        // height: menuHeight
      }}
      ref={dropdownRef}
    >
      {/* MENU DANS DROPDOWN */}
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames='menu-primary'
        unmountOnExit
        style={{
          background: "yellow",
          padding: "35px",
          borderRadius: "25px",
          height: "200px",
        }}
        onEnter={calcHeight}
      >
        <div className='menu'>
          {!token ? (
            <Link to='auth/login' onClick={() => setOpen(!open)}>
              <DropdownItem leftIcon={<FaUser />}>Se connecter</DropdownItem>
            </Link>
          ) : (
            <>
              <DropdownItem leftIcon={<FaUser />} goToMenu='animals'>
                Mon Compte
              </DropdownItem>
            </>
          )}
          <DropdownItem leftIcon='' rightIcon='' goToMenu='settings'>
            Confidentialités
          </DropdownItem>
          {!token ? (
            ""
          ) : (
            <DropdownItem leftIcon={<RiLogoutCircleRLine />} rightIcon=''>
              <Button
                onClick={tt}
                // onClick={() => setOpen(!open)}
                // onClick={() => {
                // // Cookies.remove("token, i");
                // handleTokenAndId(null, null);
                // }}
                style={{ color: "#FFF" }}
              >
                Déconnexion
              </Button>
            </DropdownItem>
          )}
        </div>
      </CSSTransition>
      {/* SOUS-ENFANTS DU MENU DANS DROPDOWN */}
      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        style={{
          background: "green",
          borderRadius: "25px",
          padding: "35px",
          height: "400px",
        }}
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<FaArrowCircleLeft />}>
            <Typography variant='h6'>Paramètres & Confidentialités</Typography>
          </DropdownItem>
          <hr style={{ marginBottom: "15px" }} />
          <Typography
            sx={{ color: "#FFF", fontWeight: "bold" }}
            variant='body1'
          >
            Préférences
          </Typography>
          <DropdownItem leftIcon=''>Dark mode</DropdownItem>
          <hr style={{ marginBottom: "15px" }} />
          <Typography
            sx={{ color: "#FFF", fontWeight: "bold" }}
            variant='body1'
          >
            Standards de la communauté et mentions légales
          </Typography>

          <DropdownItem leftIcon={<BsBook />}>
            <PopupConfidentiality_DropdownNavbar />
          </DropdownItem>
          <DropdownItem leftIcon={<BsFillInfoCircleFill />}>
            <PopupAboutUs />
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames='menu-secondary'
        style={{
          background: "blue",
          borderRadius: "25px",
          height: "200px",
          padding: "25px",
        }}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<FaArrowCircleLeft />}>
            <Typography style={{ fontWeight: "bold" }} variant='h6'>
              Mon compte
            </Typography>
          </DropdownItem>
          <Link to='auth/myProfile'>
            <DropdownItem leftIcon={<FaUser />}>
              <Tooltip title={`${admin} - ${email} - ${firstName} ${lastName}`}>
                <span>Mon Profil {admin}</span>
              </Tooltip>
            </DropdownItem>
          </Link>
          <DropdownItem leftIcon='🦧' rightIcon=''>
            <Button
              onClick={() => {
                // Cookies.remove("token, i");
                handleTokenAndId(null, null);
              }}
              style={{ color: "#FFF" }}
            >
              Déconnexion
            </Button>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
