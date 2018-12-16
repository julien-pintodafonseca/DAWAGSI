import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LibraryComponent } from "./components/library/library.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ListComponent } from "./components/list/list.component";
import { AnnotationComponent } from "./components/annotation/annotation.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "accueil",
    pathMatch: "full"
  },
  {
    path: "accueil",
    component: HomeComponent
  },
  {
    path: "bibliotheque",
    component: LibraryComponent
  },
  {
    path: "liste",
    component: ListComponent
  },
  {
    path: "annotation",
    component: AnnotationComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
