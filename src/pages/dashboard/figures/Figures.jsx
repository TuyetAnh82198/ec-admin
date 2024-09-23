import { Box, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";
import WalletIcon from "@mui/icons-material/Wallet";

import handlePrice from "../../../utils/handlePrice";

const Figures = ({ users, newOrders, earningsOfMonth, totalEarnings }) => {
  const titles = ["USERS", "NEW ORDERS", "EARNINGS OF MONTH", "TOTAL EARNINGS"];
  const data = [
    users,
    newOrders,
    `${handlePrice(earningsOfMonth)}đ`,
    `${handlePrice(totalEarnings)}đ`,
  ];
  const icons = [
    <PersonIcon />,
    <ShoppingCartIcon />,
    <PaidIcon />,
    <WalletIcon />,
  ];
  const colors = ["red", "#deaf3f", "#0c810b", "#8f278f"];

  //style
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  const styledTitle = { color: "gray", margin: "0" };
  const styledIcon = (index) => {
    return {
      textAlign: "right",
      marginTop: "2rem",
      color: colors[index],
    };
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {titles.map((t, i) => (
          <Grid sx={{ padding: "0.5rem" }} key={i} item xs={12} md={3}>
            <Item>
              <Box>
                <p style={styledTitle}>{t}</p>
                <h2>{data[i]}</h2>
              </Box>
              <Box sx={styledIcon(i)}>{icons[i]}</Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

Figures.propTypes = {
  users: PropTypes.number,
  newOrders: PropTypes.number,
  earningsOfMonth: PropTypes.number,
  totalEarnings: PropTypes.number,
};
export default Figures;
