import { makeObservable, observable } from "mobx";

export default class Address {
  zip = null;
  street = null;
  number = null;
  complement = null;
  district = null;
  city = null;
  state = null;

  constructor(newAddress = {}) {
    makeObservable(this, {
      zip: observable,
      street: observable,
      number: observable,
      complement: observable,
      district: observable,
      city: observable,
      state: observable,
    });

    const { zip, street, number, complement, district, city, state } =
      newAddress;

    this.zip = zip || "";
    this.street = street || "";
    this.number = number || "";
    this.complement = complement || "";
    this.district = district || "";
    this.city = city || "";
    this.state = state || "";
  }
}
