import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './../models/country.model';



@Injectable()
export class ServiceCountries {
  private url =
    "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane";
  constructor(private http: HttpClient) {}

  getListCountries() {
    return this.http.get<Country[]>(this.url);
  }

  getListCountriesPromise(): Promise<any> {
    const url = `${this.url}`;
    return this.http
      .get(url)
      .toPromise()
      .catch(this.handleError);
  }
  // handler for error in URL
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
