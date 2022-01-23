import Axios from "axios";

/**
 *
 * @param {string} zipCode
 * @returns {Address}
 */
const getAddressByZipCode = async (zipCode) => {
  try {
    if (typeof zipCode !== "string") {
      console.log("getAddressByZipCode invalid zipCode");
      return null;
    }

    const response = await Axios.get(
      `https://viacep.com.br/ws/${zipCode
        .replace(/[^\d]/g, "")
        .replace("-", "")}/json`
    );

    const { status, data } = response;

    if (status !== 200 || !data) {
      return null;
    }

    const { logradouro, bairro, localidade, uf } = data;

    return {
      cep: zipCode,
      street: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
    };
  } catch (error) {
    console.log("getAddressByZipCode error", error);
    return null;
  }
};

export default getAddressByZipCode;
