import PropTypes from "prop-types";

import { StyledButton } from "./styled";

const GreenButton = ({ text, type }) => {
  return <StyledButton type={type || "text"}>{text}</StyledButton>;
};

GreenButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default GreenButton;
