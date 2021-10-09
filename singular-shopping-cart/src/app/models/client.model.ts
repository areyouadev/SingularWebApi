export interface IClient {
  id?: string;
  name: string;
  surname: string;
  addressType?: AddressType;
  streetAddress: string;
  suburb: string;
  city?: string;
  postalCode: string;
}

export enum AddressType {
  Residential,
  Business
}
