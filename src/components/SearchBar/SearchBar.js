import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import { Input, Button } from "..";

import { searchBarFormDefinitions } from "../../constants/FormDefinitions";

import { SearchIcon } from "../svg";

import "./styles.scss";

const SearchBar = (props) => {
  const {
    placeholder,
    requesting,
    onChangeText,
    onSubmitSearch,
  } = props;

  const { initialValues, validationSchema } = searchBarFormDefinitions;

  const onSubmit = (formValues) => {
    if (new Date(formValues.date) instanceof Date) {
      onSubmitSearch(formValues);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    onChangeText(formik.values.text);
  }, [formik.values.text]);

  return (
    <form className="search-bar" noValidate onSubmit={formik.handleSubmit}>
      <Input
        id="text"
        placeholder={placeholder}
        variant="filled"
        value={formik.values.text}
        onChange={formik.handleChange}
      />
      <Button variant="contained" type="submit" loading={requesting}>
        <SearchIcon color="#000" />
      </Button>
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  requesting: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmitSearch: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  placeholder: "Podcast name",
  requesting: false,
  onChangeText: () => "",
};

export default SearchBar;
