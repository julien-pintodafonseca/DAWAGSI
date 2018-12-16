import { Component, OnInit } from "@angular/core";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../../services/config.service'

const apiURL: string = new ConfigService().ApiURL(); //API BDD base url (sans l'extension de requête)
const apiUploadImageURL: string = new ConfigService().ApiUploadImageURL(); //API Upload Image file url

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.css"]
})
export class UploadImageComponent implements OnInit {
  private selectedList: Array<any> = new Array<any>(); //liste

  private uploader: FileUploader = new FileUploader({ url: apiUploadImageURL, itemAlias: 'image' });

  private info: string;
  private succes: number;
  private echec: number;

  /* Constructeur */
  constructor(
    private http: HttpClient
  ) { }

  /* ngOnInit */
  public ngOnInit() {
    //On récupère les données locales concernant la liste
    this.selectedList[0] = localStorage.getItem('selectedList[0]'); //id
    this.selectedList[1] = localStorage.getItem('selectedList[1]'); //nom
    this.selectedList[2] = localStorage.getItem('selectedList[2]'); //description

    this.info = "";
    this.succes = 0;
    this.echec = 0;

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //console.log('ImageUpload:', item, status, response);

      if (JSON.parse(response).status) {
        this.succes++;
        this.info = JSON.parse(response).originalName + " - Image mise en ligne avec succès !";
      } else {
        this.echec++;
        this.info = "Type de fichier non autorisé !";
      }

      //Appel API
      this.http.post(apiURL + "/image/create" + '?list=' + this.selectedList[0] + '&originalName=' + JSON.parse(response).originalName + '&generatedName=' + JSON.parse(response).generatedName, "").subscribe(res => console.log(res));
    };
  }

  public resetInfo() {
    this.info = "";
    this.succes = 0;
    this.echec = 0;
  }

}
