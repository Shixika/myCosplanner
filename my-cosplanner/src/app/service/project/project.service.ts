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
    return this.http.put(this.projectsUrl, project, this.httpOptions);
  }
}
