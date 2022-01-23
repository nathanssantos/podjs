import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { Text, FileUploader, Modal } from "..";

import * as Theme from "../../constants/Theme";

import { useStore } from "../../hooks";

import "./styles.scss";

const FileUploaderModal = (props) => {
  const { modalProps, title, description, preview, multiple, onChange } = props;
  const store = useStore();

  const eventheaderClassNames = () => {
    let classNames = "file-uploader-modal";

    if (store.UploadStore.queueIsVisible) {
      classNames += " file-uploader-modal--queue-is-visible";
    }

    if (store.UploadStore.queueIsOpen) {
      classNames += " file-uploader-modal--queue-is-open";
    }

    return classNames;
  };

  return (
    <Modal rounded={false} className={eventheaderClassNames()} {...modalProps}>
      {title?.length ? (
        <div className="file-uploader-modal__title">
          <Text variant="h5" color={Theme.primary}>
            {title}
          </Text>
        </div>
      ) : null}

      {description?.length ? (
        <div className="file-uploader-modal__description">
          <Text variant="body-1" color={Theme.light87}>
            {description}
          </Text>
        </div>
      ) : null}

      <div className="file-uploader-modal__uploader">
        <FileUploader
          onChange={onChange}
          preview={preview}
          multiple={multiple}
        />
      </div>
    </Modal>
  );
};

FileUploaderModal.propTypes = {
  modalProps: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  description: PropTypes.string,
  preview: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

FileUploaderModal.defaultProps = {
  modalProps: {},
  title: null,
  description: null,
  preview: null,
  multiple: false,
  onChange: () => [],
};

export default observer(FileUploaderModal);
