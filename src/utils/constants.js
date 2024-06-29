import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import WatchIcon from "@mui/icons-material/Watch";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";

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
          PATH: "/",
          TITLE: "Dashboard",
          ICON: <DashboardIcon fontSize="small" />,
        },
      },
      {
        CHAT: {
          PATH: "/chat",
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
          PATH: "/products",
          TITLE: "Products",
          ICON: <WatchIcon fontSize="small" />,
        },
      },
    ],
  },
  {
    NEW: [
      {
        ADD_PRODUCT: {
          PATH: "/product/add",
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
          PATH: "/register",
          TITLE: "Register",
          ICON: <HowToRegIcon fontSize="small" />,
        },
      },
      {
        LOGIN: {
          PATH: "/login",
          TITLE: "Login",
          ICON: <LoginIcon fontSize="small" />,
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
    LOGIN: `${USER_PATH}/login`,
    CHECK_LOGIN: `${USER_PATH}/check-login`,
    LOGOUT: `${USER_PATH}/logout`,
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
