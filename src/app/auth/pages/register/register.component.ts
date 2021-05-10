import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: [, [Validators.required]],
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  register() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    
  }
}
