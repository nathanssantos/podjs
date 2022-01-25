/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { flowResult } from "mobx";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { observer } from "mobx-react";

import {
  Button,
  EpisodeListItem,
  ListLoader,
  Loader,
  Screen,
  SearchBar,
  Text,
} from "../../components";
import { SYSTEM_INSTABILITY } from "../../constants/Messages";
import * as Theme from "../../constants/Theme";

import { useStore } from "../../hooks";

import { ArrowLeftIcon } from "../../components/svg";

import "./styles.scss";

const CollectionDetail = () => {
  const store = useStore();
  const params = useParams();
  const history = useHistory();
  const [requestingCollectionDetail, setRequestigCollectionDetail] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const getCollectionDetail = async (id) => {
    try {
      setRequestigCollectionDetail(true);
      const response = await flowResult(
        store.CollectionStore.getCollectionDetail({ id })
      );

      if (response.error) {
        toast.error(SYSTEM_INSTABILITY);
        return;
      }

      setSearchResult(store.CollectionStore.collectionDetail.episodes);
    } catch (error) {
      console.log(error);
      toast.error(SYSTEM_INSTABILITY);
    } finally {
      setRequestigCollectionDetail(false);
    }
  };

  const submitSearch = async () => {
    try {
      const result = store.CollectionStore.collectionDetail.episodes.filter(
        (episode) =>
          episode.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResult(result);
    } catch (error) {
      console.log(error);
      toast.error(SYSTEM_INSTABILITY);
    }
  };

  useEffect(() => {
    if (params.id) getCollectionDetail(params.id);
  }, []);

  return (
    <Screen className="collection-detail" container={false}>
      <Container maxWidth={Theme.containerMaxWidth}>
        <div className="collection-detail__header">
          <div className="collection-detail__header__image">
            <img src={store.CollectionStore.collectionDetail?.artworkUrl600} />
          </div>
          <div className="collection-detail__header__text">
            <div className="collection-detail__header__title">
              <Text variant="h4">
                {store.CollectionStore.collectionDetail?.collectionName || ""}
              </Text>
            </div>
            <div className="collection-detail__header__description">
              <Text>
                {store.CollectionStore.collectionDetail?.description || ""}
              </Text>
            </div>
          </div>
        </div>
        <div className="collection-detail__search-bar">
          <Button
            variant="contained"
            type="submit"
            onClick={() => history.push("/")}
          >
            <ArrowLeftIcon color="#000" />
          </Button>
          <SearchBar
            placeholder="Episode"
            requesting={requestingCollectionDetail}
            onChangeText={setSearchTerm}
            onSubmitSearch={submitSearch}
          />
        </div>

        {requestingCollectionDetail ? (
          <ListLoader />
        ) : (
          <div className="episode-list">
            {searchResult.map((episode, index) => (
              <EpisodeListItem
                key={`${index}-${episode.title}`}
                episode={episode}
                onClickPlay={() => store.PlayerStore.loadEpisode({ episode })}
                onClickAddToPlaylist={() =>
                  store.PlayerStore.addEpisodeToPlaylist({ episode })
                }
              />
            ))}
          </div>
        )}
      </Container>
    </Screen>
  );
};

export default observer(CollectionDetail);
