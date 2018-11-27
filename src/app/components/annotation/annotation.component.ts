import { Component, OnInit } from "@angular/core";
declare var anno:any;


@Component({
  selector: "app-annotation",
  templateUrl: "./annotation.component.html",
  styleUrls: ["./annotation.component.css"]
})
export class AnnotationComponent implements OnInit {
  myAnnotation:any;
  src:string;
  text:string;
  x:number;
  y:number;
  width:number;
  height:number;

  constructor() { }

  ngOnInit() {
		// cf https://github.com/annotorious/annotorious/wiki/JavaScript-API
		
    anno.addHandler('onAnnotationCreated', function(annotation) {
		  console.log("-----");
		  console.log("Annotation créée :");
		  console.log("Image : "+annotation.src);
		  console.log("Tag : "+annotation.text);
		  console.log("Position : "+JSON.stringify(annotation.shapes));
      console.log("-----");
      
      // ++Sauvegarder l'annotation dans la bdd
    });

    anno.addHandler('onAnnotationRemoved', function(annotation) {
		  console.log("-----");
		  console.log("Annotation supprimée :");
		  console.log("Image : "+annotation.src);
		  console.log("Tag : "+annotation.text);
		  console.log("Position : "+JSON.stringify(annotation.shapes));
      console.log("-----");
      
      // ++Supprimer l'annotation de la bdd
    });
		
		anno.addHandler('onAnnotationUpdated', function(annotation) {
		  console.log("-----");
		  console.log("Annotation modifiée :");
		  console.log("Image : "+annotation.src);
		  console.log("Tag : "+annotation.text);
		  console.log("Position : "+JSON.stringify(annotation.shapes));
      console.log("-----");
      
      // ++Modifier le tag de l'annotation dans la bdd
    });
  }

  public loadAnnotations() {
    // ++Charger les infos de la bdd 
    this.src = 'http://localhost:4200/assets/ressources/test.jpg';
    this.text = 'test';
    this.x = 0.434375;
    this.y = 0.4375;
    this.width = 0.1421875;
    this.height = 0.205;

    // Création de l'annotation
		this.myAnnotation ={
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
  }
  
}
