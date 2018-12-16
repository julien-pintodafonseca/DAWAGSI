import { Component, OnInit } from "@angular/core";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../../services/config.service'

const apiURL: string = new ConfigService().ApiURL(); //Base URL API BDD
const apiUploadImageURL: string = new ConfigService().ApiUploadImageURL(); //Base URL API Upload Image

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.css"]
})
export class UploadImageComponent implements OnInit {
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
    this.info = "";
    this.succes = 0;
    this.echec = 0;

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:', item, status, response);

      if (JSON.parse(response).status) {
        this.succes++;
        this.info = JSON.parse(response).originalName + " - Image mise en ligne avec succès !";
      } else {
        this.echec++;
        this.info = "Type de fichier non autorisé !";
      }

      //Appel API
      this.http.post(apiURL + "/image/create" + '?list=1&originalName=' + JSON.parse(response).originalName + '&generatedName=' + JSON.parse(response).generatedName, "").subscribe(res => console.log(res));
    };
  }

  public resetInfo() {
    this.succes = 0;
    this.echec = 0;
    this.info = "";
  }

}
