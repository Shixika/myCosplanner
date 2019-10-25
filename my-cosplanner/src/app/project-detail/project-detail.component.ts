import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../service/project/project';
import { ProjectService } from '../service/project/project.service';
import { EditProjectModalComponent } from './modal/edit-project-modal/edit-project-modal.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  selectedFile: any = null;
  projectPictureFile: any = null;
  fileData: File = null;
  referencePictureFile: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: NgbModal,
    private projectService: ProjectService
  ) { }

  getFile(event: any, fileType: string) {
    this.fileData = event.target.files[0];
    this.setPictureFile(fileType);
  }

  setPictureFile(fileType: string) {
    const mimeType = this.fileData.type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);

    reader.onload = () => {
      if (fileType === 'projectPictureFile') {
        this.projectPictureFile = reader.result;
      } else {
        this.project.references.push(reader.result);
      }
      this.uploadFile();
    };
  }

  uploadFile() {
    this.project.picture = this.projectPictureFile ? this.projectPictureFile : this.project.picture;
    this.updateProject();
  }

  updateProject() {
    this.projectService.updateProject(this.project)
      .subscribe(
        () => console.log('update'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  openEditProjectModal(project) {
    const modalRef = this.modalService.open(EditProjectModalComponent);
    modalRef.componentInstance.project = project;
  }

  updateStatus(index: number, newStatus: boolean) {
    this.project.purchases.purchasesStatus[index] = newStatus;
    this.updateProject();
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
