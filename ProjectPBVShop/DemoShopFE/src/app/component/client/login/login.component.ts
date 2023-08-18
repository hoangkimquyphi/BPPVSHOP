import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements   OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  constructor(private authService: AuthServiceService,private router: Router,private user: AuthServiceService, private product:ProductService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response:any) => {
        console.log('Login successful:', response);
        localStorage.setItem('access_token', response.access_token);
        alert('Login susseces');
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 404 && error.error.message === 'user is not found') {
          this.errorMessage = 'User not found';
        } else if (error.status === 401 && error.error.message === 'Unauthorized') {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'Unknown error occurred';
        }
      }
    );
  }
}
