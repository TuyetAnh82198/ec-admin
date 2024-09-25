import { TableCell } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCell = styled(TableCell)(({ theme }) => ({
  textAlign: theme.textAlign || "center",
}));

export const StyledImg = styled("img")({
  width: "5rem",
});