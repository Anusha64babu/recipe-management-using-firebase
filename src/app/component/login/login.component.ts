import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  suggestions: string[] = []; // Example suggestion list

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginForm.reset();
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500
      });
    }).catch((err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

  onInput(event: any) {
    const value = event.target.value.toLowerCase();
    this.suggestions = this.getSuggestions(value);
  }

  getSuggestions(query: string): string[] {
    const allSuggestions = ['user1@example.com', 'user2@example.com', 'user3@example.com']; // Replace with actual suggestions
    return allSuggestions.filter(suggestion => suggestion.toLowerCase().includes(query));
  }

  selectSuggestion(suggestion: string) {
    this.loginForm.patchValue({ email: suggestion });
    this.suggestions = [];
  }
}
