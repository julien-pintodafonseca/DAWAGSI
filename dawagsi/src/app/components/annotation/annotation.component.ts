import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../../services/config.service'

const apiURL: string = new ConfigService().ApiURL(); //API BDD base url (sans l'extension de requête)
const uploadsDirectoryURL: string = new ConfigService().UploadsDirectoryURL(); //Uploads directory url

declare var anno: any; //anno est déjà défini dans le script annotorious
const Http = new XMLHttpRequest(); //requêtes API via JS

@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.css"]
})
export class AnnotationComponent implements OnInit {
  private selectedImage: Array<any> = new Array<any>(); //image

  private annotations: any; //Les différentes annotations contenues dans la BDD pour l'image sélectionnée (résultat d'un appel API)

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

    // cf https://github.com/annotorious/annotorious/wiki/JavaScript-API

    /* Event déclenché lors de la création d'une annotation */
    anno.addHandler('onAnnotationCreated', function (annotation) {
      var selectedImageID = localStorage.getItem('selectedImage[0]');
      var selectedImageNomMd5 = localStorage.getItem('selectedImage[3]');
      var tag = annotation.text; //Valeur du tag (texte)
      var position = JSON.stringify(annotation.shapes); //Position du tag (données de position)
      var end = false;

      Http.open("POST", apiURL + "/annotation/create" + "?image=" + selectedImageID + "&tag=" + tag + "&position=" + position);
      Http.send();
      Http.onreadystatechange = (e) => {
        if (!end) {
          console.log("-----");
          console.log("Annotation créée !");
          console.log("Image : " + uploadsDirectoryURL + "/" + selectedImageNomMd5);
          console.log("Tag : " + tag);
          console.log("Position : " + position);
          //console.log(Http.responseText)
          console.log("-----");
          end = true;
        }
      }
    });

    /* Event déclenché lors de la suppression d'une annotation */
    anno.addHandler('onAnnotationRemoved', function (annotation) {
      var partialURL: string = "/annotation/find"; //On complète l'url
      var position = JSON.stringify(annotation.shapes); //Position du tag (données de position)

      //Appel API
      this.http.find(apiURL + partialURL + '?image=' + this.selectedImage[0] + '&position=' + position).subscribe(res => {
        var annotationID = res.id; //ID de l'annotation
        var partialURL: string = "/annotation/delete/" + annotationID; //On complète l'url

        var selectedImageNomMd5 = localStorage.getItem('selectedImage[3]');
        var tag = annotation.text; //Valeur du tag (texte)
        var position = JSON.stringify(annotation.shapes); //Position du tag (données de position)

        //Appel API
        this.http.delete(apiURL + partialURL).subscribe(res => {
          console.log("-----");
          console.log("Annotation supprimée !");
          console.log("Image : " + uploadsDirectoryURL + "/" + selectedImageNomMd5);
          console.log("Tag : " + tag);
          console.log("Position : " + position);
          console.log(res);
          console.log("-----");
        });
      });
    });

    anno.addHandler('onAnnotationUpdated', function (annotation) {
      console.log("-----");
      console.log("Annotation modifiée :");
      console.log("Image : " + annotation.src);
      console.log("Tag : " + annotation.text);
      console.log("Position : " + JSON.stringify(annotation.shapes));
      console.log("-----");

      // ++Modifier le tag de l'annotation dans la bdd
    });

    this.requestAPI(); //On charge les annotations déjà existantes

  }

  /* Permet d'obtenir les différentes annotations contenues dans la BDD pour l'image selectionnée */
  public requestAPI() {
    var partialURL = "/annotations/selectAll"; //On complète l'url

    //Appel API
    this.http.get<string>(apiURL + partialURL + '?image=' + this.selectedImage[0])
      .subscribe(res => {
        this.annotations = res; //On stock les différentes annotations
      });
  }

  /* Permet de charger les différentes annotations à afficher */
  public load() {
    var nbAnnotations = this.annotations.length; //Nombre d'annotations

    //On parcourt toutes les annotations
    for (var i = 0; i < nbAnnotations; i++) {
      var myAnnotation = this.annotations[Object.keys(this.annotations)[i]]; //Annotation parcourue

      var id = myAnnotation[Object.keys(myAnnotation)[0]]; //id de l'annotation
      var image = myAnnotation[Object.keys(myAnnotation)[1]]; //id de l'image liée à l'annotation
      var tag = myAnnotation[Object.keys(myAnnotation)[2]]; //tag de l'annotation
      var position = myAnnotation[Object.keys(myAnnotation)[3]]; //position de l'annotation

      /* Convert JSON to Object */
      position = JSON.parse(position);
      position = position[Object.keys(position)[0]];

      var type = position[Object.keys(position)[0]];
      var geometry = position[Object.keys(position)[1]];

      var x = geometry[Object.keys(geometry)[0]];
      var y = geometry[Object.keys(geometry)[1]];
      var width = geometry[Object.keys(geometry)[2]];
      var height = geometry[Object.keys(geometry)[3]];

      //Création de l'annotation sur la page
      var newAnnotation = {
        "src": uploadsDirectoryURL + "/" + this.selectedImage[3],
        "text": tag,
        "shapes": [
          {
            "type": type,
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

}
