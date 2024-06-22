import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import { LeftCol, RightCol } from "./layout items/layout items";
import { HeaderContainer, NavbarContainer } from "./styled";
import { PAGE_TITLE, NAVBAR } from "../../utils/constants";
import Navbar from "./navbar/Navbar";

const Layout = () => {
  return (
    <Box>
      <HeaderContainer container>
        <LeftCol borderDirection="borderBottom">
          <h2 style={{ textAlign: "center" }}>{PAGE_TITLE.ADMIN_PAGE}</h2>
        </LeftCol>
        <RightCol borderDirection="borderBottom"></RightCol>
      </HeaderContainer>
      <NavbarContainer container>
        <LeftCol borderDirection="borderTop">
          <Navbar items={NAVBAR} />
        </LeftCol>
        <RightCol>{Outlet}</RightCol>
      </NavbarContainer>
    </Box>
  );
};

export default Layout;
