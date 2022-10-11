import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieDBService } from '../shared/movie-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePass: boolean = true;
  invalidData: boolean = false;

  constructor(private db: MovieDBService) {
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
    this.invalidData = true;
    this.trimData();
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm);
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
