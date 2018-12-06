import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NullAstVisitor } from "@angular/compiler";

@Component({
  selector: "app-gallery-lists",
  templateUrl: "./gallery-lists.component.html",
  styleUrls: ["./gallery-lists.component.css"]
})
export class GalleryListsComponent implements OnInit {
  constURL: string = "http://skydefr.com/ptut/api/slim";
  lists: string[][];
  html_lists: any;
  page_actuelle: number;
  nbLists: number; //tmp

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var partialURL = "/list/selectAll";

    this.http.get<string>(this.constURL + partialURL).subscribe(res => this.lists);
    
    //var obj = JSON.parse(this.lists);
    //var nbLists = obj.length;

    this.lists = new Array();
    this.lists.push(["1", "test", "descri", null]);
    this.lists.push(["2", "maliste2", "ok descri", null]);
    this.lists.push(["3", "oui3", "ok 3descri", null]);
    this.lists.push(["4", "ok4", "ok d4escri", null]);
    this.lists.push(["5", "oui5", "ok 3descri", null]);
    this.lists.push(["6", "ok6", "ok d4escri", null]);
    this.lists.push(["7", "oui7", "ok 3descri", null]);
    this.lists.push(["8", "ok8", "ok d4escri", null]);
    this.nbLists = this.lists.length; 

    this.html_lists = "";
    this.page_actuelle = 1; //valeur modifiée en fonction des boutons "flèches"

    this.loadLists();
  }

  public loadLists() {
    this.html_lists += "<a (click)=\"changePage(-1)\"><img src=\"./assets/ressources/arrow_l.png\" alt=\"image\" width=\"50%\" height=\"50%\"></a>"; 
    
    for(var i=0; i<this.nbLists; i++) {
      var page = Math.ceil((i+1)/3);

      if (page == this.page_actuelle) {
        this.html_lists += "<div class=\"element\">"; 
        this.html_lists += "<a href=\"javascript: void(0)\" (click)=\"selectionList("+i+"\">"; 
        this.html_lists += "<img src=\"./assets/ressources/image.png\" alt=\"image\" width=\"200px\" height=\"auto\" />";
        this.html_lists += "</a>";
        this.html_lists += "<div class=\"nom_liste\">"+this.lists[i][1]+"</div>";
        this.html_lists += "</div>";
      }
    }

    this.html_lists += "<a href=\"javascript: void(0)\" (click)=\"changePage(1)\"><img src=\"./assets/ressources/arrow_r.png\" alt=\"image\" width=\"50%\" height=\"50%\" /></a>";
  }

  public changePage(val) {
    this.page_actuelle += val;
    this.html_lists = "";
    this.loadLists(); 
  }

  public selectionList(id) {

  }
}
