import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-create-list-a",
  templateUrl: "./create-list-a.component.html",
  styleUrls: ["./create-list-a.component.css"]
})
export class CreateListAComponent implements OnInit {

  public name:string = "";
  public description:string = "";

  constructor(private http: HttpClient)  {}
  
  ngOnInit() {}



  /**
   * creationListe
   */
  public creationListe() {
    var constURL: string = "http://skydefr.com/ptut/api/slim";
    var partialURL: string = "/list/create";
    var body = "";

    if (this.name != "")
    {
      this.http.post(constURL + partialURL + '?name=' + this.name + '&description=' + this.description, body).subscribe(res => console.log(res));
      alert("Liste créée");
    }
    else
    {
      alert("Merci de donner un nom à votre liste !");
    }
  }
}


