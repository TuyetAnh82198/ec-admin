import PropTypes from "prop-types";
import { TableRow } from "@mui/material";

import Tbl from "../../../components/table/Table";
import { StyledCell } from "../../../components/table/styled";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import handlePrice from "../../../utils/handlePrice";
import handleDate from "../../../utils/handleDate";
import { StyledButton } from "../../../components/button/styled";

const Invoices = ({ items, handleView }) => {
  const titles = [
    "ID ORDER",
    "EMAIL",
    "NAME",
    "PHONE",
    "ADDRESS",
    "TOTAL",
    "DELIVERY",
    "ORDER DATE",
    "STATUS",
    "PAYMENT DATE",
    "DETAIL",
  ];
  return (
    <Tbl titles={titles}>
      {items.map((item) => (
        <TableRow key={item._id}>
          <StyledCell>{item._id}</StyledCell>
          <StyledCell>{item.user.email}</StyledCell>
          <StyledCell>{item.user.fullName}</StyledCell>
          <StyledCell>{item.user.phone}</StyledCell>
          <StyledCell>{item.user.address}</StyledCell>
          <StyledCell>{handlePrice(item.totalAmount)}đ</StyledCell>
          <StyledCell>Waiting for progressing</StyledCell>
          <StyledCell>{handleDate(item.orderDate)}</StyledCell>
          <StyledCell>{item.status}</StyledCell>
          <StyledCell>{handleDate(item.paymentDate)}</StyledCell>
          <StyledCell>
            <StyledButton onClick={() => handleView(item._id)}>
              View
              <ArrowRightIcon />
            </StyledButton>
          </StyledCell>
        </TableRow>
      ))}
    </Tbl>
  );
};

Invoices.propTypes = {
  items: PropTypes.array,
  handleView: PropTypes.func,
};
export default Invoices;
