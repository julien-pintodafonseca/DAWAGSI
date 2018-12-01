import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constURL: string = "http://skydefr.com/ptut/api/slim";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    var partialURL = "";;
    var body = "";

    var name = "";
    var description = "";
    var images = "";

    partialURL = "/list";
    //this.http.get<string>(this.constURL + partialURL).subscribe(res => console.log(res));

    partialURL = "/list/selectAll";
    this.http.get<string>(this.constURL + partialURL).subscribe(res => console.log(res));

    partialURL = "/list/create";
    name = "NomAngular";
    description = "DescriptionAngular";
    //this.http.post(this.constURL + partialURL + '?name=' + name + '&description=' + description, body).subscribe(res => console.log(res));

    partialURL = "/list/1";
    //this.http.get<string>(this.constURL + partialURL).subscribe(res => console.log(res));

    partialURL = "/list/1";
    name = "NomAngularModifié";
    description = "DescriptionAngularModifiée";
    images = "1,2,3";
    //this.http.put(this.constURL + partialURL + '?name=' + name + '&description=' + description + '&images=' + images, body).subscribe(res => console.log(res));

    partialURL = "/list/2";
    //this.http.delete<string>(this.constURL + partialURL).subscribe(res => console.log(res));
  }

}
