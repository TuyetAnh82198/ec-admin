export const PAGE_TITLE = {
  ADMIN_PAGE: "Admin Page",
  ADD: "Add a product",
  UPDATE: "Update product",
  REGISTER: "Register",
  LOGIN: "Login",
};
export const NAVBAR = [
  {
    MAIN: [
      {
        DASHBOARD: {
          TITLE: "Dashboard",
          ICON: "Z",
        },
      },
      {
        CHAT: {
          TITLE: "Chat",
          ICON: "Z",
        },
      },
    ],
  },
  {
    LISTS: [
      {
        PRODUCTS: {
          TITLE: "Products",
          ICON: "Z",
        },
      },
    ],
  },
  {
    NEW: [
      {
        ADD_PRODUCT: {
          TITLE: "Add a product",
          ICON: "Z",
        },
      },
    ],
  },
  {
    USER: [
      {
        LOGOUT: {
          TITLE: "Logout",
          ICON: "Z",
        },
      },
    ],
  },
];
const PRODUCTS_PATH = "/products";
const USER_PATH = "/user";
export const API = {
  PRODUCTS: {
    ADD: `${PRODUCTS_PATH}/add`,
  },
  USER: {
    REGISTER: `${USER_PATH}/register`,
  },
};
