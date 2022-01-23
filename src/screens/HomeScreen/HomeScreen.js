/* eslint-disable no-unused-vars */
import { Container } from "@material-ui/core";
import { flowResult } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import {
  CollectionListItem,
  Loader,
  Screen,
  SearchBar,
  Text,
} from "../../components";
import { SYSTEM_INSTABILITY } from "../../constants/Messages";
import * as Theme from "../../constants/Theme";

import { useStore } from "../../hooks";

import "./styles.scss";

const HomeScreen = () => {
  const store = useStore();
  const history = useHistory();
  const [searchingPodcast, setSearchingPodcast] = useState(false);
  const [term, setTerm] = useState("");

  const search = async (seamless) => {
    try {
      if (!seamless) setSearchingPodcast(true);

      const response = await flowResult(
        store.CollectionStore.searchCollectionByTerm({ term })
      );

      if (response.error) toast.error(SYSTEM_INSTABILITY);
    } catch (error) {
      console.log(error);
      toast.error(SYSTEM_INSTABILITY);
    } finally {
      setSearchingPodcast(false);
    }
  };

  const handleFavoriteClick = (collection) => {
    if (collection?.favorite) {
      store.StorageStore.removeCollectionFromFavorites({
        id: collection.collectionId,
      });
    } else {
      store.StorageStore.addCollectionToFavorites({
        collection,
      });
    }

    search(true);
  };

  return (
    <Screen className="home" container={false}>
      <Container maxWidth={Theme.containerMaxWidth}>
        <div className="home__favorites">
          <div className="home__title">
            <Text variant="h5">Favorites</Text>
          </div>
          <div className="collection-list">
            {store.UserStore.favorites?.length ? (
              _.orderBy(store.UserStore.favorites, "favoriteRating", "desc").map(
                (collection) => (
                  <CollectionListItem
                    key={collection.collectionId}
                    collection={collection}
                    onClickPlay={() => {
                      history.push(`/collections/${collection.collectionId}`);
                    }}
                    onClickFavorite={() => handleFavoriteClick(collection)}
                  />
                )
              )
            ) : (
              <Text color={Theme.light38}>Empty</Text>
            )}
          </div>
        </div>

        <div className="home__search">
          <div className="home__title">
            <Text variant="h5">Search</Text>
          </div>
          <div className="home__search-bar">
            <SearchBar
              requesting={searchingPodcast}
              onChangeText={setTerm}
              onSubmitSearch={search}
            />
          </div>
          {searchingPodcast ? (
            <Loader />
          ) : (
            <div className="collection-list">
              {store.CollectionStore.searchResultList.map((collection) => (
                <CollectionListItem
                  key={collection.collectionId}
                  collection={collection}
                  onClickPlay={() => {
                    history.push(`/collections/${collection.collectionId}`);
                  }}
                  onClickFavorite={() => handleFavoriteClick(collection)}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Screen>
  );
};

export default observer(HomeScreen);
