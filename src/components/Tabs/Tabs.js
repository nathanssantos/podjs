import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabs as MUITabs, Tab } from "@material-ui/core";

import "./styles.scss";

const Tabs = (props) => {
  const { tabs, value, onChange } = props;
  const [_value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsClassName = () => {
    let classNames = "tabs";
    return classNames;
  };

  useEffect(() => {
    onChange(_value);
  }, [_value]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <MUITabs
      className={tabsClassName()}
      value={_value}
      onChange={handleChange}
      variant="scrollable"
      indicatorColor="primary"
      textColor="primary"
    >
      {tabs.map(({ label, disabled }) => (
        <Tab key={label} label={label} disabled={disabled} />
      ))}
    </MUITabs>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  tabs: [],
  value: 0,
  onChange: () => "",
};
export default Tabs;
