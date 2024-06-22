import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
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
  display: "block",
  cursor: "pointer",
});