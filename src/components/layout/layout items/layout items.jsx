import { Grid } from "@mui/material";

const styledBorder = "1px solid #CCCCCC";
export const LeftCol = ({ children, borderDirection }) => {
  return (
    <Grid
      item
      xs={4}
      lg={2}
      sx={
        borderDirection && {
          borderRight: styledBorder,
          [`${borderDirection}`]: styledBorder,
        }
      }
    >
      {children}
    </Grid>
  );
};

export const RightCol = ({ children, borderDirection }) => {
  return (
    <Grid
      item
      xs={8}
      lg={10}
      sx={borderDirection && { [`${borderDirection}`]: styledBorder }}
    >
      {children}
    </Grid>
  );
};
