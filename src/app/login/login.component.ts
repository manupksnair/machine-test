import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}
  ngOnInit() {
    this.myForm =this.fb.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(formData: any) {
    const users = localStorage.getItem("users") != null ? JSON.parse(localStorage.getItem("users") || ""): [];
    const findUser = users.find((user: { email: string; password: string; }) => user.email == formData.value.email && user.password == formData.value.password);
    if(findUser != undefined) {
      localStorage.setItem("userData", JSON.stringify(_.omit(findUser, ["password"])));
      this.router.navigate(['/home']);
    } else {
      alert("Incorrect credentials");
    }
  }
}
