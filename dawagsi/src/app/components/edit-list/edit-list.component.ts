import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-edit-list",
  templateUrl: "./edit-list.component.html",
  styleUrls: ["./edit-list.component.css"]
})
export class EditListComponent implements OnInit {

  public name:string ="";
  public description:string = "";


  constructor()  {}
  
  ngOnInit() {}



  /**
   * modificationListe est l'action qui se déclanche lorsque l'utilisateur validera les nouvelles informations qu'il
   * souhaite attribuer à la liste.
   */
  public modificationListe() {

    alert(this.name);

  }
}
