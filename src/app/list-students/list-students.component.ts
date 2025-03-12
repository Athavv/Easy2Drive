import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-list-students',
  standalone: false,
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  students: any;

  constructor( private studentservice: StudentsService) { }

  ngOnInit(): void {

    this.studentservice.getStudents().subscribe(
      (result:any)=>{
        //console.log(result)
        this.students  =  result.data;
      }
    )

  }

  deleteStudent(student:any){
   // console.log(id);
    this.studentservice.deleteStudent(student.id).subscribe(data=>{
      this.students = this.students.filter((u: any) => u !== student);
    })
  }

}
