import { Box } from "@mui/material";
import PropTypes from "prop-types";

const Page = ({ title, content }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <h2>{title}</h2>
        <p>{content}</p>
      </Box>
    </Box>
  );
};

Page.proTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
export default Page;
