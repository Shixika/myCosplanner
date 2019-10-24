import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../service/project/project';
import { ProjectService } from '../service/project/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  selectedFile: any = null;
  fileData: File = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private projectService: ProjectService
  ) { }

  getFile(event) {
    this.fileData = event.target.files[0];
    this.setSelectedFile();
  }

  setSelectedFile() {
    const mimeType = this.fileData.type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => this.selectedFile = reader.result;
  }

  uploadFile() {
    this.project.picture = this.selectedFile.length > 0 ? this.selectedFile : this.project.picture;
    this.projectService.updateProject(this.project)
      .subscribe(
        result => {
          this.projectService.getProject(this.project.id)
            .subscribe(
              res => this.project = res,
              err => console.log(err),
              () => console.log('get project', this.project.id, ' after update')
            );
          this.router.navigate(['/index']);
        },
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(
        result => this.project = result,
        err => console.log(err),
        () => console.log('get project', id)
      );
  }

}
