import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    
  }

}
