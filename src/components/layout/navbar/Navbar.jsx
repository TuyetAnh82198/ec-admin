import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  StyledContainer,
  StyledCategory,
  StyledNavLink,
  StyledIcon,
  StyledTitle,
  StyledLogout,
} from "./styled";
import fetchLogin from "../../../utils/fetchLogin";
import { API, RESPONSE_MESSAGES, PAGE_PATH } from "../../../utils/constants";

const Navbar = ({ items }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        setIsLoggedIn(loggedInState);
      })
      .catch((err) => {});
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    const fetchUrl = process.env.REACT_APP_SERVER + API.USER.LOGOUT;
    const fetchObj = {
      method: "GET",
      credentials: "include",
    };
    fetch(fetchUrl, fetchObj)
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === RESPONSE_MESSAGES.LOGOUT.SUCCESS) {
          //deployed by a public suffix
          const noneFirefox = "noneFirefox";
          localStorage.removeItem(noneFirefox);
          //
          alert(RESPONSE_MESSAGES.LOGOUT.SUCCESS);
          navigate(PAGE_PATH.LOGIN);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {items.length > 0 &&
        items.map((item, index) => {
          const category = Object.keys(item)[0];
          return (
            <StyledContainer key={index}>
              <StyledCategory>{category}</StyledCategory>
              {item[category]
                .filter((subItem) =>
                  isLoggedIn
                    ? !subItem.hasOwnProperty("REGISTER") &&
                      !subItem.hasOwnProperty("LOGIN")
                    : !subItem.hasOwnProperty("LOGOUT")
                )
                .map((subItem, subIndex) => {
                  const subCategory = Object.keys(subItem)[0];
                  if (subCategory === "LOGOUT") {
                    return (
                      <StyledLogout key={subIndex} onClick={handleLogout}>
                        <StyledIcon>{subItem[subCategory].ICON}</StyledIcon>
                        <StyledTitle>{subItem[subCategory].TITLE}</StyledTitle>
                      </StyledLogout>
                    );
                  }
                  return (
                    <StyledNavLink
                      to={subItem[subCategory].PATH}
                      key={subIndex}
                      style={({ isActive }) => {
                        return { backgroundColor: isActive && "#F5F5F5" };
                      }}
                    >
                      <StyledIcon>{subItem[subCategory].ICON}</StyledIcon>
                      <StyledTitle>{subItem[subCategory].TITLE}</StyledTitle>
                    </StyledNavLink>
                  );
                })}
            </StyledContainer>
          );
        })}
    </div>
  );
};
Navbar.propTypes = {
  items: PropTypes.array,
};
export default Navbar;
