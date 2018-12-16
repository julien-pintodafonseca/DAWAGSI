import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Globals } from '../../globals'

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  selectedList: Array<any> = new Array<any>(); //liste selectionnée

  constructor(private globals: Globals, private http: HttpClient) { }

  ngOnInit() {
    this.selectedList = this.globals.SelectedList(); //On récupère les informations de la liste sélectionnée précédemment
  }
}
