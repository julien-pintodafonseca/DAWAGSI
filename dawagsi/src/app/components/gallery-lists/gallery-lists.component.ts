import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from "ngx-smart-modal";

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

  CreateListName: string = ""; //Nom de la liste à créer
  CreateListDescription: string = ""; //Description de la liste à créer

  constructor(public ngxSmartModalService: NgxSmartModalService, private http: HttpClient) { }

  ngOnInit() {
    this.current_page = 1; //Page actuelle par défaut = 1
    this.requestAPI(); //On charge les listes
  }

  /* Fonction permettant de réinitialiser les variables utilisées pour gérer les différentes listes */
  public iniLists() {
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
  }

  /* Fonction permettant de charger les différentes listes contenues dans la BDD via l'API */
  public requestAPI() {
    var partialURL = "/list/selectAll";

    //Appel API
    this.http.get<string>(this.constURL + partialURL)
      .subscribe(res => {
        this.lists = res; //On stock les différentes listes
        this.iniLists(); //On initialise les variables
        this.loadLists(); //Chargement des informations à afficher
      });
  }

  /* Fonction permettant de charger les informations des différentes listes à afficher */
  public loadLists() {
    var nbLists = this.lists.length; //Nombre de listes
    var orderList = 0; //Variable de travail permettant de connaitre l'ordre d'affichage (1ère, 2ème ou 3ème liste à afficher)

    this.nbPages = Math.ceil(nbLists / 3); //Calcul du nombre total de pages 

    //La page actuelle ne peux pas être supérieure au nombre total de pages
    if (this.current_page > this.nbPages) {
      this.current_page = this.nbPages;
    }

    //On parcourt toutes les listes
    for (var i = 0; i < nbLists; i++) {
      var page = Math.ceil((i + 1) / 3); //Calcul de la page par rapport au numéro de liste
      var myList = this.lists[Object.keys(this.lists)[i]]; //Liste parcourue

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

  /* Fonction permettant de supprimer la liste sélectionnée */
  public delete(selectedID) {
    if (selectedID >= 0) {
      var partialURL: string = "/list/" + selectedID;

      this.http.delete<string>(this.constURL + partialURL).subscribe(res => {
        console.log(res);
        window.alert("La liste sélectionnée vient d'être supprimée !");
        this.requestAPI(); //On recharge les listes
      });
    } else {
      window.alert("Aucune liste sélectionnée !");
    }
  }

  /* Fonction permettant de créer une liste */
  public createList() {
    var partialURL: string = "/list/create";

    if (this.CreateListName != "") {
      this.http.post(this.constURL + partialURL + '?name=' + this.CreateListName + '&description=' + this.CreateListDescription, "").subscribe(res => {
        console.log(res);
        window.alert("Liste créée");
        this.requestAPI(); //On recharge les listes
        this.ngxSmartModalService.getModal('modCreateList').close() //On ferme la fenêtre modale
      });
      this.CreateListName = "";
      this.CreateListDescription = "";
    }
    else {
      window.alert("La liste doit posséder un nom !");
    }
  }
}
