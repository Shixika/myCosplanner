import { Component, OnInit } from '@angular/core';

import { Project } from '../service/project/project';
import { ProjectService } from '../service/project/project.service';

@Component({
  selector: 'app-projects-listing',
  templateUrl: './projects-listing.component.html',
  styleUrls: ['./projects-listing.component.scss']
})

export class ProjectsListingComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  calcPercent(): void {
    const todoPercentCalc: number[] = []; // [48, 0];
    const purchasesPercentCalc: number[] = []; // [33, 100];
    const totalPercentCalc: number[] = []; // [41, 50];

    this.projects.map(x => {
      const todosPercent = x.todos.todosPercent;
      const reducer = (accumulator, currentValue) => (accumulator + currentValue);
      todoPercentCalc.push(Math.round(todosPercent.reduce(reducer) / todosPercent.length));

      const purchasesStatus = x.purchases.purchasesStatus;
      const purchasesPercent: number[] = []; // [100, 0, 0], [100, 100];
      purchasesStatus.map(i => {
        purchasesPercent.push(i === true ? 100 : 0);
      });

      purchasesPercentCalc.push(Math.round(purchasesPercent.reduce(reducer) / purchasesPercent.length));
    });

    todoPercentCalc.map((x, i) => totalPercentCalc.push(Math.round((x + purchasesPercentCalc[i]) / todoPercentCalc.length)));

    this.projects.map((x, i) => {
      x.percentDone = totalPercentCalc[i];
      this.projectService.updateProject(x)
      .subscribe(
        result => {
          this.projectService.getProjects()
            .subscribe(
              results => this.projects = results,
              err => console.log(err),
              () => console.log('get all projects after update percentDone')
            );
        },
        err => console.log(err),
        () => console.log('update project', i)
      );
    });
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
