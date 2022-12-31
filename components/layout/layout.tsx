import React from "react";
import useScrollbarSize from 'react-scrollbar-size';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/logo.png";
import Image from "next/image";
import { BiMenu as MenuIcon } from "react-icons/bi";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";

export const Layout = ({ rawData = {} as any, data = layoutData, children }) => {
  const { width: scrollbarWidth } = useScrollbarSize();
  const router = useRouter();

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  const items = data?.header?.nav?.map((item, i) => {
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

  const LargeHorizontalHeader = ({ fixed = false }) => 
    <div className={`navbar z-50 p-0 bg-neutral-900 hidden lg:flex ${ fixed && "fixed"}`} style={fixed && {width: `calc(100% - ${scrollbarWidth}px)`} || {}}>
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
    </div>;

  const SmallHorizontalHeader = ({ fixed = false }) => 
    <div className={`navbar z-50 p-0 bg-neutral-900 lg:hidden ${ fixed && "fixed"}`} style={fixed && {width: `calc(100% - ${scrollbarWidth}px)`} || {}}>
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
    </div>;

  return (
    <>
      <Head>
        <title>{data?.header.name} | {rawData?.page?.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {data.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
      </Head>
      <Theme data={data?.theme}>
        <div
          data-theme="osu"
          className={`min-h-screen flex flex-col ${
            data.theme.font === "nunito" && "font-nunito"
          } ${data.theme.font === "lato" && "font-lato"} ${
            data.theme.font === "sans" && "font-sans"
          }`}
        >
          <div className="drawer drawer-end">
            <input id="side-menu" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <SmallHorizontalHeader />
              <LargeHorizontalHeader fixed />
              <LargeHorizontalHeader />
              <div className="flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col">
                {children}
              </div>
              <footer className="footer p-10 bg-neutral-900 text-neutral-content">
                <div>
                  <span className="footer-title">Supported By</span> 
                  <Image src="/uploads/nsf.png" alt="OSU Logo" height={100} width={100} />
                </div> 
                <div>
                  <span className="footer-title">Mailing Address</span> 
                  OSU Argon Geochronology Laboratory<br/>
                  Oregon State University<br/>
                  CEOAS – Burt 130<br/>
                  Corvallis, OR 97331-5503, USA
                </div> 
                <div>
                  <span className="footer-title">Contact Us</span> 
                  <a href="mailto:geochronology@oregonstate.edu">geochronology@oregonstate.edu</a>
                </div>
              </footer>
                </div>
            <div className="drawer-side">
              <SmallHorizontalHeader fixed />
              <label htmlFor="side-menu" className="drawer-overlay"></label>
              <ul className="menu !z-50 w-80 bg-neutral-900 text-white">
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
        </div>
      </Theme>
    </>
  );
};
