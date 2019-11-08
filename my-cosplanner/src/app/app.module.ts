import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Fake backend api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data/in-memory-data.service';

// Bootstrap components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectsListingComponent } from './projects-listing/projects-listing.component';
import { ProjectsDonePipe } from './projects-listing/pipe/projects-done.pipe';
import { ProjectsInProgressPipe } from './projects-listing/pipe/projects-in-progress.pipe';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddProjectModalComponent } from './projects-listing/modal/add-project-modal/add-project-modal.component';
import { EditProjectModalComponent } from './project-detail/modal/edit-project-modal/edit-project-modal.component';
import { AddProjectPurchaseModalComponent } from './project-detail/modal/add-project-purchase-modal/add-project-purchase-modal.component';
import { AddProjectTodoModalComponent } from './project-detail/modal/add-project-todo-modal/add-project-todo-modal.component';
import { EditProjectPurchaseModalComponent
  } from './project-detail/modal/edit-project-purchase-modal/edit-project-purchase-modal.component';
import { EditProjectTodoModalComponent } from './project-detail/modal/edit-project-todo-modal/edit-project-todo-modal.component';
import { ProjectItemComponent } from './projects-listing/project-item/project-item.component';
import { EmptyListComponent } from './project-detail/empty-list/empty-list.component';
import { ReferencePictureModalComponent } from './project-detail/modal/reference-picture-modal/reference-picture-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListingComponent,
    ProjectsDonePipe,
    ProjectsInProgressPipe,
    ProjectDetailComponent,
    AddProjectModalComponent,
    EditProjectModalComponent,
    AddProjectPurchaseModalComponent,
    AddProjectTodoModalComponent,
    EditProjectPurchaseModalComponent,
    EditProjectTodoModalComponent,
    ProjectItemComponent,
    EmptyListComponent,
    ReferencePictureModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddProjectModalComponent,
    EditProjectModalComponent,
    AddProjectPurchaseModalComponent,
    AddProjectTodoModalComponent,
    EditProjectPurchaseModalComponent,
    EditProjectTodoModalComponent,
    ReferencePictureModalComponent
  ]
})
export class AppModule { }
