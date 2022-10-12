import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePass: boolean = true;
  invalidData: boolean = false;
  errorMessage: string = '';

  constructor(private db: MovieDBService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        this.validateNoWhitespace.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validateNoWhitespace.bind(this),
      ]),
    });
  }

  ngOnInit(): void {}

  validateNoWhitespace(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;

    if (isWhitespace) {
      return { whitespace: true };
    }
    return null;
  }

  onSubmit(): void {
    this.trimData();

    if (!this.loginForm.valid) return;

    this.db.login(this.loginForm.value).then(
      (success) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.status_message;
        this.invalidData = true;
        this.loginForm.reset();
      }
    );
  }

  trimData(): void {
    // Trim email
    this.loginForm
      .get('username')
      ?.patchValue(this.loginForm.get('username')!.value.trim());

    // Trim password
    this.loginForm
      .get('password')
      ?.patchValue(this.loginForm.get('password')!.value.trim());
  }
}
