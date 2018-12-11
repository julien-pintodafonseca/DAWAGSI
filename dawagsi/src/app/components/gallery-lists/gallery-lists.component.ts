import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NullAstVisitor } from "@angular/compiler";

@Component({
  selector: "app-gallery-lists",
  templateUrl: "./gallery-lists.component.html",
  styleUrls: ["./gallery-lists.component.css"]
})
export class GalleryListsComponent implements OnInit {
  constURL: string = "http://skydefr.com/ptut/api/slim"; //Base URL API
  lists: any; //Les différentes listes contenues dans la BDD (résultat d'un appel API)
  current_page: number; //Page actuelle (1 page = 3 listes à afficher)
  nbPages: number; //Nombre de pages au total (calculé en fonction du nombre de listes)

  list1: Array<any> = new Array<any>(); //1ère liste à afficher
  list2: Array<any> = new Array<any>(); //2ème liste à afficher
  list3: Array<any> = new Array<any>(); //3ème liste à afficher
  selectedList: Array<any> = new Array<any>(); //liste selectionnée

  constructor(private http: HttpClient) { }

  ngOnInit() {
    var partialURL = "/list/selectAll";

    this.current_page = 1; //Page actuelle par défaut = 1
    this.nbPages = 1; //Nombre de page au total avant calcul = 1

    //1ère liste
    this.list1[0] = "hidden";
    this.list1[1] = -1;
    this.list1[2] = "name";

    //2ème liste
    this.list2[0] = "hidden";
    this.list2[1] = -1;
    this.list2[2] = "name";

    //3ème liste
    this.list3[0] = "hidden";
    this.list3[1] = -1;
    this.list3[2] = "name";

    //liste selectionnée
    this.selectedList[0] = -1;
    this.selectedList[1] = "aucune";

    //Appel API
    this.http.get<string>(this.constURL + partialURL)
      .subscribe(res => {
        this.lists = res;
        this.loadLists();
      });
  }

  /* Fonction permettant de charger les informations des différentes listes à afficher */
  public loadLists() {
    var nbLists = this.lists.length; //Nombre de listes
    var orderList = 0; //Variable de travail permettant de connaitre l'ordre d'affichage (1ère, 2ème ou 3ème liste à afficher)

    //On parcourt toutes les listes
    for (var i = 0; i < nbLists; i++) {
      var page = Math.ceil((i + 1) / 3); //Calcul de la page par rapport au numéro de liste
      var myList = this.lists[Object.keys(this.lists)[i]]; //Liste parcourue

      //Calcul du nombre total de pages
      if (this.nbPages < page) {
        this.nbPages = page;
      }

      //Si la page parcourue correspond à la page actuelle à afficher
      if (page == this.current_page) {
        var id = myList[Object.keys(myList)[0]]; //id de la liste à afficher
        var nom = myList[Object.keys(myList)[1]]; //nom de la liste à afficher

        //On attribue les info à la liste à afficher (1ère, 2ème ou 3ème liste selon l'ordre d'affichage)
        if (orderList < 3) {
          switch (orderList) {
            case 0:
              this.list1[0] = "visible";
              this.list1[1] = id;
              this.list1[2] = nom;

              this.list2[0] = "hidden";
              this.list2[1] = -1;
              this.list2[2] = "name";

              this.list3[0] = "hidden";
              this.list3[1] = -1;
              this.list3[2] = "name";
              break;
            case 1:
              this.list2[0] = "visible";
              this.list2[1] = id;
              this.list2[2] = nom;
              break;
            case 2:
              this.list3[0] = "visible";
              this.list3[1] = id;
              this.list3[2] = nom;
              break;
          }
          orderList++;
        } else {
          orderList = 0;
        }
      }
    }
  }

  /* Fonction permettant de changer la page actuelle */
  public changePage(val) {
    this.current_page += val;

    if (this.current_page < 1) {
      this.current_page = 1; //La page acteulle ne peux pas être inférieure à 1
    } else if (this.current_page > this.nbPages) {
      this.current_page = this.nbPages; //La page actuelle ne peux pas être supérieur au nombre total de pages
    } else {
      this.loadLists(); //On recharge les listes à afficher
    }
  }

  /* Fonction permettant de changer la liste sélectionnée */
  public select(selectedID) {
    var nbLists = this.lists.length; //Nombre de listes

    this.selectedList[0] = selectedID;

    //On parcourt toutes les listes
    for (var i = 0; i < nbLists; i++) {
      var myList = this.lists[Object.keys(this.lists)[i]]; //Liste parcourue

      var id = myList[Object.keys(myList)[0]]; //id de la liste parcourue
      var nom = myList[Object.keys(myList)[1]]; //nom de la liste parcourue

      //Si la liste parcourue est la liste sélectionnée
      if (id == selectedID) {
        this.selectedList[1] = nom;
      }
    }
  }
}
