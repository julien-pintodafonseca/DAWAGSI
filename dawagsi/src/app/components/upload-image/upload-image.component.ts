import { Component, OnInit } from "@angular/core";
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';

// Chemin vers pload-image.php
const URL = './../api/upload-image.php';

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.css"]
})
export class UploadImageComponent implements OnInit {
  info: string = '';
  succes: number = 0;
  echec: number = 0;

  constURL: string = "http://skydefr.com/ptut/api/slim";

  constructor(private http: HttpClient) { }

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'image' });

  ngOnInit() {
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
      this.http.post(this.constURL + "/image/create" + '?list=1&originalName=' + JSON.parse(response).originalName + '&generatedName=' + JSON.parse(response).generatedName, "").subscribe(res => console.log(res));
    };
  }

  resetInfo() {
    this.succes = 0;
    this.echec = 0;
    this.info = "";
  }

}
