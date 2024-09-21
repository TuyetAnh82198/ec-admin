import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const HeaderContainer = styled(Grid)({});
export const NavbarContainer = styled(Grid)({ minHeight: "100vh" });
export const StyledTitle = styled("h2")({
  display: "flex",
  alignItems: "center",
  padding: "0 0.5rem",
  fontSize: "1.4rem",
});
export const StyledImg = styled("img")({
  width: "2rem",
  height: "2rem",
  marginRight: "0.5rem",
});
