import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../../services/config.service'
import { NgxSmartModalService } from "ngx-smart-modal";

const apiURL: string = new ConfigService().ApiURL(); //Base URL API BDD

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  private selectedList: Array<any> = new Array<any>(); //liste selectionnée

  /* Constructeur */
  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private http: HttpClient,
  ) { }

  /* ngOnInit */
  ngOnInit() {
    this.selectedList[0] = localStorage.getItem('selectedList[0]');
    this.selectedList[1] = localStorage.getItem('selectedList[1]');
    this.selectedList[2] = localStorage.getItem('selectedList[2]');
  }

}
