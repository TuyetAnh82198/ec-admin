import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import { StyledForm, StyledContainer } from "./styled";
import { API, PAGE_TITLE } from "../../../utils/constants";
import CirProgress from "../../../components/layout/circularProgress/CircularProgress";
import handleResponse from "../../../utils/handleResponse";
import handleNavigate from "../../../utils/handleNavigate";
import GreenButton from "../../../components/button/GreenBtn";

const Form = ({ pageTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [inputFields, setInputFields] = useState(["Email", "Password"]);
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  useEffect(() => {
    if (pageTitle === PAGE_TITLE.REGISTER) {
      setInputFields((prev) => {
        return [...prev, "Fullname", "Phone"];
      });
      setInputs((prev) => {
        return { ...prev, Fullname: "", Phone: "" };
      });
    }
  }, []);

  const handleInputs = (e, field) => {
    setInputs((prevInputs) => {
      return { ...prevInputs, [field]: e.target.value };
    });
  };

  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    const fetchUrl =
      process.env.REACT_APP_SERVER + API.USER[pageTitle.toUpperCase()];

    let body = {
      Email: inputs.Email,
      Password: inputs.Password,
    };
    let headers = {
      "Content-Type": "application/json",
    };
    const isFirefox = navigator.userAgent.includes("Firefox");

    if (pageTitle === PAGE_TITLE.REGISTER) {
      body = {
        ...body,
        Fullname: inputs.Fullname,
        Phone: inputs.Phone,
        role: "admin",
      };
    }

    let fetchObject = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    if (pageTitle === PAGE_TITLE.LOGIN) {
      fetchObject = {
        ...fetchObject,
        headers: {
          ...headers,
          "X-Browser": isFirefox ? "Firefox" : "Non-Firefox",
        },
        credentials: "include",
      };
    }

    setIsLoading(true);
    setIsErr(false);
    fetch(fetchUrl, fetchObject)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (!data.err) {
          handleResponse(data, pageTitle, navigate);
        } else {
          handleNavigate.serverErr(navigate);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsErr(true);
      });
  };
  return (
    <>
      {isLoading && !isErr && <CirProgress />}
      <StyledContainer>
        <StyledForm sx={{ width: { xs: "100%", md: "40%", lg: "30%" } }}>
          <form onSubmit={submitForm}>
            <h3>{pageTitle}</h3>
            {inputFields.map((field, i) => (
              <TextField
                key={i}
                id={field}
                type={field === "Password" ? "password" : "text"}
                label={field}
                name={field}
                variant="outlined"
                fullWidth
                sx={{
                  marginBottom:
                    i === inputFields.length - 1 ? "1rem" : "0.5rem",
                }}
                required
                value={inputs[field]}
                onChange={(e) => handleInputs(e, field)}
              />
            ))}
            <GreenButton type="submit" text={pageTitle} />
          </form>
        </StyledForm>
      </StyledContainer>
    </>
  );
};

Form.propTypes = {
  pageTitle: PropTypes.string,
};
export default Form;
