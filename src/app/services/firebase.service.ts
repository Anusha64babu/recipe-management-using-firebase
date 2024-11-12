// Import the functions you need from the SDKs you need
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBoAdwUKiuIszEcngY1hfr3mL0mKL79tQ0",
  authDomain: "recipe-management-app-7d432.firebaseapp.com",
  projectId: "recipe-management-app-7d432",
  storageBucket: "recipe-management-app-7d432.firebasestorage.app",
  messagingSenderId: "180066085724",
  appId: "1:180066085724:web:0923902fb219630929af99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {
    console.log('Firebase Initialized:', app);
  }
}
