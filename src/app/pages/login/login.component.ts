import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SignUpForm } from '../models/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIf,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   
  router=inject(Router)
  
  ngOnInit(){
    const signUpData=localStorage.getItem('user')
    if(signUpData !== null){
      this.signUpObj=JSON.parse(signUpData)
      this.loginForm.controls['email'].setValue(this.signUpObj.email);
      this.loginForm.controls['password'].setValue(this.signUpObj.password);
      this.onLogin(this.loginForm.value)
    }
    
  }
  isLoginActive:boolean = true;
  signUpObj:SignUpForm= new SignUpForm()
   
   loginForm:FormGroup=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
    
   })

  onSignup(signUpForm:NgForm){
    if(signUpForm.invalid){
      
      alert('Please fill all the fields');
     
    }
    else{
    const signUpData= localStorage.getItem('user')
    if(signUpData !== null){
      localStorage.removeItem('user')
    }
    const id= Math.floor(Math.random() * 1000);
    this.signUpObj.userId=id;
    localStorage.setItem('user', JSON.stringify(this.signUpObj));
    alert('User Created Successfully');
    this.isLoginActive = true;
    }
  

  }
  onLogin(loginObj:any){
    const loginData= loginObj
    const user = localStorage.getItem('user'),
    userObj=user ? JSON.parse(user) : null;
    if(userObj !== null){
       if(userObj.email === loginData.email && userObj.password === loginData.password){
        alert('Login Successful');
        this.router.navigate(['/dashboard'])
       }
       else{
        alert('Login Failed');
        

       }
    }
  }
}
