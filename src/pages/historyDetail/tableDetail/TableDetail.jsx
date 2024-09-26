import { TableRow } from "@mui/material";
import PropTypes from "prop-types";

import Tbl from "../../../components/table/Table";
import { StyledCell } from "../../../components/table/styled";
import handlePrice from "../../../utils/handlePrice";

const TableDetail = ({ products }) => {
  const titles = ["ID PRODUCT", "IMAGE", "NAME", "PRICE", "COUNT"];
  return (
    <Tbl titles={titles}>
      {products.map((p) => (
        <TableRow key={p._id}>
          <StyledCell>{p.productId._id}</StyledCell>
          <StyledCell>
            <img
              style={{ width: "5rem" }}
              src={process.env.REACT_APP_SERVER + "/" + p.productId.imgs[0]}
              alt=""
            />
          </StyledCell>
          <StyledCell theme={{ textAlign: "left" }}>
            {p.productId.name}
          </StyledCell>
          <StyledCell>{handlePrice(p.productId.price)} đ</StyledCell>
          <StyledCell>{p.quan}</StyledCell>
        </TableRow>
      ))}
    </Tbl>
  );
};

TableDetail.propTypes = {
  products: PropTypes.array,
};
export default TableDetail;
