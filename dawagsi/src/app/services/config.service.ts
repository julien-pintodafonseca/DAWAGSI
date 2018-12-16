import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiURL: string = "http://skydefr.com/ptut/api/slim"; //Base URL API BDD (sans l'extension de requête)
  private apiUploadImageURL: string = "http://skydefr.com/ptut/api/upload-image.php"; //Base URL API Upload Image

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

}
