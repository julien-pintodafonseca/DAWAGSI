import { Component, OnInit } from "@angular/core";

declare var anno: any;

@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.css"]
})
export class AnnotationComponent implements OnInit {
  myAnnotation: any;
  src: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;

  /* Constructeur */
  constructor() { }

  /* ngOnInit */
  ngOnInit() {
    // cf https://github.com/annotorious/annotorious/wiki/JavaScript-API

    anno.addHandler('onAnnotationCreated', function (annotation) {
      console.log("-----");
      console.log("Annotation créée :");
      console.log("Image : " + annotation.src);
      console.log("Tag : " + annotation.text);
      console.log("Position : " + JSON.stringify(annotation.shapes));
      console.log("-----");

      // ++Sauvegarder l'annotation dans la bdd
    });

    anno.addHandler('onAnnotationRemoved', function (annotation) {
      console.log("-----");
      console.log("Annotation supprimée :");
      console.log("Image : " + annotation.src);
      console.log("Tag : " + annotation.text);
      console.log("Position : " + JSON.stringify(annotation.shapes));
      console.log("-----");

      // ++Supprimer l'annotation de la bdd
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
