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
export class AppComponent {
  title = "my-case-study";
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serviceCountries: ServiceCountries) {}

  fetchDataPromise() {
    this.serviceCountries.getListCountriesPromise().then(res => {
    this.displayedColumns = ['continentName', 'countryName', 'areaInSqKm', 'population'];
    this.dataSource = new MatTableDataSource(res.geonames);
      console.log(res.geonames);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
    getTotal() {
    return this.country.map(t => t.population).reduce((acc, value) => acc + value, 0);
  }
}




