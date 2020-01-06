import { Component } from '@angular/core';
import { ServiceCountries } from './shared/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-case-study';

constructor(private serviceCountries: ServiceCountries) { }

  fetchData() {
   this.serviceCountries.getListCountries().subscribe(
    (data: any) => {
       this.serviceCountries = data;
       console.log(this.serviceCountries);
    }
   );
  }
  fetchDataPromise() {
    this.serviceCountries.getListCountrriesPromise();
  }

}
