const useLocalStorage = (key = "") => {
  const state = JSON.parse(localStorage.getItem(`podjs@${key}`)) || {};

  const setState = (newState) => {
    localStorage.setItem(`podjs@${key}`, JSON.stringify(newState));
  };

  return [state, setState];
};

export default useLocalStorage;
