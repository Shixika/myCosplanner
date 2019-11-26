import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-edit-project-purchase-modal',
  templateUrl: './edit-project-purchase-modal.component.html',
  styleUrls: ['./edit-project-purchase-modal.component.scss']
})
export class EditProjectPurchaseModalComponent implements OnInit {
  @Input() projectPurchase: { name: string, price: number, status: boolean };
  @Input() project: Project;
  name: string;
  price: number;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private modalService: NgbModal
  ) { }

  updatePurchaseProject(modal: any) {
    this.projectPurchase.name = this.name ? this.name : this.projectPurchase.name;
    this.projectPurchase.price = this.price ? this.price : 0;

    this.projectService.updateProject(this.project)
      .subscribe(
        () => modal.close('Save click'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  openConfirmDeleteModal(projectElement: {}, project: Project, modal: any) {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
    modalRef.componentInstance.projectElement = projectElement;
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.element = project.purchases;
    modal.close('Confirm delete');
  }

  ngOnInit() {
    this.name = this.projectPurchase ? this.projectPurchase.name : '';
    this.price = this.projectPurchase ? this.projectPurchase.price : null;
  }

}
