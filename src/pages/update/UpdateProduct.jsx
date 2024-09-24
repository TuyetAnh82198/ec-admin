import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import {
  StyledContainer,
  StyledForm,
  StyledImgBrand,
  StyledUpload,
  StyledSelect,
  StyledUploaded,
  StyledImgContainer,
  StyledImg,
} from "./styled";
import {
  API,
  PAGE_TITLE,
  COLOR,
  PAGE_PATH,
  LOCAL_STORAGE,
} from "../../utils/constants";
import fetchLogin from "../../utils/fetchLogin";
import handlePrice from "../../utils/handlePrice";
import GreenButton from "../../components/button/GreenBtn";
import CircularProgress from "../../components/circularProgress/CircularProgress";
import fetchProducts from "../../utils/fetchProducts";

const UpdateProduct = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        setIsLoggedIn(loggedInState);
      })
      .catch((err) => {
        navigate(PAGE_PATH.LOGIN);
      });
  }, []);

  const params = useParams();
  const id = params.id;
  const [endpoint, setEndpoint] = useState(API.PRODUCTS.GET.DETAIL + id + "/1");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const inputFields = ["Name", "Price", "Description"];
  const [inputErrs, setInputErrs] = useState(
    Array(inputFields.length).fill({ helperText: "", isErr: false })
  );
  const [brands, setBrands] = useState(["ST", "ST25"]);
  const [imageURLs, setImageURLs] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);
  const [inputs, setInputs] = useState({
    Name: "",
    Price: "",
    Description: "",
  });
  const imgInput = useRef();
  const [isUpImgRequired, setIsUpImgRequired] = useState(true);

  const fetchPd = useCallback(() => {
    return fetchProducts(endpoint, setIsLoading);
  }, [endpoint]);

  useEffect(() => {
    setIsLoading(true);
    setIsErr(false);
    fetchPd()
      .then((data) => {
        const product = data.products;
        setInputs({
          Name: product.name,
          Price: product.price,
          Description: product.desc,
        });
        setSelectedBrand(product.brand);
        setImageURLs(
          product.imgs.map((path) => process.env.REACT_APP_SERVER + "/" + path)
        );
        setIsUpImgRequired(false);
      })
      .catch((err) => {
        setIsErr(true);
      });
  }, []);

  const formatPrice = (value) => {
    const number = parseInt(value.replace(/[^\d]/g, ""));
    if (number) {
      return handlePrice(number);
    }
    return value;
  };
  const handleInputs = (e, field) => {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [field]:
          field === "Price" ? formatPrice(e.target.value) : e.target.value,
      };
    });
  };

  const handleSelectBrand = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    const urls = [];
    // const maxUploadImgs = 3;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        urls.push(reader.result);
        setImageURLs(urls);
      };
    }
  };

  let inValidName, inValidPrice, inValidDesc;
  const handleInputErr = (index, message, boolean) => {
    setInputErrs((prev) => {
      const newInputErrs = [...prev];
      newInputErrs[index] = {
        helperText: message,
        isErr: boolean,
      };
      return newInputErrs;
    });
    if (index === 0) {
      inValidName = boolean;
    }
    if (index === 1) {
      inValidPrice = boolean;
    }
    if (index === 2) {
      inValidDesc = boolean;
    }
  };

  const handleReset = () => {
    setInputErrs(
      Array(inputFields.length).fill({ helperText: "", isErr: false })
    );
    setInputs((prev) => {
      return { ...prev, Name: "", Price: "", Description: "" };
    });
    setSelectedBrand(brands[0]);
    imgInput.current.value = "";
    imgInput.current.files = null;
    setImageURLs([]);
    setIsUpImgRequired(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { Name, Price, Description } = inputs;
    if (Name.trim().length === 0) {
      handleInputErr(0, "Please enter a valid name", true);
    } else {
      handleInputErr(0, "", false);
    }
    if (isNaN(Price)) {
      handleInputErr(1, "Please enter a valid price", true);
    } else {
      handleInputErr(1, "", false);
    }
    if (Description.trim().length === 0) {
      handleInputErr(2, "Description cannot be empty", true);
    } else {
      handleInputErr(2, "", false);
    }
    if (!inValidName && !inValidPrice && !inValidDesc) {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Price", Price);
      formData.append("Description", Description);
      formData.append("Brand", selectedBrand);
      formData.append("token", localStorage.getItem(LOCAL_STORAGE.TOKEN));
      if (imgInput.current.files[0]) {
        for (let i = 0; i < 3; i++) {
          if (imgInput.current.files[i]) {
            formData.append("imgs", imgInput.current.files[i], `file${i}`);
          } else {
            break;
          }
        }
      }
      const fetchUrl = process.env.REACT_APP_SERVER + API.PRODUCTS.UPDATE + id;
      const fetchObject = {
        method: "POST",
        credentials: "include",
        body: formData,
      };
      fetch(fetchUrl, fetchObject)
        .then((response) => response.json())
        .then((data) => {
          if (!data.err) {
            if (data.msg === "Updated!") {
              alert("Updated!");
              navigate(PAGE_PATH.PRODUCTS.VIEW);
            }
          } else {
            navigate("/server-error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {isLoggedIn && (
        <StyledContainer>
          <StyledForm sx={{ width: { xs: "100%", md: "40%" } }}>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <Box display="flex">
                <h3>{PAGE_TITLE.UPDATE}</h3>
                {isLoading && !isErr && <CircularProgress />}
              </Box>
              {inputFields.map((field, i) => (
                <TextField
                  key={i}
                  id={field}
                  label={field}
                  name={field}
                  variant="outlined"
                  fullWidth
                  error={inputErrs[i].isErr}
                  helperText={inputErrs[i].helperText}
                  sx={{ marginBottom: "0.5rem" }}
                  multiline
                  rows={field === "Description" ? 3 : 1}
                  required
                  value={inputs[field]}
                  onChange={(e) => handleInputs(e, field)}
                />
              ))}
              <StyledImgBrand container spacing={2}>
                <StyledUpload item xs={6}>
                  <FormControl fullWidth>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      multiple
                      name="imgs"
                      onChange={handleUpload}
                      required={isUpImgRequired}
                      ref={imgInput}
                    />
                    <FormHelperText>
                      Upload images (Up to 3 images)
                    </FormHelperText>
                  </FormControl>
                </StyledUpload>
                <StyledSelect item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-brand">Brand</InputLabel>
                    <Select
                      labelId="select-brand"
                      value={selectedBrand}
                      label="Brand"
                      onChange={handleSelectBrand}
                      name="Brand"
                    >
                      {brands.map((brand, i) => (
                        <MenuItem key={i} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledSelect>
              </StyledImgBrand>
              {imageURLs.length > 0 && (
                <StyledUploaded container spacing={2}>
                  {imageURLs.map((url, i) => (
                    <StyledImgContainer item key={i} xs={4}>
                      <StyledImg src={url} alt="" />
                    </StyledImgContainer>
                  ))}
                </StyledUploaded>
              )}
              <Box sx={{ margin: "1rem 0" }}>
                <Button
                  sx={{ marginRight: "0.5rem", color: COLOR.DARK_GREEN }}
                  variant="text"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <GreenButton type="submit" text="Add product" />
              </Box>
            </form>
          </StyledForm>
        </StyledContainer>
      )}
    </>
  );
};

export default UpdateProduct;
