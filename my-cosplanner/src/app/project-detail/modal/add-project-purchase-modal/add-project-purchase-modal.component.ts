import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-add-project-purchase-modal',
  templateUrl: './add-project-purchase-modal.component.html',
  styleUrls: ['./add-project-purchase-modal.component.scss']
})
export class AddProjectPurchaseModalComponent implements OnInit {
  @Input() project: Project;
  name: string;
  price: number;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  addPurchaseProject(modal: any) {
    this.project.purchases.purchasesName.push(this.name);
    this.project.purchases.purchasesPrice.push(this.price);
    this.project.purchases.purchasesStatus.push(false);

    this.projectService.updateProject(this.project)
      .subscribe(
        () => modal.close('Save click'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  ngOnInit() {
  }

}
