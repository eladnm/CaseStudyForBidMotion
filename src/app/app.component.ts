import { Country } from '././models/country.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ServiceCountries } from './shared/service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Observable } from 'rxjs';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "my-case-study";
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private serviceCountries: ServiceCountries) {}
  ngOnInit() {
    this.serviceCountries.getListCountriesPromise().then(res => {
    this.displayedColumns = ['continentName', 'countryName', 'areaInSqKm', 'population'];
    this.dataSource = new MatTableDataSource(res.geonames);
      console.log(res.geonames);
    });
  }
  fetchData() {
    this.serviceCountries.getListCountries().subscribe((data: any) => {
      this.serviceCountries = data;
      console.log(this.serviceCountries);
    });
  }
  fetchDataPromise() {
    this.serviceCountries.getListCountrriesPromise();
  }
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}


export class CountryDataSource extends DataSource<any> {
         constructor(private serviceCountries: ServiceCountries) {
           super();
         }
         connect(): Observable<Country[]> {
           return this.serviceCountries.getListCountries();
         }
         disconnect() {}
       }



