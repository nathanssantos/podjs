const validateCPF = (cpf) => {
  try {
    cpf = cpf.replace(/[^\d]+/g, "");
    let numeros;
    let digitos;
    let soma;
    let i;
    let resultado;
    let digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length !== 11) return false;
    for (i = 0; i < cpf.length - 1; i++) {
      if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    }
    if (!digitos_iguais) {
      numeros = cpf.substring(0, 9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(0))) return false;
      numeros = cpf.substring(0, 10);
      soma = 0;
      for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      return resultado === parseInt(digitos.charAt(1));
    }
    return false;
  } catch (e) {
    return false;
  }
};

export default validateCPF;
