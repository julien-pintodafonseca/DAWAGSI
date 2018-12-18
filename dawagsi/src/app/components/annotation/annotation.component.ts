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

  private uploadsDirectoryURL = uploadsDirectoryURL; //lien vers le dossier d'uploads (variable utilisée dans le html du composant)

  myAnnotation: any;
  src: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;

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
      var selectedImageNomOriginal = localStorage.getItem('selectedImage[2]');
      var tag = annotation.text; //Valeur du tag (texte)
      var position = JSON.stringify(annotation.shapes); //Position du tag (données de position)
      var end = false;

      Http.open("POST", apiURL + "/annotation/create" + "?image=" + selectedImageID + "&tag=" + tag + "&position=" + position);
      Http.send();
      Http.onreadystatechange = (e) => {
        if (!end) {
          console.log("-----");
          console.log("Annotation créée !");
          console.log("Image : " + selectedImageNomOriginal);
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
        var tag = annotation.text; //Valeur du tag (texte)
        var position = JSON.stringify(annotation.shapes); //Position du tag (données de position)

        //Appel API
        this.http.delete(apiURL + partialURL).subscribe(res => {
          console.log("-----");
          console.log("Annotation supprimée !");
          console.log("Image : " + this.selectedImage[2]);
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
  }

  public loadAnnotations() {
    // ++Charger les infos de la bdd 

    /* Annotation 1 */
    this.src = './assets/ressources/cat.jpg';
    this.text = 'cuillère';
    this.x = 0.4099173553719008;
    this.y = 0.628099173553719;
    this.width = 0.5867768595041323;
    this.height = 0.128099173553719;

    // Création de l'annotation
    this.myAnnotation = {
      "src": this.src,
      "text": this.text,
      "shapes": [
        {
          "type": "rect",
          "geometry": {
            "x": this.x,
            "y": this.y,
            "width": this.width,
            "height": this.height
          },
          "style": {}
        }
      ]
    };

    // Ajout de l'annotation
    anno.addAnnotation(this.myAnnotation);
    console.log("-----");
    console.log("Annotation chargée :");
    console.log("Image : " + this.myAnnotation.src);
    console.log("Tag : " + this.myAnnotation.text);
    console.log("Position : " + JSON.stringify(this.myAnnotation.shapes));
    console.log("-----");

    /* Annotation 2 */
    this.src = './assets/ressources/cat.jpg';
    this.text = 'gamelle';
    this.x = 0.2413223140495868;
    this.y = 0.6060606060606061;
    this.width = 0.7570247933884298;
    this.height = 0.3925619834710744;

    // Création de l'annotation
    this.myAnnotation = {
      "src": this.src,
      "text": this.text,
      "shapes": [
        {
          "type": "rect",
          "geometry": {
            "x": this.x,
            "y": this.y,
            "width": this.width,
            "height": this.height
          },
          "style": {}
        }
      ]
    };

    // Ajout de l'annotation
    anno.addAnnotation(this.myAnnotation);
    console.log("-----");
    console.log("Annotation chargée :");
    console.log("Image : " + this.myAnnotation.src);
    console.log("Tag : " + this.myAnnotation.text);
    console.log("Position : " + JSON.stringify(this.myAnnotation.shapes));
    console.log("-----");
  }

}
