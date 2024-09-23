import PropTypes from "prop-types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  StyledContainer,
  StyledButtons,
  StyledButton,
  StyledPage,
  StyledContent,
} from "./styled";

const Pagination = ({ page, totalPage, handleNext, handlePrev }) => {
  return (
    <StyledContainer>
      <StyledButtons>
        <StyledButton onClick={handlePrev}>
          <ChevronLeftIcon />
        </StyledButton>
        <StyledPage>{page}</StyledPage>
        <StyledButton onClick={handleNext}>
          <ChevronRightIcon />
        </StyledButton>
      </StyledButtons>
      <StyledContent>Showing 1-6 of {totalPage} results</StyledContent>
    </StyledContainer>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalPage: PropTypes.number,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};
export default Pagination;
