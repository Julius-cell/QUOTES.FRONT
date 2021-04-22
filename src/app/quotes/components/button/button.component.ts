import { Component, Input, OnInit } from '@angular/core';
import { BtnConfig } from '../../model/btn-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() buttonConfig: BtnConfig;


  constructor() { }

  ngOnInit(): void {}
}
