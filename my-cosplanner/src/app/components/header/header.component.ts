import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() iconRight: string;
  @Input() iconLeft: string;
  @Input() rightLink: string;
  @Input() leftLink: string;

  constructor() { }

  ngOnInit() {
  }

}
