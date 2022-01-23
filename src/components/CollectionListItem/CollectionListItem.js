import React from "react";
import PropTypes from "prop-types";

import { Button } from "..";

import Collection from "../../stores/models/Collection";

import "./styles.scss";

const CollectionListItem = (props) => {
  const { collection, onClick } = props;

  const { artworkUrl600, collectionName } = collection;

  return (
    <Button className="collection-list__item" onClick={onClick}>
      <img src={artworkUrl600} />
      <div className="collection-list__item__title">{collectionName}</div>
    </Button>
  );
};

CollectionListItem.propTypes = {
  collection: PropTypes.instanceOf(Collection),
  onClick: PropTypes.func.isRequired,
};

export default CollectionListItem;
