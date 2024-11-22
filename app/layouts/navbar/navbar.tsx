import { Icon } from "~/components/icon";
import { Monogram } from "~/components/monogram";
import { useTheme } from "~/components/theme";
import { tokens } from "~/components/theme/theme";
import { Transition } from "~/components/transition";
import { useWindowSize, useScrollToHash } from "~/hooks";
import { Link as RouterLink, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { cssProps, media, msToNum, numToMs } from "~/utils/style";
import { NavToggle } from "./nav-toggle";
import { ThemeToggle } from "./theme-toggle";
import { navLinks, socialLinks } from "./nav-data";
import config from "~/config.json";
import styles from "./navbar.module.css";

export const Navbar = () => {
  const [current, setCurrent] = useState<any>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [target, setTarget] = useState<any>();
  const { theme } = useTheme();
  const location = useLocation();
  const windowSize = useWindowSize();
  const headerRef = useRef<any>();
  const isMobile = windowSize.w <= media.mobile || windowSize.h <= 696;
  const scrollToHash = useScrollToHash();

  useEffect(() => {
    // Prevent ssr mismatch by storing this in state
    setCurrent(`${location.pathname}${location.hash}`);
  }, [location]);

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || location.pathname !== "/") return;
    setCurrent(`${location.pathname}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [location.pathname, scrollToHash, target]);

  useEffect(() => {
    const navItems = document.querySelectorAll("[data-navbar-item]");
    const inverseTheme = theme === "dark" ? "light" : "dark";
    const { innerHeight } = window;

    let inverseMeasurements: any = [];
    let navItemMeasurements: any = [];

    const isOverlap = (rect1: any, rect2: any, scrollY: any) => {
      return !(
        rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom
      );
    };

    const resetNavTheme = () => {
      for (const measurement of navItemMeasurements) {
        measurement.element.dataset.theme = "";
      }
    };

    const handleInversion = () => {
      const invertedElements = document.querySelectorAll<HTMLElement>(
        `[data-theme='${inverseTheme}'][data-invert]`
      );

      if (!invertedElements) return;

      // Create measurements for inverted elements
      inverseMeasurements = Array.from(invertedElements).map((item) => ({
        element: item,
        top: item.offsetTop,
        bottom: item.offsetTop + item.offsetHeight,
      }));

      const { scrollY } = window;

      resetNavTheme();

      for (const inverseMeasurement of inverseMeasurements) {
        if (
          inverseMeasurement.top - scrollY > window.innerHeight ||
          inverseMeasurement.bottom - scrollY < 0
        ) {
          continue;
        }

        for (const measurement of navItemMeasurements) {
          if (isOverlap(inverseMeasurement, measurement, scrollY)) {
            measurement.element.dataset.theme = inverseTheme;
          } else {
            measurement.element.dataset.theme = "";
          }
        }
      }
    };

    // Currently only the light theme has dark full-width elements
    if (theme === "light") {
      navItemMeasurements = Array.from(navItems).map((item) => {
        const rect = item.getBoundingClientRect();
        return {
          element: item,
          top: rect.top,
          bottom: rect.bottom,
        };
      });

      document.addEventListener("scroll", handleInversion);
      handleInversion();
    }

    return () => {
      document.removeEventListener("scroll", handleInversion);
      resetNavTheme();
    };
  }, [theme, windowSize, location.key]);

  // Check if a nav item should be active
  const getCurrent = (url: string = "") => {
    const nonTrailing = current?.endsWith("/")
      ? current?.slice(0, -1)
      : current;

    if (url === nonTrailing) {
      return "page"; // Valid value when the URL matches
    }

    return undefined; // Return undefined instead of an empty string
  };

  // Store the current hash to scroll to
  const handleNavItemClick = (event: any) => {
    const hash = event.currentTarget.href.split("#")[1];
    setTarget(null);

    if (hash && location.pathname === "/") {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  const handleMobileNavClick = (event: any) => {
    handleNavItemClick(event);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <RouterLink
        viewTransition
        prefetch="intent"
        to={location.pathname === "/" ? "/#intro" : "/"}
        data-navbar-item
        className={styles.logo}
        aria-label={`${config.name}, ${config.role}`}
        onClick={handleMobileNavClick}
      >
        <Monogram highlight />
      </RouterLink>

      <NavToggle onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname }) => (
            <RouterLink
              viewTransition
              prefetch="intent"
              to={pathname}
              key={label}
              data-navbar-item
              className={styles.navLink}
              aria-current={getCurrent(pathname)}
              onClick={handleNavItemClick}
            >
              {label}
            </RouterLink>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>

      <Transition
        unmount
        in={menuOpen}
        timeout={msToNum(tokens.base.durationL)}
      >
        {({ visible, nodeRef }) => (
          <nav
            className={styles.mobileNav}
            data-visible={visible}
            ref={nodeRef}
          >
            {navLinks.map(({ label, pathname }, index) => (
              <RouterLink
                viewTransition
                prefetch="intent"
                to={pathname}
                key={label}
                className={styles.mobileNavLink}
                data-visible={visible}
                aria-current={getCurrent(pathname)}
                onClick={handleMobileNavClick}
                style={cssProps(
                  {
                    transitionDelay: numToMs(
                      Number(msToNum(tokens.base.durationS)) + index * 50
                    ),
                  },
                  {}
                )}
              >
                {label}
              </RouterLink>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>

      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
};

const NavbarIcons = ({ desktop }: any) => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
        className={styles.navIconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);
