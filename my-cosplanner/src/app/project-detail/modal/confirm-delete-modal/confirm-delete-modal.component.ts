import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {
  @Input() projectElement: any;
  @Input() project: Project;
  @Input() element: any;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService) { }

  deleteProjectElement(modal: any) {
    const indexElement = this.element.indexOf(this.projectElement);
    this.element.splice(indexElement, 1);

    // Update project
    this.projectService.updateProject(this.project)
      .subscribe(
        () => modal.close('Delete click'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }
  
  ngOnInit() {
  }
}
