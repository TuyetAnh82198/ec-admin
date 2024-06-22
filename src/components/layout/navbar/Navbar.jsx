import PropTypes from "prop-types";

import { StyledContainer, StyledCategory, StyledNavLink } from "./styled";

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
                  <StyledNavLink key={subIndex}>
                    <span>{subItem[subCategory].ICON} </span>
                    <span>{subItem[subCategory].TITLE}</span>
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
