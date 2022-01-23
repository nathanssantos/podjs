/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberMask = forwardRef(function NumberMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
});

NumberMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CurrencyMask = forwardRef(function CurrencyMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      prefix="R$ "
      thousandSeparator=" "
      decimalSeparator=","
      isNumericString
      decimalScale={2}
      fixedDecimalScale
    />
  );
});

CurrencyMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PhoneMask = forwardRef(function PhoneMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="(##) #####-####"
      mask="_"
      isNumericString
    />
  );
});

PhoneMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CPFMask = forwardRef(function CPFMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="###.###.###-##"
      mask="_"
      isNumericString
    />
  );
});

CPFMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CNPJMask = forwardRef(function CNPJMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="##.###.###/####-##"
      mask="_"
      isNumericString
    />
  );
});

CNPJMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CEPMask = forwardRef(function CEPMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="#####-###"
      mask="_"
      isNumericString
    />
  );
});

CEPMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CreditCardMask = forwardRef(function CreditCardMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="#### #### #### ####"
      mask="_"
      isNumericString
    />
  );
});

CreditCardMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MonthYearMask = forwardRef(function MonthYearMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="##/##"
      mask="_"
      isNumericString
    />
  );
});

MonthYearMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CVVMask = forwardRef(function CVVMask(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.id,
            value: values.value,
          },
        });
      }}
      format="####"
      isNumericString
    />
  );
});

CVVMask.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export {
  NumberMask,
  CurrencyMask,
  PhoneMask,
  CPFMask,
  CNPJMask,
  CEPMask,
  CreditCardMask,
  MonthYearMask,
  CVVMask,
};
