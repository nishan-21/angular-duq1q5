import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myTable') private _table: Table;
  name = 'Primeng data table date range filter';
  data: any;
  cols: any;
  dateFilters: any;

  ngOnInit() {
    var _self = this;
    this.data = [
      { date: new Date("2018-07-12"), title: "Test1", type: "123", comment: "" },
      { date: new Date("2018-07-13"), title: "Test2", type: "123", comment: "" }
    ];

    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'title', header: 'Title' },
      { field: 'type', header: 'Type' },
      { field: 'comment', header: 'Comment' }
    ];

    // this will be called from your templates onSelect event
    this._table.filterConstraints['dateRangeFilter'] = (value, filter): boolean => {
      // get the from/start value
      var s = _self.dateFilters[0].getTime();
      var e;
      // the to/end value might not be set
      // use the from/start date and add 1 day
      // or the to/end date and add 1 day
      if (_self.dateFilters[1]) {
        e = _self.dateFilters[1].getTime() + 86400000;
      } else {
        e = s + 86400000;
      }
      // compare it to the actual values
      return value.getTime() >= s && value.getTime() <= e;
    }
  }
}