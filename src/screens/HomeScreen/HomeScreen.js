/* eslint-disable no-unused-vars */
import { Container } from "@material-ui/core";
import { flowResult } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  CollectionListItem,
  Loader,
  Screen,
  SearchBar,
} from "../../components";
import { SYSTEM_INSTABILITY } from "../../constants/Messages";
import * as Theme from "../../constants/Theme";

import { useStore } from "../../hooks";

import "./styles.scss";

const HomeScreen = () => {
  const store = useStore();
  const history = useHistory();
  // const [mounted, setMounted] = useState(false);
  const [searchingPodcast, setSearchingPodcast] = useState(false);
  const [term, setTerm] = useState("nerd");

  const search = async () => {
    try {
      setSearchingPodcast(true);
      const response = await flowResult(
        store.PodcastStore.searchCollectionByTerm({ term })
      );

      if (response.error) toast.error(SYSTEM_INSTABILITY);
    } catch (error) {
      console.log(error);
      toast.error(SYSTEM_INSTABILITY);
    } finally {
      setSearchingPodcast(false);
      // setMounted(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <Screen className="home" container={false}>
      <Container maxWidth={Theme.containerMaxWidth}>
        <div className="collection-list top-collections">
          {store.PodcastStore.topCollections.map((collection) => (
            <CollectionListItem
              key={collection.collectionId}
              collection={collection}
              onClick={() =>
                history.push(`/collections/${collection.collectionId}`)
              }
            />
          ))}
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
            {store.PodcastStore.searchResultList.map((collection) => (
              <CollectionListItem
                key={collection.collectionId}
                collection={collection}
                onClick={() =>
                  history.push(`/collections/${collection.collectionId}`)
                }
              />
            ))}
          </div>
        )}
      </Container>
    </Screen>
  );
};

export default observer(HomeScreen);
