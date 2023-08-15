import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent  implements OnInit {
  users: undefined | User;
  constructor(private userService: AuthServiceService) {}

  ngOnInit(): void {
    this.getListUser();
  }

  getListUser(): void {
    this.userService.getListUser().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

