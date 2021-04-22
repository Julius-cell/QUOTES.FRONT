import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BtnConfig } from '../../model/btn-config';
import { Emit } from '../../model/emit';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styles: [
  ]
})
export class ModifyComponent implements OnInit {

  @Output() onHideModify: EventEmitter<Emit> = new EventEmitter();

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

  ngOnInit(): void {
  }

  saveData() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Cerrar modal
      this.onHideModify.emit({change: false, data: this.myForm.value});
    }
  }

}
