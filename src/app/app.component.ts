import { Component, OnInit,ViewChild } from '@angular/core';
import { ServiceCountries } from './shared/service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "my-case-study";
   show = false;
dataSource = new MatTableDataSource([]);
displayedColumns = ['continentName', 'countryName', 'areaInSqKm', 'population'];
geonames = [];
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
@ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private serviceCountries: ServiceCountries) {}
fetchDataPromise() {
this.show = true;
this.serviceCountries.getListCountriesPromise().then(res => {
this.geonames = res.geonames;
this.dataSource = new MatTableDataSource(res.geonames);
this.dataSource.sort = this.sort;
this.dataSource.paginator = this.paginator;
});
}


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getTotalPop() {
return this.dataSource.filteredData.map(t => t.population).reduce((acc, value) => Number(acc) + Number(value), 0);
  }
  getTotalSqm() {
    return this.dataSource.filteredData.map(t => t.areaInSqKm).reduce((acc, value) => Number(acc) + Number(value), 0);

  }
  

}




