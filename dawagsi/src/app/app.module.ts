import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxSmartModalModule } from "ngx-smart-modal";
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './services/config.service';

import { AppComponent } from "./app.component";
import { HomeComponent } from './components/home/home.component';
import { LibraryComponent } from "./components/library/library.component";
import { ListComponent } from "./components/list/list.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
import { AnnotationComponent } from "./components/annotation/annotation.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

@NgModule({
  /* composants */
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent,
    ListComponent,
    UploadImageComponent,
    AnnotationComponent,
    NavigationComponent,
    PageNotFoundComponent
  ],
  /* modules */
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    NgxSmartModalModule.forRoot(),
    HttpClientModule
  ],
  /* services */
  providers: [ConfigService],
  /* autres */
  bootstrap: [AppComponent]
})
export class AppModule { }
