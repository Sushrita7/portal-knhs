import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Console } from 'console';


@Component({
  selector: 'app-employyelogin',
  templateUrl: './employyelogin.component.html',
  styleUrls: ['./employyelogin.component.css']
})
export class EmployyeloginComponent implements OnInit {

  
  uname:any;
  pwd:any;
  name:any;
  
  constructor(private http:HttpClient,private router:Router) { }
  
  ngOnInit(): void {
    
  }
  
  getresult(f:any){

    console.log(f);

    // this.uname=f.form.value[1];
    // this.pwd=f.form.value[0];
    // console.log(this.uname+"      "+this.pwd);
    console.log(f.value);
    this.http.post('http://localhost:3000/logine',f.value).subscribe((data:any)=>{
      console.log(data);

      this.name=data['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_EMPLOYEE_LOGIN_KNH.Response']['BAPIRET']['TYPE']._text;
      console.log(this.name);
      
      if(this.name =='S'){
        this.uname=f.value.uname;
        console.log(this.uname);
        sessionStorage.setItem('uname',this.uname);
        // alert("Welcome " + this.name);
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          // text: 'Enter Correct Credentials',
          
        })
        this.router.navigate(['/dashboarde']);
        
      } 
      else{
        
        // alert("Invalid User");
        
        // Swal.fire('Any fool can use a computer');
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Enter Correct Credentials',
          
        })
      }
    });
  }



}
