import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})

export class UploadImageComponent implements OnInit {
  customStyle: any;

  constructor() {
    this.customStyle = {
      selectButton: {
        "color": "white",
        "background-color": "orange",
      },
      clearButton: {
        "display": "none"
      },
      layout: {
        "width": "100%"
      },
      previewPanel: {
        "background-color": "#FFF3E8",
      }
    };
  }

  ngOnInit() {

  }

}

