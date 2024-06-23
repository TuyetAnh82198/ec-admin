import PropTypes from "prop-types";

import {
  StyledContainer,
  StyledCategory,
  StyledNavLink,
  StyledIcon,
  StyledTitle,
} from "./styled";

const Navbar = ({ items }) => {
  return (
    <div>
      {items.length > 0 &&
        items.map((item, index) => {
          const category = Object.keys(item)[0];
          return (
            <StyledContainer key={index}>
              <StyledCategory>{category}</StyledCategory>
              {item[category].map((subItem, subIndex) => {
                const subCategory = Object.keys(subItem)[0];
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
