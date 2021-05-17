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
    <header>
      <div>
        <Link href="/">
          <h1>MyMemes</h1>
        </Link>
        <button
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
      <style jsx>{`
        header {
          display: flex;
          flex-direction: column;
          padding:1rem
        }
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        h1 {
          text-align: center;
          font-size: 24px;
          cursor: pointer;
          margin-right: 5rem;
        }
        button {
          width: 2rem;
          height: 2rem;
          background-color: transparent;
          border 3px solid white;
          border-radius: 20%;
          padding:0;
        }
        button:active{
          transform: scale(1.1);
        }
        img {
          width: 100%;
        }
        @media (min-width: 600px) {
          button {
            display: none;
          }
          header {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
