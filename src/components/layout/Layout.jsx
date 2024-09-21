import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import { LeftCol, RightCol } from "./layout items/layout items";
import {
  HeaderContainer,
  NavbarContainer,
  StyledTitle,
  StyledImg,
} from "./styled";
import { PAGE_TITLE, NAVBAR } from "../../utils/constants";
import Navbar from "./navbar/Navbar";
import logo from "../../assets/imgs/icon_border.jpg";

const Layout = () => {
  return (
    <Box>
      <HeaderContainer container>
        <LeftCol borderDirection="borderBottom">
          <StyledTitle>
            <StyledImg src={logo} alt="" />
            {PAGE_TITLE.ADMIN_PAGE}
          </StyledTitle>
        </LeftCol>
        <RightCol borderDirection="borderBottom"></RightCol>
      </HeaderContainer>
      <NavbarContainer container>
        <LeftCol borderDirection="borderTop">
          <Navbar items={NAVBAR} />
        </LeftCol>
        <RightCol>
          <Outlet />
        </RightCol>
      </NavbarContainer>
    </Box>
  );
};

export default Layout;
