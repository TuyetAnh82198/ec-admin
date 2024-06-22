import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Box)({
  padding: "1rem",
  display: "flex",
  justifyContent: "space-around",
});
export const StyledForm = styled(Box)({});
export const StyledImgCategory = styled(Grid)({});
export const StyledUpload = styled(Grid)({});
export const StyledSelect = styled(Grid)({});
export const StyledUploaded = styled(Grid)({
  margin: "0.5rem 0",
});
export const StyledImgContainer = styled(Grid)({});
export const StyledImg = styled("img")({
  width: "100%",
  height: "150px",
  objectFit: "cover",
});
