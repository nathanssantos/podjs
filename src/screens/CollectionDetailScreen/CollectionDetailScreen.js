/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { flowResult } from "mobx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  CollectionListItem,
  EpisodeListItem,
  Loader,
  Screen,
  SearchBar,
} from "../../components";
import { SYSTEM_INSTABILITY } from "../../constants/Messages";
import * as Theme from "../../constants/Theme";

import { useStore } from "../../hooks";

import "./styles.scss";

const CollectionDetail = () => {
  const store = useStore();
  const params = useParams();
  // const [mounted, setMounted] = useState(false);
  const [requestingCollectionDetail, setRequestigCollectionDetail] =
    useState(false);
  const [searchingPodcast, setSearchingPodcast] = useState(false);
  const [term, setTerm] = useState("");

  const getCollectionDetail = async (id) => {
    try {
      setRequestigCollectionDetail(true);
      const response = await flowResult(
        store.PodcastStore.getCollectionDetail({ id })
      );

      if (response.error) toast.error(SYSTEM_INSTABILITY);
    } catch (error) {
      console.log(error);
      toast.error(SYSTEM_INSTABILITY);
    } finally {
      setRequestigCollectionDetail(false);
      // setMounted(true);
    }
  };

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
    if (params.id) getCollectionDetail(params.id);
  }, []);

  if (!store.PodcastStore.collectionDetail || requestingCollectionDetail) {
    return <Loader paddingVertical={16} />;
  }

  return (
    <Screen className="home" container={false}>
      <Container maxWidth={Theme.containerMaxWidth}>
        <div className="collection-detail-search-bar">
          <SearchBar
            requesting={requestingCollectionDetail}
            onChangeText={setTerm}
            onSubmitSearch={search}
          />
        </div>

        {requestingCollectionDetail ? (
          <Loader />
        ) : (
          <div className="episode-list">
            {store.PodcastStore.collectionDetail.episodes.map(
              (episode, index) => (
                <EpisodeListItem
                  key={`${index}-${episode.title}`}
                  episode={episode}
                  onClick={() => console.log(episode.mediaUrl)}
                />
              )
            )}
          </div>
        )}
      </Container>
    </Screen>
  );
};

export default CollectionDetail;
