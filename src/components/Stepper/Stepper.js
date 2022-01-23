import React from 'react';
import PropTypes from 'prop-types';
import { Stepper as MUIStepper, Step, StepLabel } from '@material-ui/core';

import './styles.scss';

const Stepper = (props) => {
  const { steps, activeStep } = props;

  const stepperClassNames = () => {
    let classNames = 'stepper';
    return classNames;
  };

  if (!steps?.length) return null;

  return (
    <div className={stepperClassNames()}>
      <MUIStepper activeStep={activeStep}>
        {steps.map(({ label, completed, error }) => (
          <Step key={label} completed={completed}>
            <StepLabel error={error}>{label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      error: PropTypes.bool,
    }),
  ),
  activeStep: PropTypes.number,
};

Stepper.defaultProps = {
  steps: [],
  activeStep: 1,
};

export default Stepper;
