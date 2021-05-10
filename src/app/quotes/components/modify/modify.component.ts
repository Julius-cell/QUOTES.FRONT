import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BtnConfig } from '../../model/btn-config';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {

  @Output() onClickSave: EventEmitter<boolean> = new EventEmitter();

  categories: Category[] = [];

  myForm: FormGroup = this.fb.group({
    person: ['', [Validators.required, Validators.maxLength(20)]],
    quote: ['', [Validators.required]],
    category: [[], [Validators.required]],
  })

  saveBtnConfig: BtnConfig = {
    label: 'Save',
    name: 'save',
    styles: {
      marginTop: '20px'
    }
  };

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(resp => {
      resp.data.map((category: Category) => {
        this.categories.push(category);
      })
    })
  }

  campoInvalido(campo: string) {
    return this.myForm.controls[campo].touched && this.myForm.controls[campo].errors?.required;
  }

  /**
   * Función que envía la data para añadir una nueva quote.
   * @emits onHideModify {name: 'add', data: this.myForm.value}
   */
  saveData() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.myForm.valid) {
      this.onClickSave.emit(true);
    }
  }

}
