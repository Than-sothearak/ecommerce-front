import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BiCategory, BiHome, BiLogOut, BiUser } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DropDownNew from "./DropDown";
import axios from "axios";
import Image from "next/image";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineDevices, MdPlayArrow } from "react-icons/md";
import { root } from "postcss";
import { primary } from "@/lib/colors";

export default function Navbar() {
  const { cartProducts } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const { inputSearch } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession();

  function buildCategoryTree(categories) {
    const map = {};
    const roots = [];

    // Create lookup map
    categories.forEach((cat) => {
      map[cat._id.toString()] = {
        ...cat,
        children: [],
      };
    });

    // Build relations
    categories.forEach((cat) => {
      const id = cat._id.toString();

      const parentId =
        typeof cat.parent === "object"
          ? cat.parent?._id?.toString()
          : cat.parent?.toString();
      if (parentId && map[parentId]) {
        map[parentId].children.push(map[id]);
      } else {
        roots.push(map[id]);
      }
    });

    return roots;
  }

  const categoryTree = buildCategoryTree(categories);

  function handleChange(e) {
    inputSearch(e);
  }
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, [cartProducts]);

  return (
    <>
      <StyledHeader>
        <Toaster position="top-center" reverseOrder={false} />
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
    
            <StyledNav>
              <NavLink href={"/products"}>All products</NavLink>
              <NavLink href={"/gear-store"}>Gear Store</NavLink>
              <DropDownNew options={categories} />
            </StyledNav>
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
                  <CartNum>{cartProducts?.length}</CartNum>
                </NavCart>

                <NavButton onClick={() => setOpen((prev) => !prev)}>
                  <BarsIcon />
                </NavButton>
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
                  <CartNum>{cartProducts?.length}</CartNum>
                </NavCart>

                <NavButton onClick={() => setOpen((prev) => !prev)}>
                  <BarsIcon />
                </NavButton>
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

                      {/* Mobile side bar */}
                      <Tab.Group
                        as="div"
                        className="mt-2 overflow-scroll max-h-screen"
                      >
                        <div className="ml-4 text-lg ">
                          <Tab.Panels as={Fragment}>
                            <Tab.Panel className="space-y-1 px-4 pb-6">
                              {session && (
                                <div className="flex flex-col gap-5 border p-4 rounded-md">
                                  <Link
                                    href={"/account"}
                                    className="flex items-center gap-2 hover:bg-gray-100 rounded-md"
                                  >
                                    <ProfileInfo>
                                      <Image
                                        src={session.user.image}
                                        alt="Profile Picture"
                                        width={40}
                                        height={40}
                                        style={{ borderRadius: "50%" }}
                                      />
                                    </ProfileInfo>
                                    <div>
                                      <p className="text-md font-medium">
                                        {session.user.name}
                                      </p>
                                    </div>
                                  </Link>

                                  <div className="flex items-center gap-2 border rounded-md p-2 hover:bg-gray-100">
                                    <BiLogOut size={24} />
                                    <button onClick={() => signOut()}>
                                      Sign out
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div className="">
                                {!session && (
                                  <Link
                                    href={"/account"}
                                    className="flex gap-2 items-center p-2 border rounded-md hover:bg-gray-100"
                                  >
                                    <BiUser size={24} />
                                    <div>
                                      <button onClick={() => signIn()}>
                                        Sign in
                                      </button>
                                    </div>{" "}
                                  </Link>
                                )}
                              </div>
                              <LinkNav>
                                <Link
                                  className="flex gap-2 mt-4"
                                  href={"/"}
                                  id={`home-heading-mobile`}
                                >
                                  <BiHome size={24} />
                                  Home
                                </Link>
                              </LinkNav>
                              <LinkNav>
                                <Link
                                  className="flex gap-2 items-center"
                                  href={"/products"}
                                  id={`home-heading-mobile`}
                                >
                                  <FaCartArrowDown />
                                  All products
                                </Link>
                              </LinkNav>

                              <div className="w-full">
                                <LinkNav>
                                  <Link
                                    className="flex gap-2 items-center"
                                    href={"/categories"}
                                    id={`home-heading-mobile`}
                                  >
                                    <BiCategory size={24} />
                                    Categories
                                  </Link>
                                </LinkNav>

                                <div className="flex flex-col gap-2 items-center p-2">
                                  {categoryTree.map((parent) => (
                                    <div
                                      key={parent._id}
                                      className="w-full"
                                    >
                                      {/* Parent */}
                                      <LinkNav>
                                        <Link
                                          href={`/category/${parent._id}`}
                                          className="flex gap-2 items-center"
                                        >
                                          <MdOutlineDevices size={24} />
                                          {parent.name}
                                        </Link>
                                      </LinkNav>

                                      {/* Children */}
                                      {parent.children.length > 0 && (
                                        <div className="ml-6 mt-1 flex flex-col gap-1">
                                          {parent.children.map((child) => (
                                            <LinkNav key={child._id}>
                                              <Link
                                                href={`/category/${child._id}`}
                                                className="flex gap-2 items-center text-gray-600"
                                              >
                                                <BiCategory size={24} />{" "}
                                                {child.name}
                                              </Link>
                                            </LinkNav>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Tab.Panel>
                          </Tab.Panels>
                        </div>
                      </Tab.Group>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  );
}

const ProfileInfo = styled.div`
  padding: 10px 0;

  text-align: start;

  p {
    font-size: small;
    color: #999;
    width: 100%;
  }

  h3 {
    margin: 5px 0;
    font-size: 0.95rem;
  }
`;
const Img = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    min-width: 120px;
    color: #666;
  }
`;
const StyledHeader = styled.header`
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  padding: 10px;
    @media screen and (min-width: 1024px) {
   padding: 0;
  }
  z-index: 10;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 0.9rem;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
`;
const Logo = styled(Link)`
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  color: ${primary}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;
const StyledNav = styled.nav`
  display: none;
  white-space: nowrap;
  align-items: center;
  gap: 20px;
  margin-left: 20px;
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
  border: 1px solid #f1f1f1;
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
  width: 80%;
  color: white;
  font-weight: normal;
  z-index: 3;
  height: 40px;
  border-radius: 40px;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    order: 0;
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
  margin-left: 5px;
  width: 100%;
  outline: none;
  color: black;
  padding: 0 10px;
`;

const SearchIcon = styled(Link)`
  width: 30px;
  height: auto;
  color: gray;
`;
const LinkNav = styled.div`
  justify-content: start;

  gap: 10px;
  align-items: center;
  width: 100%;
  background-color: white;
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));

  padding: 0.5rem;

  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));

  /* Shadow */
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:focus {
    outline: none;
  }

  &:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  }
`;
