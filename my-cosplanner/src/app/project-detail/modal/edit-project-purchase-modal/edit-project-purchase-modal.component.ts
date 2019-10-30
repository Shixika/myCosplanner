import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

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
    private projectService: ProjectService
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

  ngOnInit() {
    this.name = this.projectPurchase ? this.projectPurchase.name : '';
    this.price = this.projectPurchase ? this.projectPurchase.price : null;
  }

}
