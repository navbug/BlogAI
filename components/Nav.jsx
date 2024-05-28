"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 mt-14 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="logo"
          className="object-contain"
        />
        <p className="logo_text">BlogAI</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-blog"} className="black_btn">
              Create Blog using AI
            </Link>
            <Link
              href={"/"}
              // type="button"
              className="outline_btn"
              onClick={() => {
                signOut();
                toast.success("Logged Out", {
                  duration: 3000,
                  position: "top-right",
                  style: {
                    borderRadius: "10px",
                  },
                });
              }}
            >
              Sign Out
            </Link>
            
            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={36}
                height={36}
                alt="logo"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In{" "}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={36}
              height={36}
              alt="logo"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-blog"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Blog using AI
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                    toast.success("Logged Out", {
                      duration: 3000,
                      position: "top-right",
                      style: {
                        borderRadius: "10px",
                      },
                    });
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In{" "}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
