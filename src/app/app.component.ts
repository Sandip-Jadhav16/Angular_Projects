import { STRING_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StudentDashboard';

  studentDetails :null | undefined| any;

  studentToupdate = {
    rollNumber:"",
    name:"",
    address:"",
    percentage:""
  };

  constructor(private studentService:StudentService){
    this.getStudentDetails();
  }
  register(registerForm: NgForm){
    this.studentService.registerStudent(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.getStudentDetails();
      },
      (err) =>{
      console.log(err);
    }
    );
  }
   getStudentDetails(){
    this.studentService.getStudents().subscribe(
      (resp) => {
        console.log(resp);
        this.studentDetails = resp;
      },
      (err) =>{
      console.log(err);
    }
    );
   }
   deleteStudent(student: { rollNumber: Uint8Array; }){
    this.studentService.deleteStudent(student.rollNumber).subscribe(
      (resp)=>{
        console.log(resp);
        this.getStudentDetails();
      },
      (err) => console.log(err)
    );
   }
    edit (student: any){
      this.studentToupdate = student;
    }

    updateStudent(){
      this.studentService.updateStudent(this.studentToupdate).subscribe(
        (resp)=>{
          console.log(resp);
        },
        (err) =>{
          console.log(err);
        }
      );

    }
}

