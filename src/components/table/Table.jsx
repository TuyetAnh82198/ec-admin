import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import { StyledCell } from "./styled";

const Tbl = ({ titles, children }) => {
  const styledDeleteBtn = {
    cursor: "pointer",
    color: "gray",
    textAlign: "center",
  };
  const cursor = { cursor: "pointer" };
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
          <TableBody>{children}</TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

Tbl.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Tbl;
