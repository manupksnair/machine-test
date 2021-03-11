import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  name: any;
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userData = this.getUserDetails()
    console.log(this.userData);
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('userData') || "");
  }

  getUserList() {
    return JSON.parse(localStorage.getItem('users') || "")
  }

  onChangeName(){
    const users = this.getUserList();
    users.forEach((user: { email: any; name: any; }) =>{
      if(user.email == this.userData.email) {
        user.name = this.name;
        this.userData.name = this.name
      }
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('userData', JSON.stringify(this.userData));
      
    });
      
    }
  
  onChangePassword(){
    const users = this.getUserList();
    users.forEach((user: { email: any; password: any; }) =>{
      if(user.email == this.userData.email) {
        user.password = this.password;
      }
      localStorage.setItem('users', JSON.stringify(users));     
      localStorage.removeItem('userData');
      this.router.navigate(['login']) 
    });
      
    }

    onAccountDeletion(){
      const users = this.getUserList();
      const filteredUsers = users.filter((user: { email: any; }) => user.email != this.userData.email);
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      localStorage.removeItem("userData");
      this.router.navigate(['login']) 
    }
  }
