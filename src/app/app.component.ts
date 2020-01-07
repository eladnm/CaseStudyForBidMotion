import { Component, OnInit,ViewChild } from '@angular/core';
import { ServiceCountries } from './shared/service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";

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
pageSize = 5;
pageIndex = 0;
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
this.itemsShowed = this.dataSource.filteredData.slice(0, 5);
this.dataSource.paginator.page.subscribe((pageEvent: PageEvent) => {
this.pageSize = pageEvent.pageSize;
this.pageIndex = pageEvent.pageIndex;
})
});
}


  applyFilter(filterValue: string) {
    this.dataSource.filter  = filterValue.trim().toLowerCase(); // Datasource defaults to lowercase matches
  }
getTotalPop() {
const startIndex = this.pageIndex * this.pageSize;
const endIndex = startIndex + this.pageSize;
const itemsShowed = this.dataSource.filteredData.slice(startIndex, endIndex);
return itemsShowed.map(t => t.population).reduce((acc, value) => Number(acc) + Number(value), 0);
}
getTotalSqm() {
const startIndex = this.pageIndex * this.pageSize;
const endIndex = startIndex + this.pageSize;
const itemsShowed = this.dataSource.filteredData.slice(startIndex, endIndex);
return itemsShowed.map(t => t.areaInSqKm).reduce((acc, value) => Number(acc) + Number(value), 0);
}
}




