import React from "react";
import PropTypes from "prop-types";
import {
  Favorite,
  FavoriteBorder /* InfoOutlined */,
} from "@material-ui/icons";

import { Button } from "..";

import Collection from "../../stores/models/Collection";

import * as Theme from "../../constants/Theme";

import "./styles.scss";
import { observer } from "mobx-react";

const CollectionListItem = (props) => {
  const { collection, onClickPlay, onClickFavorite } = props;

  const { artworkUrl600, collectionName } = collection;

  return (
    <div className="collection-list__item">
      <div className="collection-list__item__image" onClick={onClickPlay}>
        <img src={artworkUrl600} />
      </div>
      <div className="collection-list__item__title">
        {collectionName}
        <div className="collection-list__item__actions">
          {/* <Button onClick={onClickPlay}>
            <InfoOutlined />
          </Button> */}
          <Button onClick={onClickFavorite}>
            {collection?.favorite ? (
              <div style={{ color: Theme.error }} title="Remove from favorites">
                <FavoriteBorder />
              </div>
            ) : (
              <div style={{ color: Theme.error }} title="Add to favorites">
                <Favorite />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

CollectionListItem.propTypes = {
  collection: PropTypes.instanceOf(Collection).isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default observer(CollectionListItem);
