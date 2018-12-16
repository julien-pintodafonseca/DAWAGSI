import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Globals } from './../../globals'

@Component({
  selector: "app-show-list",
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.css"]
})
export class ShowListComponent implements OnInit {
  selectedList: Array<any> = new Array<any>(); //liste selectionnée

  constructor(private globals: Globals, private http: HttpClient) { }

  ngOnInit() {
    this.selectedList = this.globals.SelectedList();
    alert(this.selectedList[1]);
  }
}
