import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Fake backend api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data/in-memory-data.service';

// Bootstrap components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectsListingComponent } from './projects-listing/projects-listing.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddProjectModalComponent } from './projects-listing/modal/add-project-modal/add-project-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListingComponent,
    ProjectDetailComponent,
    AddProjectModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddProjectModalComponent
  ]
})
export class AppModule { }
