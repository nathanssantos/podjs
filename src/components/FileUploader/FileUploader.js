import React, { useRef } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { Button, Text } from "..";
import { PhotoIcon } from "../svg";

import { useStore } from "../../hooks";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const FileUploader = (props) => {
  const { description, modal, preview, multiple, onChange } = props;
  const store = useStore();
  const inputRef = useRef(null);

  const fileUploaderClassNames = () => {
    let newClassNames = "file-uploader";

    if (!modal && store.UploadStore.queue && store.UploadStore.queue?.length) {
      newClassNames += " file-uploader--open";
    }

    return newClassNames;
  };

  const handleInputChange = async (event) => {
    if (!event.target.files?.length) return;

    const newFiles = Array.from(event.target.files);

    await onChange(newFiles);

    const input = inputRef.current;

    if (input) input.value = "";
  };

  const handleFilesDrop = async (event) => {
    event.preventDefault();

    if (!event.dataTransfer?.files?.length) return;

    const newFiles = Array.from(event.dataTransfer.files);

    await onChange(newFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={fileUploaderClassNames()}
      onDrop={handleFilesDrop}
      onDragOver={handleDragOver}
    >
      {description?.length ? <Text variant="h5">{description}</Text> : null}
      <div className="file-uploader__box">
        <div className="file-uploader__box__icon">
          {preview?.length ? (
            <img src={preview} />
          ) : (
            <PhotoIcon color={Theme.primary} size={48} />
          )}
        </div>
        <div className="file-uploader__box__description">
          <Text variant="subtitle-1" color={Theme.light38}>
            {multiple ? "Solte os arquivos aqui" : "Solte o arquivo aqui"}
          </Text>
          <Text variant="subtitle-1" color={Theme.light38}>
            ou
          </Text>
        </div>
        <div className="file-uploader__box__button">
          <input
            type="file"
            multiple={multiple}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <Button onClick={() => inputRef.current.click()}>
            Busque no dispositivo
          </Button>
        </div>
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  description: PropTypes.string,
  modal: PropTypes.bool,
  multiple: PropTypes.bool,
  preview: PropTypes.string,
  onChange: PropTypes.func,
};

FileUploader.defaultProps = {
  description: null,
  modal: false,
  multiple: false,
  preview: null,
  onChange: () => {},
};

export default observer(FileUploader);
