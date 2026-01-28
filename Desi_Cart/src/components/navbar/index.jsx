import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context/index.jsx";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Shop", href: "/shop", current: false },
  { name: "Products", href: "/products", current: false },
  { name: "Support", href: "/support", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const {isAuthenticated,logout}=useAuth;
  const navigate = useNavigate();
  const ShpooingCart = () => {
    if(!isAuthenticated){
      alert("please login to access cart");
      navigate('/login');
    }else{
   navigate('/cart');
  }
}
const HandleClick = (e) => {
  navigate(e);
}
  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {/* FULL WIDTH */}
      <div className="w-full">
        {/* ALIGNED CONTENT */}
       <div className="w-full px-4">
          <div className="relative flex h-16 items-center justify-between">
            {/* MOBILE MENU BUTTON */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6 data-open:hidden" />
                <XMarkIcon className="hidden h-6 w-6 data-open:block" />
              </DisclosureButton>
            </div>

            {/* LOGO + LINKS */}
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              {/* LOGO */}
              <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <span className="material-symbols-outlined text-gray-900">
                  moped
                </span>
                DesiCart
              </div>

              {/* DESKTOP LINKS */}
              <div className="hidden sm:ml-8 sm:flex space-x-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-sm font-medium transition"
                    )}
                    onClick={()=>HandleClick(item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* SEARCH (DESKTOP) */}
              <div className="hidden md:flex items-center rounded-md border border-gray-300 px-3 py-1.5">
                <span className="material-symbols-outlined text-gray-500 text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search products"
                  className="ml-2 w-40 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>

              {/* CART */}
              <button className="relative rounded-md p-2 text-gray-700 hover:bg-gray-100" onClick={ShpooingCart}>
                <span className="material-symbols-outlined text-[22px]">
                  shopping_cart
                </span>
              </button>

              {/* NOTIFICATION */}
              <button className="rounded-md p-2 text-gray-700 hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* PROFILE */}
              <Menu as="div" className="relative">
                <MenuButton className="flex rounded-full focus:outline-none">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt=""
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                 {isAuthenticated ? (
  <>
    <MenuItem>
      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => navigate("/profile")}
      >
        Profile
      </button>
    </MenuItem>

    <MenuItem>
      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </MenuItem>
  </>
) : (
  <MenuItem>
    <button
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
  </MenuItem>
)}

                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <DisclosurePanel className="sm:hidden bg-white border-t border-gray-200">
          {/* MOBILE SEARCH */}
          <div className="px-3 pt-3">
            <div className="flex items-center rounded-md border border-gray-300 px-3 py-2">
              <span className="material-symbols-outlined text-gray-500">
                search
              </span>
              <input
                type="text"
                placeholder="Search products"
                className="ml-2 w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* MOBILE LINKS */}
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Transition>
    </Disclosure>
  );
}
