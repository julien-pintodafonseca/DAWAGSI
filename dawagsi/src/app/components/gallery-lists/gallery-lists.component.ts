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
  lists: any;
  html_lists: any;
  page_actuelle: number;
  nbPages: number;
  nbLists: number; //tmp

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var partialURL = "/list/selectAll";

    this.http.get<string>(this.constURL + partialURL)
      .subscribe(res => {
        this.lists = res;
        this.nbLists = this.lists.length;

        this.html_lists = "";
        this.page_actuelle = 1;
        this.nbPages = 1;

        localStorage.removeItem('list');
        this.loadLists();
      });
  }

  public loadLists() {
    for (var i = 0; i < this.nbLists; i++) {
      var page = Math.ceil((i + 1) / 3);
      var myList = this.lists[Object.keys(this.lists)[i]];

      if (this.nbPages < page) {
        this.nbPages = page;
      }

      if (page == this.page_actuelle) {
        this.html_lists += "<div class=\"element\">";
        this.html_lists += "<img src=\"./assets/ressources/image.png\" alt=\"image\" width=\"200px\" height=\"auto\" />";
        this.html_lists += "<div class=\"nom_liste\">" + myList[Object.keys(myList)[1]] + "</div>";
        this.html_lists += "</div>";
      }
    }
  }

  public changePage(val) {
    this.page_actuelle += val;

    if (this.page_actuelle <= 0) {
      this.page_actuelle = 1;
    } else if (this.page_actuelle > this.nbPages) {
      this.page_actuelle = this.nbPages;
    } else {
      this.html_lists = "";
      this.loadLists();
    }
  }
}
