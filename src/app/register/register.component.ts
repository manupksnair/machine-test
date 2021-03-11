import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}
  ngOnInit() {
    this.myForm =this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('[-a-zA-Z0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[-a-zA-Z]+( +[-a-zA-Z]+)*$')]]
    });
  }

  onSubmit(formData: any) { 
    const users = localStorage.getItem("users") != null ? JSON.parse(localStorage.getItem("users") || ""): [];
    const findUser = users.find((user: { email: string;}) => user.email == formData.value.email); 
    if(findUser == undefined) {
      users.push(formData.value);
      localStorage.setItem("users", JSON.stringify(users));
      this.router.navigate(['/']);
    } else{
      alert("Email ID already exists. Please try again.")
    }  
  }
}