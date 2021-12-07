import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  uname:any;
  payslip:any;
 
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
     
     this.http.post('http://localhost:3000/payslip', { uname: this.uname }).subscribe((data:any) => {
       console.log(data);
       this.payslip = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_PAYSLIP_DETAILS_KNH.Response']['IT_OUTPUT']['item'];
       console.log(this.payslip);
       
     })
   }
}
