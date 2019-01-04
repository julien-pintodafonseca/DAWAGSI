import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiURL: string = "http://skydefr.com/projets/illumination/api/slim"; //API BDD base url (sans l'extension de requête)
  private apiUploadImageURL: string = "http://skydefr.com/projets/illumination/api/upload-image.php"; //API Upload Image file url
  private uploadsDirectoryURL: string = "http://skydefr.com/projets/illumination/uploads"; //Uploads directory url

  /* Constructeur */
  constructor() { }

  /* Getter apiURL */
  public ApiURL() {
    return this.apiURL;
  }

  /* Getter apiUploadImageURL */
  public ApiUploadImageURL() {
    return this.apiUploadImageURL;
  }

  /* Getter uploadsDirectoryURL */
  public UploadsDirectoryURL() {
    return this.uploadsDirectoryURL;
  }

}
