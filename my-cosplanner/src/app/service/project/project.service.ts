import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from './project';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private projectsUrl = 'api/projects'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getProject(projectId: number): Observable<Project> {
    const url = `${this.projectsUrl}/${projectId}`;
    return this.http.get<Project>(url);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, this.httpOptions).pipe(
      tap(_ => this.calcPercentProject(project)),
    );
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions);
  }

  searchProject(character: string): Observable<Project[]> {
    const url = `${this.projectsUrl}?character=${character}`;
    return this.http.get<Project[]>(url);
  }

  calcPercentProjects(projects: Project[]) {
    // Update projects with new calculated percent value
    projects.map((project, i) => {
      this.calcPercent(project)
        .subscribe(
          result => {
            project.percentDone = result[0];
            this.updateProject(project);
          },
          err => console.log(err)
        );
    });
  }

  calcPercentProject(project: Project) {
    // Update project with new calculated percent value
    this.calcPercent(project)
      .subscribe(
        result => {
          project.percentDone = result[0];
          this.updateProject(project);
        },
        err => console.log(err)
      );
  }

  private calcPercent(project: Project): Observable<number[]> {
    // Percent base
    const todosPercent: number[] = [];
    const purchasesStatus: boolean[] = [];

    // Percent calculated
    const todosPercentCalc: number[] = []; // [48, 0];
    const purchasesPercentCalc: number[] = []; // [33, 100];
    const totalPercentCalc: number[] = []; // [41, 50];

    project.todos.map(todo => todosPercent.push(todo.percent));
    project.purchases.map(purchase => purchasesStatus.push(purchase.status));
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
    // Calcul percent for purchases and todos list
    todosPercentCalc.map((x, i) =>
      totalPercentCalc.push((x + purchasesPercentCalc[i]) / 2));

    return of(totalPercentCalc);
  }
}
