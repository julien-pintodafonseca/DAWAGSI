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

  private annotations: any; //Les différentes annotations contenues dans la BDD pour l'image sélectionnée (résultat d'un appel API)
  private htmlAnnotations: Array<object>; //Permet d'afficher les tags dans le code HTML
  private relations: any; //Les différentes relations contenues dans la BDD pour l'image sélectionnée (résultat d'un appel API)
  private htmlRelations: Array<object>; //Permet d'afficher les relations dans le code HTML

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
    var partialURL = "/image/selectAll"; //On complète l'url

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

      var partialURL = "/annotation/selectAll"; //On complète l'url
      //Appel API
      this.http.get<string>(apiURL + partialURL + '?image=' + this.selectedImage[0])
        .subscribe(res => {
          this.annotations = res; //On stock les différentes annotations
      });

      var partialURL = "/relation/selectAll"; //On complète l'url
      //Appel API
      this.http.get<string>(apiURL + partialURL + '?image=' + this.selectedImage[0])
        .subscribe(res => {
          this.relations = res; //On stock les différentes relations
      });
    }

    var timeout = 500; //Temps d'attente en millisecondes avant d'utiliser les données d'annotations
    
    this.htmlAnnotations = [];
    this.htmlRelations = [];

    ///On charge les données d'annotations et relations pour les afficher
    setTimeout(()=>{
      var nbAnnotations = this.annotations.length; //Nombre d'annotations
      //On parcourt toutes les annotations
      for (var i = 0; i < nbAnnotations; i++) {
        var myAnnotation = this.annotations[Object.keys(this.annotations)[i]]; //Annotation parcourue

        var id = myAnnotation[Object.keys(myAnnotation)[0]]; //id de l'annotation
        var image = myAnnotation[Object.keys(myAnnotation)[1]]; //id de l'image liée à l'annotation
        var tag = myAnnotation[Object.keys(myAnnotation)[2]]; //tag de l'annotation
        var x = myAnnotation[Object.keys(myAnnotation)[3]]; //position X de l'annotation
        var y = myAnnotation[Object.keys(myAnnotation)[4]]; //Position Y de l'annotation
        var width = myAnnotation[Object.keys(myAnnotation)[5]]; //Longueur de l'annotation
        var height = myAnnotation[Object.keys(myAnnotation)[6]]; //Hauteur de l'annotation

        this.htmlAnnotations.push({"id":id, "image":image, "tag":tag, "x":x, "y":y, "width":width, "height":height});
      }

      var nbRelations = this.relations.length; //Nombre de relations
      //On parcourt toutes les relations
      for (var i = 0; i < nbRelations; i++) {
        var myRelation = this.relations[Object.keys(this.relations)[i]]; //Relation parcourue

        var idr = myRelation[Object.keys(myRelation)[0]]; //id de la relation
        var image = myRelation[Object.keys(myRelation)[1]]; //id de l'image liée à la relation
        var predicate = myRelation[Object.keys(myRelation)[2]]; //prédicat de relation
        var annotation1 = myRelation[Object.keys(myRelation)[3]]; //id de la première annotation composant la relation
        var annotation2 = myRelation[Object.keys(myRelation)[4]]; //id de la seconde annotation composant la relation
        var annotation1obj;
        var annotation2obj;

        //On parcourt toutes les annotations
        for (var j = 0; j < nbAnnotations; j++) {
          var myAnnotation = this.annotations[Object.keys(this.annotations)[j]]; //Annotation parcourue
          var ida = myAnnotation[Object.keys(myAnnotation)[0]]; //id de l'annotation

          if (ida == annotation1) {
            annotation1obj = myAnnotation;
          }
          if (ida == annotation2) {
            annotation2obj = myAnnotation;
          }
        }

        this.htmlRelations.push({"id":idr, "image":image, "predicate":predicate, "annotation1":annotation1obj, "annotation2":annotation2obj});
      }
    }, timeout);
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

  /* Permet d'accéder à la page d'annotation de l'image sélectionnée  */
  public btnNext() {
    if (this.selectedImage[0] >= 0) {
      localStorage.setItem('selectedImage[0]', this.selectedImage[0]);
      localStorage.setItem('selectedImage[1]', this.selectedImage[1]);
      localStorage.setItem('selectedImage[2]', this.selectedImage[2]);
      localStorage.setItem('selectedImage[3]', this.selectedImage[3]);
      localStorage.setItem('selectedImage[4]', this.selectedImage[4]);
      this.router.navigate(['/annotation']);
      window.location.reload();
    } else {
      window.alert("Aucune image sélectionnée !");
    }
  }

  /* Permet de supprimer l'image sélectionnée */
  public btnDelete() {
    if (this.selectedImage[0] >= 0) {
      var partialURL: string = "/image/" + this.selectedImage[0]; //On complète l'url

      //Appel API
      this.http.delete(apiURL + partialURL).subscribe(res => {
        console.log(res);
        window.alert("L'image sélectionnée vient d'être supprimée !");
        this.requestAPI(); //On recharge les images
      });
    } else {
      window.alert("Aucune image sélectionnée !");
    }
  }

}
