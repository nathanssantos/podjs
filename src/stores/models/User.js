import { makeObservable, observable } from "mobx";
import Address from "./Address";

export default class User {
  id = null;
  name = null;
  email = null;
  type = null;
  avatar_url = null;
  address = new Address();
  phone = null;
  phone_prefix = null;
  cpf_cnpj = null;
  legal_consent = null;
  created_at = null;

  constructor(newUser = {}) {
    makeObservable(this, {
      id: observable,
      name: observable,
      email: observable,
      type: observable,
      avatar_url: observable,
      address: observable,
      phone: observable,
      phone_prefix: observable,
      cpf_cnpj: observable,
      legal_consent: observable,
      created_at: observable,
    });

    if (newUser.id == null) {
      throw new Error("Invalid User constructor");
    }

    const {
      id,
      name,
      email,
      type,
      avatar_url,
      address,
      phone,
      phone_prefix,
      cpf_cnpj,
      legal_consent,
      created_at,
    } = newUser;

    this.id = id;
    this.name = name || "";
    this.email = email || "";
    this.type = type || null;
    this.avatar_url = avatar_url || "";
    this.address = new Address(address);
    this.phone = phone || "";
    this.phone_prefix = phone_prefix || "";
    this.cpf_cnpj = cpf_cnpj || "";
    this.legal_consent = legal_consent || "";
    this.created_at = created_at || "";
  }
}
