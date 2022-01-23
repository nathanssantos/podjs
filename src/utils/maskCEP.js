const maskCEP = (cep) => {
  try {
    if (cep?.length < 8) return cep;

    return `${cep.substring(0, 5)}-${cep.substring(5, 9)}`;
  } catch (error) {
    console.log("maskCEP", error);
    return cep;
  }
};

export default maskCEP;
