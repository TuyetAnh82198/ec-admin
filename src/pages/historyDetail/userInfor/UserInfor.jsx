import { Box } from "@mui/material";
import PropTypes from "prop-types";

import handlePrice from "../../../utils/handlePrice";

const UserInfor = ({ user, totalAmount }) => {
  return (
    <Box sx={{ color: "gray" }}>
      <p>ID User: {user?._id}</p>
      <p>Full Name: {user?.fullName}</p>
      <p>Phone: {user?.phone}</p>
      <p>Address: {user?.address}</p>
      <p>Total: {handlePrice(totalAmount)}đ</p>
    </Box>
  );
};

UserInfor.propTypes = {
  user: PropTypes.object,
  totalAmount: PropTypes.number,
};
export default UserInfor;
