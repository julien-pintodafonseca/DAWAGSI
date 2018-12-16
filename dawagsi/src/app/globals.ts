import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    apiURL: string = "http://skydefr.com/ptut/api/slim"; //Base URL API

    selectedList: Array<any> = new Array<any>(); //liste selectionnée
    selectedImage: any; //image selectionnée

    public ApiURL() {
        return this.apiURL;
    }

    public iniList() {
        this.selectedList[0] = -1;
        this.selectedList[1] = "-";
        this.selectedList[2] = "-";
    }

    public selectList(id, name, description) {
        this.selectedList[0] = id;
        this.selectedList[1] = name;
        this.selectedList[2] = description;
    }

    public SelectedList() {
        return this.selectedList;
    }

    public iniImage() {
        this.selectedImage = null;
    }

    public SelectedImage() {
        return this.SelectedImage;
    }
}