import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user', //nom de la balise permettant d'utiliser le composant
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name: string;
  age: number;
  email: string;
  hobby: Hobby;

  constructor(private data: DataService) {
    this.name = "Julien";
    this.age = 19;
    this.email = "contact@skydefr.com";
    this.hobby = {
      hobbyOne: "Fishing",
      hobbyTwo: "Photography",
      hobbyThree: "Drawing"
    }
  }

  ngOnInit() { }

  onClick() {
    alert("Aucune information supplémentaire pour le moment !");
  }

}

interface Hobby {
  hobbyOne: string;
  hobbyTwo: string;
  hobbyThree: string;
}
