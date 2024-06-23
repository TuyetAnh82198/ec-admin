import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledContainer = styled(Box)({
  padding: "0 0.5rem",
});
export const StyledCategory = styled("h4")({
  fontWeight: "500",
  marginBottom: "0",
});
export const StyledNavLink = styled(NavLink)({
  textDecoration: "none",
  color: "black",
  display: "flex",
  cursor: "pointer",
});
export const StyledIcon = styled("span")({
  display: "inline-block",
  marginRight: "0.25rem",
});
export const StyledTitle = styled("span")({});
export const StyledLogout = styled("div")({
  display: "flex",
  cursor: "pointer",
});
