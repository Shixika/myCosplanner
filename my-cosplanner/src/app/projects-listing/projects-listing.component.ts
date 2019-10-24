import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../service/project/project';
import { ProjectService } from '../service/project/project.service';
import { AddProjectModalComponent } from './modal/add-project-modal/add-project-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-listing',
  templateUrl: './projects-listing.component.html',
  styleUrls: ['./projects-listing.component.scss']
})

export class ProjectsListingComponent implements OnInit {
  projects: Project[];

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal
  ) { }

  calcPercent(): void {
    // Percent calclulated
    const todosPercentCalc: number[] = []; // [48, 0];
    const purchasesPercentCalc: number[] = []; // [33, 100];
    const totalPercentCalc: number[] = []; // [41, 50];

    this.projects.map(x => {
      // Percent base
      const todosPercent = x.todos.todosPercent;
      const purchasesStatus = x.purchases.purchasesStatus;
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
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(
        results => this.projects = results,
        err => console.log(err),
        () => console.log('get all projects')
      );
  }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(
        results => {
          this.projects = results;
          this.calcPercent();
        },
        err => console.log(err),
        () => console.log('get all projects after init')
      );
  }
}
