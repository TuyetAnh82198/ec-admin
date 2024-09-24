import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Checkbox,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { StyledCell, StyledImg } from "./styled";
import handlePrice from "../../utils/handlePrice";
import { COLOR } from "../../utils/constants";

const ProductList = ({ products, handleUpdate, handleDelete, handleCheck }) => {
  const titles = [
    "REMOVE MANY",
    "IMAGE",
    "NAME",
    "PRICE",
    "TYPE",
    "STOCK",
    "EDIT",
    "REMOVE",
  ];

  const styledBtn = (type) => {
    return {
      cursor: "pointer",
      color: type === "edit" ? COLOR.DARK_GREEN : "gray",
      textAlign: "center",
    };
  };

  return (
    <TableContainer sx={{ overflow: "auto" }} component={Paper}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {titles.map((t, i) => (
                <StyledCell sx={{ fontWeight: "bold" }} key={i}>
                  {t}
                </StyledCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <StyledCell>
                  <Checkbox onClick={() => handleCheck(p._id)} />
                </StyledCell>
                <StyledCell>
                  <StyledImg
                    src={`${process.env.REACT_APP_SERVER}/${p.imgs[0]}`}
                    alt=""
                  />
                </StyledCell>
                <StyledCell theme={{ textAlign: "left" }}>{p.name}</StyledCell>
                <StyledCell>{handlePrice(p.price)}đ</StyledCell>
                <StyledCell>{p.brand}</StyledCell>
                <StyledCell>{p.stock}</StyledCell>
                <StyledCell sx={styledBtn("edit")}>
                  <EditIcon onClick={() => handleUpdate(p._id)} />
                </StyledCell>
                <StyledCell sx={styledBtn("delete")}>
                  <DeleteIcon onClick={() => handleDelete({ id: p._id })} />
                </StyledCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleCheck: PropTypes.func,
};
export default ProductList;
