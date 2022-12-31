import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/logo.png";
import Image from "next/image";
import { BiMenu as MenuIcon } from "react-icons/bi";

export const Header = ({ data }) => {
  const router = useRouter();

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  const items = data?.nav?.map((item, i) => {
    let activeItem = false;
    if (item.href === "" || item.href === "/")
      activeItem = (router.asPath === "/home" || router.asPath === "/");
    else
      activeItem = router.asPath.includes(item.href);
    return {
      ...item,
      active: activeItem
    };
  });
      
  return (
    <>
      <div className="navbar invisible lg:hidden p-0">
        <div className="navbar-start">
          <Link href="/" passHref>
            <a className="p-4 h-24"><Image src={logo} /></a>
          </Link>
        </div>
        <div className="navbar-end">
          <label tabIndex={0} htmlFor="side-menu" className="drawer-button btn btn-primary btn-link">
            <MenuIcon className="text-6xl" />
          </label>
        </div>
      </div>
      <div className="fixed z-50 drawer drawer-end lg:hidden">
        <input id="side-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-neutral-900 p-0">
            <div className="navbar-start">
              <Link href="/" passHref>
                <a className="p-4 h-24"><Image src={logo} /></a>
              </Link>
            </div>
            <div className="navbar-end">
              <label tabIndex={0} htmlFor="side-menu" className="drawer-button btn btn-primary btn-link text-4xl">
                <MenuIcon />
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="side-menu" className="drawer-overlay"></label>
          <ul className="menu w-80 bg-neutral-900 text-white">
            {items.map((item, i) => 
              <li key={i} className={`${item.active ? "bordered !border-primary" : ""}`}>
                <Link href={`${prefix}${prefix && "/"}${item.href}`} passHref>
                  <a>{item.label}</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar bg-neutral-900 hidden lg:flex p-0">
        <Link href="/" passHref>
          <a className="p-4 h-24"><Image src={logo}/></a>
        </Link>
        <ul className="tabs">
          {items.map((item, i) => 
            <li key={i} className={`tab tab-lg h-24 tab-bordered border-b-4 ${item.active ? "tab-active !border-primary" : ""} text-white`}>
              <Link href={`${prefix}${prefix && "/"}${item.href}`} passHref>
                <a>{item.label}</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
