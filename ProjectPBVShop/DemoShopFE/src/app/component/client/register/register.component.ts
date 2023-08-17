import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string |any
  email: string |any;
  full_name: string |any;
  phone:  string |any;
  address: string |any;
  gender: string |any;
  birthday: string |any
  password: string |any;
  password_confirmation: |any;
  errorMessages: string[] = [];

  usernameError: string = '';
  emailError: string = '';
  full_nameError: string = '';
  addressError: string = '';
  phoneError: string = '';
  passwordError: string = '';
  passwordConfirmationError: string = '';



  constructor(private userService: AuthServiceService,private router:Router) {}
  onSubmit() {

    this.userService.register(this.username, this.email, this.full_name, this.phone,this.address,this.gender,this.birthday, this.password,this.password_confirmation).subscribe(
      (response) => {

        this.router.navigate(['/login'])

      },
      (error) => {
        console.log('register failed:', error);
      }
    );

    this.clearErrors();

    if (!this.username) {
      this.usernameError = 'Username is required';
    }

    if (!this.email) {
      this.emailError = 'Email is required';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Email is invalid   |   Ex: abc@gmail.com';
    }

    if (!this.full_name) {
      this.full_nameError = 'Full name is required';
    }

    if (!this.password) {
      this.passwordError = 'Password is required';
    }

    if (!this.password_confirmation) {
      this.passwordConfirmationError = 'Password confirmation is required';
    } else if (this.password_confirmation !== this.password) {
      this.passwordConfirmationError = 'Password confirmation does not match';
    }
  }

  clearErrors() {
    this.usernameError = '';
    this.emailError = '';
    this.full_nameError = '';
    this.passwordError = '';
    this.passwordConfirmationError = '';
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
