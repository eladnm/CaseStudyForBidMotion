import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ServiceCountries {
  readonly rootUrl = 'http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane';
constructor(private http: HttpClient) { }

getListCountries() {
  return this.http.get(this.rootUrl);
}

getListCountrriesPromise() {
  const promise = this.http.get(this.rootUrl).toPromise();
  console.log(promise);
  promise.then((data) => {
    console.log("Promise resolved with: " + JSON.stringify(data));
  }, (error) => {
    console.log("Promise rejected with " + JSON.stringify(error));
  })
}
}
