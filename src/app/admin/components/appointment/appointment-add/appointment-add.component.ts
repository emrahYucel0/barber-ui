import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../services/appointment.service';
import { Appointment } from '../../../../models/appointment';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private appointmentService:AppointmentService,
    private userService:UserService
  ){}


  ngOnInit(): void {
    this.getUsers();
  }

  users:User[]=[]

  appointmentForm!:FormGroup;

  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

  createAppointmentForm(){
    this.appointmentForm=this.formBuilder.group({
      userId:['', Validators.required],
      fullName:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
    })
  }

  onSubmit(){
    if(!this.appointmentForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }

    let appointment:Appointment=Object.assign({},this.appointmentForm.value);

    this.appointmentService.create(appointment).subscribe(result=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }

  getUsers(){
    this.userService.getAllNotDeleted().subscribe(result=>{
        this.users=result.data;
    })
}
}
