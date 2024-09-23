import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";

export const SOCKET = {
  PRODUCTS: {
    TITLE: "products",
    DELETE: "delete",
  },
};

export const LOCAL_STORAGE = {
  TOKEN: "noneFirefox",
};

export const COLOR = {
  MAIN_GREEN: "#469E02",
  DARK_GREEN: "#3D8A00",
};

export const PAGE_TITLE = {
  ADMIN_PAGE: "Admin Page",
  ADD: "Add a product",
  UPDATE: "Update product",
  REGISTER: "Register",
  LOGIN: "Login",
};

export const PAGE_PATH = {
  HOMEPAGE: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  CHAT: "/chat",
  PRODUCTS: {
    VIEW: "/products",
    ADD: "/products/add",
  },
  SERVER_ERROR: "/server-error",
  HISTORY_DETAIL: "/history-detail/:id",
};

export const NAVBAR = [
  {
    MAIN: [
      {
        DASHBOARD: {
          PATH: PAGE_PATH.HOMEPAGE,
          TITLE: "Dashboard",
          ICON: <DashboardIcon fontSize="small" />,
        },
      },
      {
        CHAT: {
          PATH: PAGE_PATH.CHAT,
          TITLE: "Chat",
          ICON: <ChatIcon fontSize="small" />,
        },
      },
    ],
  },
  {
    LISTS: [
      {
        PRODUCTS: {
          PATH: PAGE_PATH.PRODUCTS.VIEW,
          TITLE: "Products",
          ICON: <ShoppingBagIcon fontSize="small" />,
        },
      },
    ],
  },
  {
    NEW: [
      {
        ADD_PRODUCT: {
          PATH: PAGE_PATH.PRODUCTS.ADD,
          TITLE: "Add a product",
          ICON: <PlaylistAddIcon fontSize="small" />,
        },
      },
    ],
  },
  {
    USER: [
      {
        LOGOUT: {
          TITLE: "Logout",
          ICON: <LogoutIcon fontSize="small" />,
        },
      },
      {
        REGISTER: {
          PATH: PAGE_PATH.REGISTER,
          TITLE: "Register",
          ICON: <HowToRegIcon fontSize="small" />,
        },
      },
      {
        LOGIN: {
          PATH: PAGE_PATH.LOGIN,
          TITLE: "Login",
          ICON: <LoginIcon fontSize="small" />,
        },
      },
    ],
  },
];
const PRODUCTS_PATH = "/products";
const PRODUCTS_PATH_GET = `${PRODUCTS_PATH}/get`;
const USER_PATH = "/user";
const CART_PATH = "/cart";
export const API = {
  PRODUCTS: {
    ADD: `${PRODUCTS_PATH}/add`,
    GET: {
      DETAIL: `${PRODUCTS_PATH_GET}/`,
    },
    DELETE: `${PRODUCTS_PATH}/delete`,
  },
  USER: {
    REGISTER: `${USER_PATH}/register`,
    LOGIN: `${USER_PATH}/login`,
    CHECK_LOGIN: `${USER_PATH}/check-login`,
    LOGOUT: `${USER_PATH}/logout`,
  },
  CART: {
    GET: `${CART_PATH}/get`,
    HISTORY_DETAIL: `${CART_PATH}/history-detail/`,
  },
};

export const RESPONSE_MESSAGES = {
  REGISTER: {
    SUCCESS: "Created!",
    USER_EXISTING: "User existing!",
  },
  LOGIN: {
    SUCCESS: "You are logged in",
    FAIL: "Wrong email or password!",
    NOT_LOGIN: "have not been logged in yet",
  },
  LOGOUT: {
    SUCCESS: "You are logged out!",
  },
};
