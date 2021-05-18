import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespUser } from '../../models/response';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: [, [Validators.required]],
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(8)]],
    passwordConfirm: [, [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {}

  register() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe((resp: RespUser) => {
      console.log(resp);
    })
  }
}
