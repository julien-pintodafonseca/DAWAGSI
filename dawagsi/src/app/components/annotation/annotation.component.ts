import { Component, OnInit, AfterViewInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../../services/config.service'

const apiURL: string = new ConfigService().ApiURL(); //API BDD base url (sans l'extension de requête)
const uploadsDirectoryURL: string = new ConfigService().UploadsDirectoryURL(); //Uploads directory url

declare var anno: any; //anno est déjà défini dans le script annotorious

@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.css"]
})
export class AnnotationComponent implements OnInit, AfterViewInit {
  private selectedImage: Array<any> = new Array<any>(); //image

  private annotations: any; //Les différentes annotations contenues dans la BDD pour l'image sélectionnée (résultat d'un appel API)
  private htmlAnnotations: Array<object>; //Permet d'afficher les tags dans le code HTML
  private selectedAnnotation: object = {"id":"", "image":"", "tag":"", "x":"", "y":"", "width":"", "height":""}; //Annotation sélectionnée (listbox)
  private relations: any; //Les différentes relations contenues dans la BDD pour l'image sélectionnée (résultat d'un appel API)
  private htmlRelations: Array<object>; //Permet d'afficher les relations dans le code HTML
  private selectedRelation: object = {"id":"", "image":"", "predicate":"", "annotation1":"", "annotation2":""}; //Relation sélectionnée (listbox)

  private uploadsDirectoryURL = uploadsDirectoryURL; //lien vers le dossier d'uploads (variable utilisée dans le html du composant)

  /* Constructeur */
  constructor(
    private http: HttpClient
  ) { }

  /* ngOnInit */
  ngOnInit() {
    //On récupère les données locales concernant la liste
    this.selectedImage[0] = localStorage.getItem('selectedImage[0]'); //id
    this.selectedImage[1] = localStorage.getItem('selectedImage[1]'); //idListe
    this.selectedImage[2] = localStorage.getItem('selectedImage[2]'); //nomOriginal
    this.selectedImage[3] = localStorage.getItem('selectedImage[3]'); //nomMd5
    this.selectedImage[4] = localStorage.getItem('selectedImage[4]'); //idEditeur

    //----------

    /* Event déclenché lors de la création d'une annotation */
    anno.addHandler('onAnnotationCreated', function (annotation) {
      var partialURL: string = "/annotation/create"; //On complète l'url
      var selectedImageID = localStorage.getItem('selectedImage[0]');
      var selectedImageNomMd5 = localStorage.getItem('selectedImage[3]');
      var tag = annotation.text; //Valeur du tag (texte)
      var x = JSON.stringify(annotation.shapes[0].geometry.x); //Position X de l'annotation
      var y = JSON.stringify(annotation.shapes[0].geometry.y); //Position Y de l'annotation
      var width = JSON.stringify(annotation.shapes[0].geometry.width); //Longueur de l'annotation
      var height = JSON.stringify(annotation.shapes[0].geometry.height); //Hauteur de l'annotation
      var end = false;

      //Appel API via JS
      var Http = new XMLHttpRequest();
      Http.open("POST", apiURL + partialURL + "?image=" + selectedImageID + "&tag=" + tag + "&x=" + x+ "&y=" + y+ "&width=" + width+ "&height=" + height);
      Http.send();
      Http.onreadystatechange = function() {
        if (Http.readyState == 4 && Http.status == 200) {
          if (!end) {
            console.log("-----");
            console.log("Annotation créée !");
            console.log("Image : " + uploadsDirectoryURL + "/" + selectedImageNomMd5);
            console.log("Tag : " + tag);
            console.log("X : " + x);
            console.log("Y : " + y);
            console.log("Width : " + width);
            console.log("Height : " + height);
            //console.log(Http.responseText)
            console.log("-----");
            end = true;
          }
        }
      };
    });

    //----------

    /* Event déclenché lors de la suppression d'une annotation */
    anno.addHandler('onAnnotationRemoved', function (annotation) {
      var partialURL: string = "/annotation/find"; //On complète l'url
      var selectedImageID = localStorage.getItem('selectedImage[0]');
      var x = annotation.shapes[0].geometry.x; //Position X de l'annotation
      var y = annotation.shapes[0].geometry.y; //Position Y de l'annotation
      var width = annotation.shapes[0].geometry.width; //Longueur de l'annotation
      var height = annotation.shapes[0].geometry.height; //Hauteur de l'annotation

      var end1 = false;

      //Appel API via JS
      var Http = new XMLHttpRequest();
      Http.open("GET", apiURL + partialURL + '?image=' + selectedImageID + "&x=" + x+ "&y=" + y+ "&width=" + width+ "&height=" + height);
      Http.send();      
      Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
          if (!end1) {
            var res = JSON.parse(Http.response); //Convert response string to JSON object
            var annotationID = res[Object.keys(res)[0]]; //On récupère l'ID de l'annotation à supprimer
            var partialURL: string = "/annotation/" + annotationID; //On complète l'url

            var end2 = false;

            //Appel API via JS
            var Http2 = new XMLHttpRequest();
            Http2.open("DELETE", apiURL + partialURL);
            Http2.send();
            Http2.onreadystatechange = function() {
              if (Http2.readyState == 4 && Http2.status == 200) {
                if (!end2) {
                  var selectedImageNomMd5 = localStorage.getItem('selectedImage[3]');
                  var tag = annotation.text;
                  var position = JSON.stringify(annotation.shapes);

                  console.log("-----");
                  console.log("Annotation supprimée !");
                  console.log("Image : " + uploadsDirectoryURL + "/" + selectedImageNomMd5);
                  console.log("Tag : " + tag);
                  console.log("Position : " + position);
                  //console.log(Http.responseText)
                  console.log("-----");

                  end2 = true;
                }
              }
            };

            end1 = true;
          }
        }
      };
    });

    //----------

    anno.addHandler('onAnnotationUpdated', function (annotation) {
      var partialURL: string = "/annotation/find"; //On complète l'url
      var selectedImageID = localStorage.getItem('selectedImage[0]');
      var x = annotation.shapes[0].geometry.x; //Position X de l'annotation
      var y = annotation.shapes[0].geometry.y; //Position Y de l'annotation
      var width = annotation.shapes[0].geometry.width; //Longueur de l'annotation
      var height = annotation.shapes[0].geometry.height; //Hauteur de l'annotation

      var end1 = false;

      //Appel API via JS
      var Http = new XMLHttpRequest();
      Http.open("GET", apiURL + partialURL + '?image=' + selectedImageID + "&x=" + x+ "&y=" + y+ "&width=" + width+ "&height=" + height);
      Http.send();      
      Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
          if (!end1) {
            var res = JSON.parse(Http.response); //Convert response string to JSON object
            var annotationID = res[Object.keys(res)[0]]; //On récupère l'ID de l'annotation à supprimer
            var partialURL: string = "/annotation/" + annotationID; //On complète l'url
            var tag = annotation.text; //Tag de l'annotation (texte)

            var end2 = false;

            //Appel API via JS
            var Http2 = new XMLHttpRequest();
            Http2.open("PUT", apiURL + partialURL + '?image=' + selectedImageID + '&tag=' + tag + "&x=" + x+ "&y=" + y+ "&width=" + width+ "&height=" + height);
            Http2.send();
            Http2.onreadystatechange = function() {
              if (Http2.readyState == 4 && Http2.status == 200) {
                if (!end2) {
                  var selectedImageNomMd5 = localStorage.getItem('selectedImage[3]');
                  var tag = annotation.text;
                  var position = JSON.stringify(annotation.shapes);

                  console.log("-----");
                  console.log("Annotation modifiée !");
                  console.log("Image : " + uploadsDirectoryURL + "/" + selectedImageNomMd5);
                  console.log("Tag : " + tag);
                  console.log("Position : " + position);
                  //console.log(Http.responseText)
                  console.log("-----");

                  end2 = true;
                }
              }
            };

            end1 = true;
          }
        }
      };
    });

    //----------

    this.requestAPI(); //On charge les annotations déjà existantes (1: requête bdd)
  }

  /* ngAfterViewInit() */
  ngAfterViewInit() {
    var timeout = 500; //Temps d'attente en millisecondes avant de charger les annotations (le script Annotorious doit avoir fini de s'executer sur la page !)

    ///On charge les annotations déjà existantes (2: angular)
    setTimeout(()=>{
      this.load();
    }, timeout);
  }

  /* Permet d'obtenir les différentes annotations contenues dans la BDD pour l'image selectionnée */
  public requestAPI() {
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

  /* Permet de charger les différentes annotations et relations à afficher */
  public load() {
    var nbAnnotations = this.annotations.length; //Nombre d'annotations
    var webPageAnnotations = anno.getAnnotations(uploadsDirectoryURL + "/" + this.selectedImage[3]); //Liste des annotations déjà chargées (= présentes sur la page web)

    this.htmlAnnotations = [];

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

      var alreadyLoaded = false;

      //On vérifie si l'annotation a déjà été chargée ou non
      for (var j = 0; j < webPageAnnotations.length; j++) {
        var x2 = webPageAnnotations[j].shapes[0].geometry.x;
        var y2 = webPageAnnotations[j].shapes[0].geometry.y;
        var width2 = webPageAnnotations[j].shapes[0].geometry.width;
        var height2 = webPageAnnotations[j].shapes[0].geometry.height;

        if (x == x2 && y == y2 && width == width2 && height == height2) {
          alreadyLoaded = true;
        }
      }

      //Si l'annotation n'a pas déjà été chargée, on la charge
      if (!alreadyLoaded) {
        //Création de l'annotation sur la page
        var newAnnotation = {
          "src": uploadsDirectoryURL + "/" + this.selectedImage[3],
          "text": tag,
          "shapes": [
            {
              "type": "rect",
              "geometry": {
                "x": x,
                "y": y,
                "width": width,
                "height": height
              },
              "style": {}
            }
          ]
        };

        //Ajout de l'annotation sur la page
        anno.addAnnotation(newAnnotation);
        console.log("-----");
        console.log("Annotation chargée :");
        console.log("Image : " + newAnnotation.src);
        console.log("Tag : " + newAnnotation.text);
        console.log("Position : " + JSON.stringify(newAnnotation.shapes));
        console.log("-----");
      }
    }

    var nbRelations = this.relations.length; //Nombre de relations

    this.htmlRelations = [];

    //On parcourt toutes les relations
    for (var i = 0; i < nbRelations; i++) {
      var myRelation = this.relations[Object.keys(this.relations)[i]]; //Relation parcourue

      var id = myRelation[Object.keys(myRelation)[0]]; //id de la relation
      var image = myRelation[Object.keys(myRelation)[1]]; //id de l'image liée à la relation
      var predicate = myRelation[Object.keys(myRelation)[2]]; //prédicat de relation
      var annotation1 = myRelation[Object.keys(myRelation)[3]]; //id de la première annotation composant la relation
      var annotation2 = myRelation[Object.keys(myRelation)[4]]; //id de la seconde annotation composant la relation
      var annotation1obj;
      var annotation2obj;

      //On parcourt toutes les annotations
      for (var i = 0; i < nbAnnotations; i++) {
        var myAnnotation = this.annotations[Object.keys(this.annotations)[i]]; //Annotation parcourue
        var id = myAnnotation[Object.keys(myAnnotation)[0]]; //id de l'annotation

        if (id == annotation1) {
          annotation1obj = myAnnotation;
        }
        if (id == annotation2) {
          annotation2obj = myAnnotation;
        }
      }

      this.htmlRelations.push({"id":id, "image":image, "predicate":predicate, "annotation1":annotation1obj, "annotation2":annotation2obj});
    }
  }

  /* Permet d'actualiser la page */
  public btnRefresh() {
    window.location.reload();
  }

}
