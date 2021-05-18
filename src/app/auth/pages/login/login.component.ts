import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ms: MessageService) { }

  ngOnInit(): void { }

  login() {
    this.authService.login(this.loginForm.value).subscribe((resp: any) => {
      if (resp === 'success') {
        this.router.navigateByUrl('/quotes');
      } else {
        this.ms.add({severity:'error', summary: `${resp.status}`, detail: `${resp.error}`});
      }
    })
  }

}
