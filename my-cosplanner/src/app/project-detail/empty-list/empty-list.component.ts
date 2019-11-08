import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../service/project/project';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {
  @Input() project: Project;
  @Input() listing: string;

  constructor() { }

  ngOnInit() {
  }

}
