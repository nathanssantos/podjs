import React from "react";
import PropTypes from "prop-types";
import { SwipeableDrawer } from "@material-ui/core";
import { observer } from "mobx-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { EpisodeListItem } from "..";

import { useStore } from "../../hooks";

import "./styles.scss";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Playlist = () => {
  const store = useStore();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newState = reorder(
      store.PlayerStore.playlist,
      result.source.index,
      result.destination.index
    );

    store.PlayerStore.setPlaylist(newState);
  };

  return (
    <div className="playlist">
      <SwipeableDrawer
        anchor={"right"}
        open={store.PlayerStore.playlistIsOpen}
        onClose={() => store.PlayerStore.closePlaylist()}
        onOpen={() => ""}
      >
        <div className="playlist__content">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dropable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="playlist__droppable"
                >
                  {store.PlayerStore.playlist.map((episode, index) => (
                    <Draggable
                      key={episode.title}
                      draggableId={String(episode.title)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className="playlist__draggable"
                        >
                          <div
                            key={episode.title}
                            onClick={() =>
                              store.PlayerStore.loadEpisode({ episode })
                            }
                            className="playlist__item-wrapper"
                          >
                            <EpisodeListItem episode={episode} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

Playlist.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.number,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
};

export default observer(Playlist);
