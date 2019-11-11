import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import 'moment/locale/fr';

import { Project } from '../service/project/project';
import { ProjectService } from '../service/project/project.service';
import { EditProjectModalComponent } from './modal/edit-project-modal/edit-project-modal.component';
import { AddProjectPurchaseModalComponent } from './modal/add-project-purchase-modal/add-project-purchase-modal.component';
import { AddProjectTodoModalComponent } from './modal/add-project-todo-modal/add-project-todo-modal.component';
import { EditProjectPurchaseModalComponent } from './modal/edit-project-purchase-modal/edit-project-purchase-modal.component';
import { EditProjectTodoModalComponent } from './modal/edit-project-todo-modal/edit-project-todo-modal.component';
import { ReferencePictureModalComponent } from './modal/reference-picture-modal/reference-picture-modal.component';
import { TouchSequence } from 'selenium-webdriver';

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
  public isCollapsedRecap = false;
  public activeTab = 1;
  projectReferenceToDelete: number[] = [];
  public activeDelete = false;

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
        () => null,
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  openEditProjectModal(project: Project) {
    const modalRef = this.modalService.open(EditProjectModalComponent);
    modalRef.componentInstance.project = project;
  }

  openAddProjectPurchaseModal(project: Project) {
    const modalRef = this.modalService.open(AddProjectPurchaseModalComponent);
    modalRef.componentInstance.project = project;
  }

  openAddProjectTodoModal(project: Project) {
    const modalRef = this.modalService.open(AddProjectTodoModalComponent);
    modalRef.componentInstance.project = project;
  }

  openEditProjectPurchaseModal(projectPurchase: {name: string, price: number, status: boolean}, project: Project) {
    const modalRef = this.modalService.open(EditProjectPurchaseModalComponent);
    modalRef.componentInstance.projectPurchase = projectPurchase;
    modalRef.componentInstance.project = project;
  }

  openEditProjectTodoModal(projectTodo: { name: string, percent: number, time: string, estimate: string }, project: Project) {
    const modalRef = this.modalService.open(EditProjectTodoModalComponent);
    modalRef.componentInstance.projectTodo = projectTodo;
    modalRef.componentInstance.project = project;
  }

  openReferencePictureModal(projectReference) {
    const modalRef = this.modalService.open(ReferencePictureModalComponent );
    modalRef.componentInstance.projectReference = projectReference;
  }

  updateStatus(index: number, newStatus: boolean) {
    this.project.purchases[index].status = newStatus;
    this.updateProject();
  }

  getPurchasesStatus(projectPurchases: any[]): number {
    const purchaseResult = [];
    projectPurchases.map(purchase => purchase.status === true ? purchaseResult.push(purchase) : null);
    return purchaseResult.length;
  }

  getTodosStatus(projectTodos: any[]): number {
    const todoResult = [];
    projectTodos.map(todo => todo.percent === 100 ? todoResult.push(todo) : null);
    return todoResult.length;
  }

  getMonthsLeft(): string {
    const deadlineArray: string[] = this.project.dueDate.split('/'); // ["25", "12", "2019"]
    const deadlineDay: string = deadlineArray[0].length > 1 ? deadlineArray[0] : '0' + deadlineArray[0]; // '25' || '01'
    const deadlineMonth: string = deadlineArray[1].length > 1 ? deadlineArray[1] : '0' + deadlineArray[1]; // '12' || '09'
    const deadlineYear: string = deadlineArray[2]; // '2019'
    const deadlineStr: string = deadlineYear + '-' + deadlineMonth + '-' + deadlineDay;

    const deadline: moment.Moment = moment(deadlineStr);
    const today: moment.Moment = moment();
    const diffDuration: moment.Duration = moment.duration(deadline.diff(today));

    return diffDuration.humanize();
  }

  isNotToDelete(projectReferenceIndex: number) {
    return this.projectReferenceToDelete.find(
      (value) => value === projectReferenceIndex
    );
  }

  deleteReferencePicture(projectReferenceIndex: number) {
    this.projectReferenceToDelete.push(projectReferenceIndex);
  }

  cancelDeleteReferencePicture(projectReferenceIndex: number) {
    const projectReferenceToDeleteIndex = this.projectReferenceToDelete.indexOf(projectReferenceIndex);
    this.projectReferenceToDelete.splice(projectReferenceToDeleteIndex, 1);
  }

  deleteReferencePictureSelected() {
    // If all elements are selected, delete all
    if (this.projectReferenceToDelete.length === this.project.references.length) {
      this.project.references = [];
    } else {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.projectReferenceToDelete.length; index++) {
        this.project.references.splice(this.projectReferenceToDelete[index], 1);
      }
    }
    this.projectReferenceToDelete = [];
    this.updateProject();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(
        result => {
          this.project = result;
          this.projectService.calcPercentProject(result);
        },
        err => console.log(err),
        () => console.log('get project', id)
      );
  }

}
