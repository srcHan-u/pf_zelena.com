"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@hooks/useMediaQuery";

const styles = {
  header: {
    default:
      "flex items-center justify-start w-full bg-white h-[60px] px-4 sticky top-0 z-50 shadow-md transition-colors duration-200",
    darkTheme: "dark:bg-black",
    media: {
      sm: "sm:justify-center",
    },
  },
  nav: {
    default:
      "flex space-x-4 font-work font-semibold gap-x-[27px] uppercase hidden",
    media: {
      sm: "sm:flex",
    },
  },
  link: {
    default:
      "text-black hover:text-gray-600 transition-colors duration-200 text-[28px]",
    darkTheme: "dark:text-white dark:hover:text-gray-300",
    media: {
      sm: "sm:text-[14px]",
    },
  },
  mobileButton: {
    default: "p-2 focus:outline-none block",
    media: {
      sm: "sm:hidden",
    },
  },
  mobileMenu: (isOpen: boolean) =>
    `${isOpen ? "block" : "hidden"
    } sm:hidden absolute inset-x-0 top-full h-[calc(100vh-60px)] bg-white dark:bg-black`,
  mobileNav: {
    default:
      "flex flex-col items-center space-y-4 p-4 font-work font-semibold uppercase",
  },
};

const links = [
  { href: "#portfolio", label: "Pricing" },
  { href: "#flash-designs", label: "Designs" },
  { href: "#contacts", label: "Contacts" },
  { href: "#faq", label: "FAQ" },
  { href: "#events", label: "Events" },
];
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <header
      className={`${styles.header.default} ${styles.header.media.sm} ${styles.header.darkTheme}`}
    >
      <nav className={`${styles.nav.default} ${styles.nav.media.sm}`}>
        {links.map((link) => (
          <a
            onClick={() => setIsOpen(false)}
            className={`${styles.link.default} ${styles.link.darkTheme} ${styles.link.media.sm}`}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className={`${styles.mobileButton.default} ${styles.mobileButton.media.sm}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={styles.mobileMenu(isOpen)}
      >
        <ul className={`${styles.mobileNav.default}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                onClick={() => setIsOpen(false)}
                className={`${styles.link.default} ${styles.link.darkTheme} ${styles.link.media.sm}`}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
