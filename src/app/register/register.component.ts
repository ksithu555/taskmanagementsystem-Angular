import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    public taskService: TaskService,
    public router: Router,
  ) { 
    this.form = this.formBuilder.group(
      {
        name : ['', [Validators.required]],
        email : ['', [Validators.required]],
        password : ['', [Validators.required]],
      });
  }

  ngOnInit(): void {
  }

  register(){
    this.taskService.Register(this.form.value).subscribe(x =>{
      if(x){
        alertify.success('Register Successfully!')
        this.router.navigate(["/login"]);
      }
      else{
        alertify.error('Register Fail!')
      }
    });
  }

}
