import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { ConfigService } from '../../services/config.service'
import { NgxSmartModalService } from "ngx-smart-modal";

const apiURL: string = new ConfigService().ApiURL(); //API BDD base url (sans l'extension de requête)
const uploadsDirectoryURL: string = new ConfigService().UploadsDirectoryURL(); //Uploads directory url

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  private selectedList: Array<any> = new Array<any>(); //liste

  private images: any; //Les différentes images contenues dans la BDD (résultat d'un appel API)
  private current_page: number; //Page actuelle (1 page = 3 listes à afficher)
  private nbPages: number; //Nombre de pages au total (calculé en fonction du nombre de listes)
  private defaultValue; //Valeur par défaut à afficher pour l'auteur

  private image1: Array<any> = new Array<any>(); //1ère image à afficher
  private image2: Array<any> = new Array<any>(); //2ème image à afficher
  private image3: Array<any> = new Array<any>(); //3ème image à afficher
  private selectedImage: Array<any> = new Array<any>(); //image selectionnée
  private selectedImagePreviewURL; //préview par défaut
  private uploadsDirectoryURL = uploadsDirectoryURL; //lien vers le dossier d'uploads (variable utilisée dans le html du composant)

  /* Constructeur de la bibliothèque */
  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private http: HttpClient,
    private router: Router
  ) { }

  /* ngOnInit */
  ngOnInit() {
    //On récupère les données locales concernant la liste
    this.selectedList[0] = localStorage.getItem('selectedList[0]'); //id
    this.selectedList[1] = localStorage.getItem('selectedList[1]'); //nom
    this.selectedList[2] = localStorage.getItem('selectedList[2]'); //description

    this.current_page = 1; //Page actuelle par défaut = 1
    this.defaultValue = "/"; //Valeur par défaut à afficher pour l'auteur
    this.uploadsDirectoryURL = uploadsDirectoryURL; //lien vers le dossier d'uploads (variable utilisée dans le html du composant)

    this.requestAPI(); //On charge les images
  }

  /* Permet d'obtenir les différentes images contenues dans la BDD */
  public requestAPI() {
    var partialURL = "/images/selectAll"; //On complète l'url

    //Appel API
    this.http.get<string>(apiURL + partialURL + '?list=' + this.selectedList[0])
      .subscribe(res => {
        this.images = res; //On stock les différentes listes
        this.init(); //On réinitialise les variables
        this.load(); //Chargement des informations à afficher
      });
  }

  /* Permet de réinitialiser les variables utilisées pour gérer les différentes listes */
  public init() {
    this.nbPages = 1; //Nombre de page au total avant calcul = 1
    this.selectedImagePreviewURL = "./assets/ressources/image.png"; //préview par défaut

    //On supprime les données locales concernant les images
    localStorage.removeItem('selectedImage[0]');
    localStorage.removeItem('selectedImage[1]');
    localStorage.removeItem('selectedImage[2]');
    localStorage.removeItem('selectedImage[3]');
    localStorage.removeItem('selectedImage[4]');
    localStorage.removeItem('selectedImage[5]');

    //1ère image
    this.image1[0] = "hidden";
    this.image1[1] = -1;
    this.image1[2] = this.selectedList[0];
    this.image1[3] = this.defaultValue;
    this.image1[4] = this.defaultValue;
    this.image1[5] = this.defaultValue;

    //2ème image
    this.image2[0] = "hidden";
    this.image2[1] = -1;
    this.image2[2] = this.selectedList[0];
    this.image2[3] = this.defaultValue;
    this.image2[4] = this.defaultValue;
    this.image2[5] = this.defaultValue;

    //3ème image
    this.image3[0] = "hidden";
    this.image3[1] = -1;
    this.image3[2] = this.selectedList[0];
    this.image3[3] = this.defaultValue;
    this.image3[4] = this.defaultValue;
    this.image3[5] = this.defaultValue;

    //image selectionnée
    this.selectedImage[0] = -1;
    this.selectedImage[1] = this.selectedList[0];
    this.selectedImage[2] = this.defaultValue;
    this.selectedImage[3] = this.defaultValue;
    this.selectedImage[4] = this.defaultValue;
  }

  /* Permet de charger les informations des différentes images à afficher */
  public load() {
    var nbImages = this.images.length; //Nombre d'images
    var orderList = 0; //Variable de travail permettant de connaitre l'ordre d'affichage (1ère, 2ème ou 3ème image à afficher)

    this.nbPages = Math.ceil(nbImages / 3); //Calcul du nombre total de pages 

    //La page actuelle ne peux pas être supérieure au nombre total de pages
    if (this.current_page > this.nbPages) {
      this.current_page = this.nbPages;
    }

    //On parcourt toutes les images
    for (var i = 0; i < nbImages; i++) {
      var page = Math.ceil((i + 1) / 3); //Calcul de la page par rapport au numéro de liste
      var myImage = this.images[Object.keys(this.images)[i]]; //Liste parcourue

      //Si la page parcourue correspond à la page actuelle à afficher
      if (page == this.current_page) {
        var id = myImage[Object.keys(myImage)[0]]; //id de l'image à afficher
        var idListe = myImage[Object.keys(myImage)[1]]; //id de la liste de l'image à afficher
        var nomOriginal = myImage[Object.keys(myImage)[2]]; //nom original l'image à afficher
        var nomMd5 = myImage[Object.keys(myImage)[3]]; //nom md5 l'image à afficher
        var idEditeur = myImage[Object.keys(myImage)[4]]; //id de l'éditeur lié à l'image à afficher

        if (idEditeur == null || idEditeur == "") {
          idEditeur = this.defaultValue;
        }

        //On attribue les info à l'image à afficher (1ère, 2ème ou 3ème image selon l'ordre d'affichage)
        if (orderList < 3) {
          switch (orderList) {
            case 0:
              this.image1[0] = "visible";
              this.image1[1] = id;
              this.image1[2] = idListe;
              this.image1[3] = nomOriginal;
              this.image1[4] = nomMd5;
              this.image1[5] = idEditeur;

              this.image2[0] = "hidden";
              this.image2[1] = -1;
              this.image2[2] = this.selectedList[0];
              this.image2[3] = this.defaultValue;
              this.image2[4] = this.defaultValue;
              this.image2[5] = this.defaultValue;

              this.image3[0] = "hidden";
              this.image3[1] = -1;
              this.image3[2] = this.selectedList[0];
              this.image3[3] = this.defaultValue;
              this.image3[3] = this.defaultValue;
              this.image3[3] = this.defaultValue;
              break;
            case 1:
              this.image2[0] = "visible";
              this.image2[1] = id;
              this.image2[2] = idListe;
              this.image2[3] = nomOriginal;
              this.image2[4] = nomMd5;
              this.image2[5] = idEditeur;
              break;
            case 2:
              this.image3[0] = "visible";
              this.image3[1] = id;
              this.image3[2] = idListe;
              this.image3[3] = nomOriginal;
              this.image3[4] = nomMd5;
              this.image3[5] = idEditeur;
              break;
          }
          orderList++;
        } else {
          orderList = 0;
        }
      }
    }
  }

  /* Permet de changer l'image sélectionnée */
  public select(selectedID) {
    if (selectedID >= 0) {
      var nbImages = this.images.length; //Nombre d'images

      //On parcourt toutes les images
      for (var i = 0; i < nbImages; i++) {
        var myImage = this.images[Object.keys(this.images)[i]]; //Image parcourue

        var id = myImage[Object.keys(myImage)[0]]; //id de l'image parcourue
        var idListe = myImage[Object.keys(myImage)[1]]; //id de la liste de l'image parcourue
        var nomOriginal = myImage[Object.keys(myImage)[2]]; //nom original l'image parcourue
        var nomMd5 = myImage[Object.keys(myImage)[3]]; //nom md5 l'image parcourue
        var idEditeur = myImage[Object.keys(myImage)[4]]; //id de l'éditeur lié à l'image parcourue

        if (idEditeur == null || idEditeur == "") {
          idEditeur = this.defaultValue;
        }

        //Si l'image parcourue est l'image sélectionnée
        if (id == selectedID) {
          this.selectedImage[0] = id;
          this.selectedImage[1] = idListe;
          this.selectedImage[2] = nomOriginal;
          this.selectedImage[3] = nomMd5;
          this.selectedImage[4] = idEditeur;
          this.selectedImagePreviewURL = uploadsDirectoryURL + "/" + this.selectedImage[3];
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

  /* Permet d'ouvrir la fenêtre d'ajouts d'images à une liste */
  public btnAddImages_Open() {
    this.ngxSmartModalService.getModal('modUploadImages').open();
  }

}
