import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BtnConfig } from '../../model/btn-config';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styles: [
  ]
})
export class ModifyComponent implements OnInit {

  @Output() onClickSave: EventEmitter<boolean> = new EventEmitter();

  myForm: FormGroup = this.fb.group({
    person: ['', [Validators.required, Validators.maxLength(20)]],
    quote: ['', [Validators.required]]
  })

  saveBtnConfig: BtnConfig = {
    label: 'Save',
    name: 'save',
    styles: {
      marginTop: '20px'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  /**
   * Función que envía la data para añadir una nueva quote.
   * @emits onHideModify {name: 'add', data: this.myForm.value}
   */
  saveData() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.onClickSave.emit(true);
    }
  }

}
