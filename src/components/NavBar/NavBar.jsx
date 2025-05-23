import React, { useState, useEffect } from "react";
import logo from "../../assets/images/white-logo.png";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("SV");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { t, i18n } = useTranslation();

  const selectLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <>
      <nav className={styles.navbar} aria-label="Main Navigation">
        <div className={styles.logoContainer}>
          <Link to="/">
            <img
              src={logo}
              alt="Swedish Holocaust Museum logo"
              className={styles.logo}
            />
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.link}>
              {t("nav.main")}
            </Link>
          </li>
          <span className={styles.divider}>|</span>
          <li>
            <Link to="/how-it-works" className={styles.link}>
              {t("nav.howItWorks")}
            </Link>
          </li>
          <span className={styles.divider}>|</span>
          <li
            className={styles.languageToggle}
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="Language selector"
          >
            {language}
            <span className={styles.languageIcon}>language</span>
            {dropdownOpen && (
              <ul className={styles.dropdown}>
                <li onClick={() => selectLanguage("EN")}>EN</li>
                <li onClick={() => selectLanguage("SV")}>SV</li>
              </ul>
            )}
          </li>
        </ul>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <GiHamburgerMenu />
        </button>
      </nav>

      {menuOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <button
          className={styles.close}
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <IoMdClose />
        </button>
        <Link to="/" className={styles.link} onClick={toggleMenu}>
          {t("nav.main")}
        </Link>
        <Link to="/how-it-works" className={styles.link} onClick={toggleMenu}>
          {t("nav.howItWorks")}
        </Link>

        <section
          className={styles.mobileLanguage}
          aria-label="Language selection"
        >
          <button onClick={() => selectLanguage("EN")}>EN</button>
          <button onClick={() => selectLanguage("SV")}>SV</button>
        </section>
      </div>
    </>
  );
};

export default NavBar;
