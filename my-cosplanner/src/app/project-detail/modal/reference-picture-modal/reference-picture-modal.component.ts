import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reference-picture-modal',
  templateUrl: './reference-picture-modal.component.html',
  styleUrls: ['./reference-picture-modal.component.scss']
})
export class ReferencePictureModalComponent implements OnInit {
  @Input() projectReference;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
