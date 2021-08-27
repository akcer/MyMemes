import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
  const [showMenu, toggleMenu] = useState(true);
  useEffect(() => {
    if (window.outerWidth < 600) {
      toggleMenu(false);
    }
  }, []);
  return (
    <header className="flex flex-col p-4 sm:flex-row sm:items-center">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-center text-2xl mr-20 cursor-pointer font-black">
            MyMemes
          </h1>
        </Link>
        <button
          className="w-8 h-8 bg-transparent border-2 rounded-md sm:hidden"
          type="button"
          onClick={() => {
            toggleMenu(!showMenu);
          }}
        >
          <Image
            src="/hamburgerMenu.png"
            alt="hamburgerMenu"
            width={50}
            height={50}
          />
        </button>
      </div>
      <Nav showMenu={showMenu} />
    </header>
  );
};

export default Header;
