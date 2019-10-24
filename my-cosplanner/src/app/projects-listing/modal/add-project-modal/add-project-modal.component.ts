import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit {
  @Input() projects: Project[];
  project: Project;
  budget: number;
  character: string;
  series: string;
  selectedFile: any = null;
  fileData: File = null;
  picture: any;
  /* dueDate: string;
  initialDate: string; */

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  addProject(modal) {
    this.projectService.addProject(this.project)
      .subscribe(
        result => {
          this.projects.push(result);
          modal.close('Ok click');
        },
        err => console.log(err),
        () => console.log('add new project')
      );
  }

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
    reader.onload = () => this.project.picture = reader.result;
  }

  ngOnInit() {
    if (this.projects) {
      this.project = {
        id: this.projects.length + 1,
        character: this.character,
        series: this.series,
        budget: this.budget,
        picture: '',
        percentDone: 0,
        purchases: {
          purchasesName: [],
          purchasesPrice: [],
          purchasesStatus: []
        },
        todos: {
          todosName: [],
          todosPercent: [],
          todosTime: []
        }
      };
    }
  }

}
