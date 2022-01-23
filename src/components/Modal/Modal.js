import React from "react";
import PropTypes from "prop-types";
import { Modal as MUIModal, Backdrop, Fade } from "@material-ui/core";

import { Button } from "..";
import { CloseIcon } from "../svg";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const Modal = (props) => {
  const {
    children,
    open,
    persistent,
    btCancelText,
    btCancelVariant,
    btCancelColor,
    btCancelStartIcon,
    btCancelEndIcon,
    btConfirmText,
    btConfirmVariant,
    btConfirmColor,
    btConfirmStartIcon,
    btConfirmEndIcon,
    showBtCancel,
    showBtConfirm,
    showBtClose,
    rounded,
    className,
    onCancel,
    onConfirm,
  } = props;

  const getModalClassNames = () => {
    let newClassNames = "modal";
    if (className?.length) newClassNames += ` ${className}`;
    if (rounded) newClassNames += " modal--rounded";
    return newClassNames;
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <MUIModal
      className={getModalClassNames()}
      open={open}
      onClose={persistent ? null : handleCancel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 250,
      }}
    >
      <Fade in={open}>
        <div className="modal__paper">
          {showBtClose ? (
            <div className="modal__bt-close">
              <Button onClick={handleCancel}>
                <CloseIcon size={24} color={Theme.light87} />
              </Button>
            </div>
          ) : null}
          <div className="modal__content">{children}</div>
          {showBtCancel || showBtConfirm ? (
            <div className="modal__actions">
              {showBtCancel ? (
                <Button
                  className="bt-cancel"
                  variant={btCancelVariant}
                  color={btCancelColor}
                  startIcon={btCancelStartIcon}
                  endIcon={btCancelEndIcon}
                  onClick={handleCancel}
                >
                  {btCancelText}
                </Button>
              ) : null}
              {showBtConfirm ? (
                <Button
                  variant={btConfirmVariant}
                  color={btConfirmColor}
                  startIcon={btConfirmStartIcon}
                  endIcon={btConfirmEndIcon}
                  onClick={handleConfirm}
                >
                  {btConfirmText}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Fade>
    </MUIModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  persistent: PropTypes.bool,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  btCancelText: PropTypes.string,
  btCancelVariant: PropTypes.oneOf(["text", "contained", "outlined"]),
  btCancelColor: PropTypes.oneOf(["primary", "light"]),
  btCancelSize: PropTypes.oneOf(["micro", "small", "medium", "large"]),
  btCancelStartIcon: PropTypes.node,
  btCancelEndIcon: PropTypes.node,
  btConfirmText: PropTypes.string,
  btConfirmVariant: PropTypes.oneOf(["text", "contained", "outlined"]),
  btConfirmColor: PropTypes.oneOf(["primary", "light"]),
  btConfirmSize: PropTypes.oneOf(["micro", "small", "medium", "large"]),
  btConfirmStartIcon: PropTypes.node,
  btConfirmEndIcon: PropTypes.node,
  showBtCancel: PropTypes.bool,
  showBtConfirm: PropTypes.bool,
  showBtClose: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  open: false,
  persistent: false,
  className: null,
  rounded: true,
  btCancelText: "Cancelar",
  btCancelVariant: "text",
  btCancelColor: "primary",
  btCancelSize: "medium",
  btCancelStartIcon: null,
  btCancelEndIcon: null,
  btConfirmText: "Confirmar",
  btConfirmVariant: "text",
  btConfirmColor: "primary",
  btConfirmSize: "medium",
  btConfirmStartIcon: null,
  btConfirmEndIcon: null,
  showBtCancel: true,
  showBtConfirm: true,
  showBtClose: false,
  onCancel: () => {},
  onConfirm: () => {},
};

export default Modal;
