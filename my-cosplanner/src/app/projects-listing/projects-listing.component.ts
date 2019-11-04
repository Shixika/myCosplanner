import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Project } from '../service/project/project';
import { ProjectService } from '../service/project/project.service';
import { AddProjectModalComponent } from './modal/add-project-modal/add-project-modal.component';

@Component({
  selector: 'app-projects-listing',
  templateUrl: './projects-listing.component.html',
  styleUrls: ['./projects-listing.component.scss'],
  providers: [NgbTypeaheadConfig]
})

export class ProjectsListingComponent implements OnInit {
  projects: Project[];
  searchInput: string;
  projectsName: Array<string> = [];
  projectSearch: Project[];
  public isCollapsedProjectsDone = true;
  isCollapsedProjectsInProgress = false;

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal,
    config: NgbTypeaheadConfig ) {
    config.showHint = true;
  }

  openAddProjectModal() {
    const modalRef = this.modalService.open(AddProjectModalComponent);
    modalRef.componentInstance.projects = this.projects;
    modalRef.componentInstance.projectsName = this.projectsName;
    modalRef.result
      .then(
        () => this.clearSearch(),
        () => console.log('Cancel modal')
      );
  }

  clearSearch() {
    this.searchInput = '';
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(
        results => {
          this.projects = results;
          this.projectSearch = results;
          this.projectService.calcPercentProjects(results);
        },
        err => console.log(err),
        () => console.log('get all projects')
      );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? this.getProjects()
        : this.projectsName.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )

  getSearchProject() {
    this.projectService.searchProject(this.searchInput)
      .subscribe(
        results => {
          this.projectSearch = results;
          this.projectService.calcPercentProjects(results);
        },
        err => console.log(err),
        () => console.log('get search projects')
      );
  }

  setProjectsName(projects: Project[]): void {
    projects.map(x => this.projectsName.push(x.character));
  }

  getProjectsDoneNumber(projects) {
    const projectsDone: Project[] = [];

    projects.map(
      project => project.percentDone === 100 ? projectsDone.push(project) : null
    );

    return projectsDone.length;
  }

  getProjectsInProgressNumber(projects) {
    const projectsInProgress: Project[] = [];

    projects.map(
      project => project.percentDone < 100 ? projectsInProgress.push(project) : null
    );

    return projectsInProgress.length;
  }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(
        results => {
          this.projects = results;
          this.projectSearch = results;
          this.projectService.calcPercentProjects(results);
          this.setProjectsName(results);
        },
        err => console.log(err),
        () => console.log('get all projects after init')
      );
  }
}
