import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;
  errors: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  onSubmit(): void {
    this.cleanErrors();
    this.authService.register(this.registerForm.value).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private handleResponse(response: any): void{
    console.log(response.message);

  }

  private handleErrors(errors: any): void{
    this.errors = errors.error.errors;
    console.log(this.errors);
  }

  private cleanErrors(): void{
    this.errors = null;
  }
}
