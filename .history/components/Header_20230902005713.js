import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BiLogOut, BiUser } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DropDownNew from "./DropDown";
import axios from "axios";


export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const { inputSearch } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession();

  function handleChange(e) {
    inputSearch(e);
  }
  useEffect(() => {
  axios.get('/api/categories').then(res => {
    setCategories(res.data)
  })

  }, [])
  
  return (
    <>
      <StyledHeader>
        <Toaster position="top-center" reverseOrder={false} />
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
            <SearchbarBox>
              <SearchBox>
                <SearchInput
                  placeholder="Search products..."
                  onChange={(e) => handleChange(e.target.value)}
                  type="text"
                  id="fname"
                  name="fname"
                ></SearchInput>
                <SearchIcon href={"/search"}>
                  <BiSearchAlt2 className="text-black text-2xl" />
                </SearchIcon>
              </SearchBox>
            </SearchbarBox>
            <StyledNav>
              <NavLink href={"/"}>Home</NavLink>
              <NavLink href={"/products"}>All products</NavLink>
              <NavLink href={"/gear-store"}>Gear Store</NavLink>
              <DropDownNew options={categories}/>
            </StyledNav>

            {session && (
              <NavAccountBox>
                <NavAcc href={"/account"} title="Your profile">
                  <BiUser size={24} />
                  <div>
                    <p className="text-md font-medium"> {session.user.name}</p>
                  </div>{" "}
                </NavAcc>

                <NavCart href={"/cart"}>
                  <BsCart size={28} color="black" />
                  <CartNum>{cartProducts.length}</CartNum>
                </NavCart>
              </NavAccountBox>
            )}
            {!session && (
              <NavAccountBox>
                <NavAcc href={"/account"}>
                  <BiUser size={24} />
                  <div>
                    <button onClick={() => signIn()}>Sign in</button>
                    <p className="text-md font-medium">Account</p>
                  </div>{" "}
                </NavAcc>

                <NavCart href={"/cart"}>
                  <BsCart size={28} color="black" />
                  <CartNum>{cartProducts.length}</CartNum>
                </NavCart>
              </NavAccountBox>
            )}
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed z-1 flex -inset-0">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-100"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl">
                      <div className="flex px-4 pb-2 pt-5">
                        <button
                          type="button"
                          className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-1" />
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Links */}
                      <Tab.Group as="div" className="mt-2">
                        <div className="ml-4 font-semibold text-lg"></div>
                        <Tab.Panels as={Fragment}>
                          <Tab.Panel className="space-y-10 px-4 pb-8 pt-10">
                            <div>
                              <Link
                                href={"/"}
                                id={`home-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                Home
                              </Link>
                            </div>
                            <div>
                              <Link
                                href={"/products"}
                                id={`home-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                All products
                              </Link>
                            </div>
                            <div className="border-gray-300 border-b pb-8 ">
                              <Link
                                href={"/categories"}
                                id={`home-heading-mobile`}
                                className="font-medium text-gray-900  "
                              >
                                Categories
                              </Link>
                            </div>
                            <div>
                              {session && (
                                <div className="flex flex-col gap-5">
                                  <Link
                                    href={"/account"}
                                    className="flex items-center gap-2"
                                  >
                                    <BiUser size={24} />
                                    <div>
                                      <p className="text-md font-medium">
                                        {session.user.name}
                                      </p>
                                    </div>
                                  </Link>

                                  <div className="flex items-center gap-2">
                                    <BiLogOut size={24} />
                                    <button onClick={() => signOut()}>
                                      Sign out
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              {!session && (
                                <Link href={"/account"}>
                                  <BiUser size={24} />
                                  <div>
                                    <button onClick={() => signIn()}>
                                      Sign in
                                    </button>
                                    <p className="text-md font-medium">
                                      Account
                                    </p>
                                  </div>{" "}
                                </Link>
                              )}
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
            <NavButton onClick={() => setOpen((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  );
}
const StyledHeader = styled.header`
  letter-spacing: 0.5px;
  background-color: white;
  font-size: 0.9rem;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
`;
const Logo = styled(Link)`
  align-items: center;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  display: none;
  width: 100%;
  align-items: center;
  gap: 20px;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
 

  @media screen and (min-width: 768px) {
    right: 10px;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px 0;
  &:focus {
    outline: none;
  }

  &:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  }

  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  position: relative;
  z-index: 4;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const NavAccountBox = styled.div`
  position: relative;
  bottom: 0;
  align-items: center;
  gap: 20px;
  display: flex;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavCart = styled(Link)`
  padding: 14px 15px;
  border-radius: 30px;
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
`;
const NavAcc = styled(Link)`
  display: none;
  text-decoration: none;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
  @media screen and (min-width: 640px) {
    padding: 14px 15px;
    border-radius: 30px;
    height: 54px;
    background-color: transparent;
    gap: 10px;
    align-items: center;
    &:hover {
      background-color: #096fd3;
      color: white;
    }
  }
`;
const CartNum = styled.p`
  font-size: 0.9rem;
  text-align: center;
  background-color: #ffa502;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: absolute;
  left: 28px;
  bottom: 28px;
`;
const SearchbarBox = styled.div`
  display: flex;
  border: 1px solid gray;
  background-color: white;
  align-items: center;
  margin: 0 20px 0 20px;
  width: 100%;
  color: white;
  font-weight: normal;
  z-index: 3;
  height: 40px;
  border-radius: 40px;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SearchInput = styled.input`
  margin-left: 20px;
  width: 100%;
  outline: none;
  background: transparent;
  padding: 0 10px;
`;

const SearchIcon = styled(Link)`
  width: 30px;
  height: auto;
  color: gray;
`;