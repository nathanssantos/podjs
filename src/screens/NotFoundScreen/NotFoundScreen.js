import React from "react";
import { useHistory } from "react-router-dom";

import { Screen, Text, Button } from "../../components";
import { NotFound } from "../../components/svg";

// import * as Theme from "../../constants/Theme";

import "./styles.scss";

const NotFoundScreen = () => {
  const history = useHistory();

  return (
    <Screen className="not-found">
      <div className="not-found__image">
        <NotFound />
      </div>
      <Text variant="h5" className="not-found__title" responsive>
        Opa! Não encontramos a página que você estava procurando.
      </Text>
      {/* <Text
        variant="h6"
        className="not-found__description"
        color={Theme.light60}
        responsive
      >
        Mas ainda podemos te ajudar!
      </Text> */}
      <Button variant="contained" onClick={() => history.push("/")}>
        Ir para página inicial
      </Button>
    </Screen>
  );
};

export default NotFoundScreen;
