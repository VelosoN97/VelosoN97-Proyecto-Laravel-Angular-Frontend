import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: any;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  
  onSubmit(): void{
    this.cleanErrors();
    this.authService.login(this.loginForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private handleResponse(response: any): void{
    console.log(response.message);
    this.tokenService.handleToken(response.token);
  }

  private handleErrors(errors: any): void{
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void{
    this.errors = null;
  }
}
