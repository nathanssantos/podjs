import React from 'react';

const useContextFactory = (name, context) => {
  const ctx = React.useContext(context);

  if (ctx == null) {
    throw new Error(
      `use${name}Context must be used within a ${name}ContextProvider`,
    );
  }

  return ctx;
};

export default useContextFactory;
