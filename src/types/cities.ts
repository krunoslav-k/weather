export interface CityOption {
  value: string;
  label: string;
}

export interface CitiesAPIResponse {
  data: {
    latitude: number;
    longitude: number;
    name: string;
    countryCode: string;
  }[];
}
