import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { ConfigService } from '../../services/config.service'
import { NgxSmartModalService } from "ngx-smart-modal";

const apiURL: string = new ConfigService().ApiURL(); //API BDD base url (sans l'extension de requête)

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.css"]
})
export class LibraryComponent implements OnInit {
  private lists: any; //Les différentes listes contenues dans la BDD (résultat d'un appel API)
  private current_page: number; //Page actuelle (1 page = 3 listes à afficher)
  private nbPages: number; //Nombre de pages au total (calculé en fonction du nombre de listes)
  private defaultValue; //Valeur par défaut à afficher pour le nom et la description

  private list1: Array<any> = new Array<any>(); //1ère liste à afficher
  private list2: Array<any> = new Array<any>(); //2ème liste à afficher
  private list3: Array<any> = new Array<any>(); //3ème liste à afficher
  private selectedList: Array<any> = new Array<any>(); //liste selectionnée

  private CreateListName: string = ""; //Nom de la liste à créer
  private CreateListDescription: string = ""; //Description de la liste à créer

  /* Constructeur de la bibliothèque */
  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private http: HttpClient,
    private router: Router
  ) { }

  /* ngOnInit */
  ngOnInit() {
    this.current_page = 1; //Page actuelle par défaut = 1
    this.defaultValue = "/"; //Valeur par défaut à afficher pour l'auteur

    this.requestAPI(); //On charge les listes
  }

  /* Permet d'obtenir les différentes listes contenues dans la BDD */
  public requestAPI() {
    var partialURL = "/list/selectAll"; //On complète l'url

    //Appel API
    this.http.get<string>(apiURL + partialURL)
      .subscribe(res => {
        this.lists = res; //On stock les différentes listes
        this.init(); //On réinitialise les variables
        this.load(); //Chargement des informations à afficher
      });
  }

  /* Permet de réinitialiser les variables utilisées pour gérer les différentes listes */
  public init() {
    this.nbPages = 1; //Nombre de page au total avant calcul = 1

    //On supprime les données locales concernant la liste
    localStorage.removeItem('selectedList[0]');
    localStorage.removeItem('selectedList[1]');
    localStorage.removeItem('selectedList[2]');

    //On supprime les données locales concernant l'image
    localStorage.removeItem('selectedImage[0]');
    localStorage.removeItem('selectedImage[1]');
    localStorage.removeItem('selectedImage[2]');
    localStorage.removeItem('selectedImage[3]');
    localStorage.removeItem('selectedImage[4]');

    //1ère liste
    this.list1[0] = "hidden";
    this.list1[1] = -1;
    this.list1[2] = this.defaultValue;
    this.list1[3] = this.defaultValue;

    //2ème liste
    this.list2[0] = "hidden";
    this.list2[1] = -1;
    this.list2[2] = this.defaultValue;
    this.list2[3] = this.defaultValue;

    //3ème liste
    this.list3[0] = "hidden";
    this.list3[1] = -1;
    this.list3[2] = this.defaultValue;
    this.list3[3] = this.defaultValue;

    //liste selectionnée
    this.selectedList[0] = -1;
    this.selectedList[1] = this.defaultValue;
    this.selectedList[2] = this.defaultValue;
  }

  /* Permet de charger les informations des différentes listes à afficher */
  public load() {
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
        var description = myList[Object.keys(myList)[2]]; //description de la liste à afficher

        if (description == null || description == "") {
          description = this.defaultValue;
        }

        //On attribue les info à la liste à afficher (1ère, 2ème ou 3ème liste selon l'ordre d'affichage)
        if (orderList < 3) {
          switch (orderList) {
            case 0:
              this.list1[0] = "visible";
              this.list1[1] = id;
              this.list1[2] = nom;
              this.list1[3] = description;

              this.list2[0] = "hidden";
              this.list2[1] = -1;
              this.list2[2] = this.defaultValue;
              this.list2[3] = this.defaultValue;

              this.list3[0] = "hidden";
              this.list3[1] = -1;
              this.list3[2] = this.defaultValue;
              this.list3[3] = this.defaultValue;
              break;
            case 1:
              this.list2[0] = "visible";
              this.list2[1] = id;
              this.list2[2] = nom;
              this.list2[3] = description;
              break;
            case 2:
              this.list3[0] = "visible";
              this.list3[1] = id;
              this.list3[2] = nom;
              this.list3[3] = description;
              break;
          }
          orderList++;
        } else {
          orderList = 0;
        }
      }
    }
  }

  /* Permet de changer la liste sélectionnée */
  public select(selectedID) {
    if (selectedID >= 0) {
      var nbLists = this.lists.length; //Nombre de listes

      //On parcourt toutes les listes
      for (var i = 0; i < nbLists; i++) {
        var myList = this.lists[Object.keys(this.lists)[i]]; //Liste parcourue

        var id = myList[Object.keys(myList)[0]]; //id de la liste parcourue
        var nom = myList[Object.keys(myList)[1]]; //nom de la liste parcourue
        var description = myList[Object.keys(myList)[2]]; //nom de la liste parcourue

        if (description == null || description == "") {
          description = this.defaultValue;
        }

        //Si la liste parcourue est la liste sélectionnée
        if (id == selectedID) {
          this.selectedList[0] = id;
          this.selectedList[1] = nom;
          this.selectedList[2] = description;
        }
      }
    }
  }

  /* Permet de changer la page actuelle */
  public changePage(val) {
    this.current_page += val;

    if (this.current_page < 1) {
      this.current_page = 1; //La page acteulle ne peux pas être inférieure à 1
    } else if (this.current_page > this.nbPages) {
      this.current_page = this.nbPages; //La page actuelle ne peux pas être supérieur au nombre total de pages
    } else {
      this.load(); //On recharge les listes à afficher
    }
  }

  /* Permet d'ouvrir la fenêtre de création d'une liste */
  public btnCreate_Open() {
    this.ngxSmartModalService.getModal('modCreateList').open();
  }

  /* Permet de valider la création d'une liste */
  public btnCreate_Validate() {
    if (this.CreateListName != "") {
      var partialURL: string = "/list/create"; //On complète l'url

      //On supprime les espaces avant et après les strings récupérés
      this.CreateListName = this.CreateListName.trim();
      this.CreateListDescription = this.CreateListDescription.trim();

      //Appel API
      this.http.post(apiURL + partialURL + '?name=' + this.CreateListName + '&description=' + this.CreateListDescription, "").subscribe(res => {
        console.log(res);
        window.alert("Liste créée !");
        this.requestAPI(); //On recharge les listes
        this.ngxSmartModalService.getModal('modCreateList').close() //On ferme la fenêtre modale
      });

      //On réinitialise les valeurs du formulaire
      this.CreateListName = "";
      this.CreateListDescription = "";
    } else {
      window.alert("La liste doit posséder un nom !");
    }
  }

  /* Permet d'accéder à la liste sélectionnée  */
  public btnNext() {
    if (this.selectedList[0] >= 0) {
      localStorage.setItem('selectedList[0]', this.selectedList[0]);
      localStorage.setItem('selectedList[1]', this.selectedList[1]);
      localStorage.setItem('selectedList[2]', this.selectedList[2]);
      this.router.navigate(['/liste']);
    } else {
      window.alert("Aucune liste sélectionnée !");
    }
  }

  /* Permet d'ouvrir la fenêtre d'édition des informations d'une liste */
  public btnEdit_Open() {
    if (this.selectedList[0] >= 0) {
      this.ngxSmartModalService.getModal('modEditList').open();
    } else {
      window.alert("Aucune liste sélectionnée !");
    }
  }

  /* Permet de valider l'édition des informations d'une liste */
  public btnEdit_Validate() {
    if (this.selectedList[0] >= 0) {
      var partialURL: string = "/list/" + this.selectedList[0]; //On complète l'url

      //On supprime les espaces avant et après les strings récupérés
      this.selectedList[1] = this.selectedList[1].trim();
      this.selectedList[2] = this.selectedList[2].trim();

      if (this.selectedList[1] != "") {
        //Appel API
        this.http.put(apiURL + partialURL + '?name=' + this.selectedList[1] + '&description=' + this.selectedList[2], "").subscribe(res => {
          console.log(res);
          window.alert("Informations modifiées !");
          this.requestAPI(); //On recharge les listes
          this.ngxSmartModalService.getModal('modEditList').close() //On ferme la fenêtre modale
        });
      } else {
        window.alert("La liste doit posséder un nom !");
      }
    } else {
      window.alert("Aucune liste sélectionnée !");
    }
  }

  /* Permet de supprimer la liste sélectionnée */
  public btnDelete() {
    if (this.selectedList[0] >= 0) {
      var partialURL: string = "/list/" + this.selectedList[0]; //On complète l'url

      //Appel API
      this.http.delete(apiURL + partialURL).subscribe(res => {
        console.log(res);
        window.alert("La liste sélectionnée vient d'être supprimée !");
        this.requestAPI(); //On recharge les listes
      });
    } else {
      window.alert("Aucune liste sélectionnée !");
    }
  }

}
