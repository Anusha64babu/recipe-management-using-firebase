import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // login
  login(email: string, password: string): Promise<void> {
    return this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

  // register
  register(email: string, password: string): Promise<void> {
    return this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/login']);
    }).catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The email address is already in use by another account.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      }
    });
  }

  // signout
  logout(): Promise<void> {
    return this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']).then(() => {
        window.location.reload(); // Reload the application to clear all states
      });
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

  // check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
