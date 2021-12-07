import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leavedetails',
  templateUrl: './leavedetails.component.html',
  styleUrls: ['./leavedetails.component.css']
})
export class LeavedetailsComponent implements OnInit {

  uname:any;
  leave_det:any;
  leave_del:any;
leavestat:any;
 
   constructor(private http: HttpClient, private router: Router) {
     this.uname = sessionStorage.getItem('uname');
     //alert(this.uname);
     if (this.uname == null) {
       // alert('hello');
       this.router.navigate(['']);
     }
   }
 
   ngOnInit(): void {
     // this.uname = localStorage.getItem('uname');
 
     this.uname = sessionStorage.getItem("uname");
     this.details();
   
   }
   details(){
    this.http.post('http://localhost:3000/leavedetails', { uname: this.uname }).subscribe((data:any) => {
      console.log(data);
      this.leave_det = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_DETAILS_KNH.Response']['IT_LEAVE_DET']['item'];
      console.log(this.leave_det);
      
    })    
 
   }
   delete(del:any){
      console.log(del);
      this.http.post('http://localhost:3000/leavedel',del).subscribe((data:any) => {
       console.log(data);
       this.leave_del = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVEDELETEREQUEST_KNH.Response'].E_STATUS._text;
       console.log(this.leave_del);
       if(this.leavestat=="S"){
         alert("Deleted Succesfully");
         this.details();
       }
       
     })    
      // this.leave_det.splice(del);
  
   }
}
