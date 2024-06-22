import { useState, useRef } from "react";
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
  StyledImgCategory,
  StyledUpload,
  StyledSelect,
  StyledUploaded,
  StyledImgContainer,
  StyledImg,
} from "./styled";
import { API } from "../../utils/constants";

const AddProduct = () => {
  // console.log(API.PRODUCTS.ADD);
  const inputFields = ["Name", "Price", "Description"];
  const [inputErrs, setInputErrs] = useState(
    Array(inputFields.length).fill({ helperText: "", isErr: false })
  );
  const [categories, setCategories] = useState([
    "Earrings",
    "Necklaces",
    "Bangles",
    "Rings",
    "Bracelets",
    "Charms",
  ]);
  const [imageURLs, setImageURLs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Earrings");
  const [inputs, setInputs] = useState({
    Name: "",
    Price: "",
    Description: "",
  });
  const imgInput = useRef();

  const handleInputs = (e, field) => {
    setInputs((prevInputs) => {
      return { ...prevInputs, [field]: e.target.value };
    });
  };

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    const urls = [];
    const maxUploadImgs = 3;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === maxUploadImgs) {
          setImageURLs(urls);
        }
      };
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("Name", inputs.Name);
    formData.append("Price", inputs.Price);
    formData.append("Description", inputs.Description);
    formData.append("Category", selectedCategory);
    for (let i = 0; i < 3; i++) {
      formData.append("imgs", imgInput.current.files[i], `file${i}`);
    }
    console.log(formData);
    // fetch(`${process.env.REACT_APP_BACKEND}/products/add`, {
    //   method: "POST",
    //   credentials: "include",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (!data.err) {
    //       if (data.message === "Added!") {
    //         alert("Added!");
    //         navigate("/products");
    //       }
    //     } else {
    //       navigate("/server-error");
    //     }
    //   })
    //   .catch((err) => console.log(err));
    // }
  };

  return (
    <StyledContainer>
      <StyledForm sx={{ width: { xs: "100%", md: "40%" } }}>
        <form onSubmit={submitForm} encType="multipart/form-data">
          <h3>Add a product</h3>
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
          <StyledImgCategory container spacing={2}>
            <StyledUpload item xs={6}>
              <FormControl fullWidth>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  name="imgs"
                  onChange={handleUpload}
                  required
                  ref={imgInput}
                />
                <FormHelperText>Upload images (3 images)</FormHelperText>
              </FormControl>
            </StyledUpload>
            <StyledSelect item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="select-category">Category</InputLabel>
                <Select
                  labelId="select-category"
                  value={selectedCategory}
                  label="Category"
                  onChange={handleSelectCategory}
                  name="Category"
                >
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledSelect>
          </StyledImgCategory>
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
            <Button variant="text">Reset</Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginLeft: "0.5rem" }}
            >
              Add product
            </Button>
          </Box>
        </form>
      </StyledForm>
    </StyledContainer>
  );
};

export default AddProduct;
