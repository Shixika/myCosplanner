import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal,
    config: NgbTypeaheadConfig
  ) {
    config.showHint = true;
  }

  calcPercent(): void {
    // Percent calclulated
    const todosPercentCalc: number[] = []; // [48, 0];
    const purchasesPercentCalc: number[] = []; // [33, 100];
    const totalPercentCalc: number[] = []; // [41, 50];

    this.projects.map(x => {
      // Percent base
      const todosPercent: number[] = [];
      const purchasesStatus: boolean[] = [];

      x.todos.map(todo => todosPercent.push(todo.percent));
      x.purchases.map(purchase => purchasesStatus.push(purchase.status));
      const purchasesPercent: number[] = []; // [100, 0, 0], [100, 100];

      const reducer = (accumulator: number, currentValue: number) => (accumulator + currentValue);

      if (purchasesStatus.length > 0) {
        // Convert status true/false to percent (true = 100 / false = 0)
        purchasesStatus.map(i => {
          purchasesPercent.push(i === true ? 100 : 0);
        });

        // Calcul percent for purchases list
        purchasesPercentCalc.push(Math.round(purchasesPercent.reduce(reducer) / purchasesPercent.length));
      } else {
        purchasesPercentCalc.push(0);
      }

      if (todosPercent.length > 0) {
        // Calcul percent for todos list
        todosPercentCalc.push(Math.round(todosPercent.reduce(reducer) / todosPercent.length));
      } else {
        todosPercentCalc.push(0);
      }
    });

    // Calcul percent for purchases and todos list
    todosPercentCalc.map((x, i) => totalPercentCalc.push(Math.round((x + purchasesPercentCalc[i]) / todosPercentCalc.length)));

    // Update projects with new calculated percent value
    this.projects.map((x, i) => {
      x.percentDone = totalPercentCalc[i];

      this.projectService.updateProject(x)
        .subscribe(
          () => this.getProjects(),
          err => console.log(err),
          () => console.log('update project', i)
        );
    });
  }

  openAddProjectModal() {
    const modalRef = this.modalService.open(AddProjectModalComponent);
    modalRef.componentInstance.projects = this.projects;
    modalRef.componentInstance.projectsName = this.projectsName;
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(
        results => {
          this.projects = results;
          this.projectSearch = results;
        },
        err => console.log(err),
        () => console.log('get all projects')
      );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.projectsName.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )

  getSearchProject() {
    this.projectService.searchProject(this.searchInput)
      .subscribe(
        results => this.projectSearch = results,
        err => console.log(err),
        () => console.log('get search projects')
      );
  }

  setProjectsName(projects: Project[]): void {
    projects.map(x => this.projectsName.push(x.character));
  }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(
        results => {
          this.projects = results;
          this.projectSearch = results;
          this.calcPercent();
          this.setProjectsName(results);
        },
        err => console.log(err),
        () => console.log('get all projects after init')
      );
  }
}
