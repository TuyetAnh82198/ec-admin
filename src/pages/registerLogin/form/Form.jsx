import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import { StyledForm, StyledContainer } from "./styled";
import { API } from "../../../utils/constants";
import CirProgress from "../../../components/layout/circularProgress/CircularProgress";

const Form = ({ pageTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState(["Email", "Password"]);
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  useEffect(() => {
    if (pageTitle === "Register") {
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
    let fetchObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (pageTitle === "Register") {
      body = {
        ...body,
        Fullname: inputs.Fullname,
        Phone: inputs.Phone,
        role: "admin",
      };
    }
    if (pageTitle === "Login") {
      fetchObject = { ...fetchObject, credentials: "include" };
    }

    setIsLoading(true);
    fetch(fetchUrl, fetchObject)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (!data.err) {
          if (data.errs) {
            alert(data.errs);
          } else if (data.msg === "User existing!") {
            alert("User existing!");
          } else if (data.msg === "Wrong email or password!") {
            alert("Wrong email or password!");
          } else if (data.msg === "Created!") {
            alert(`${pageTitle} Success!`);
            if (pageTitle === "Register") {
              navigate("/login");
            } else {
              navigate("/");
              window.location.reload();
            }
          }
        } else {
          navigate("/server-error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {isLoading && <CirProgress />}
      <StyledContainer>
        <StyledForm sx={{ width: { xs: "100%", md: "40%" } }}>
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
            <Button type="submit" variant="contained">
              {pageTitle}
            </Button>
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
