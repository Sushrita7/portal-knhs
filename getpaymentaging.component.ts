import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getpaymentaging',
  templateUrl: './getpaymentaging.component.html',
  styleUrls: ['./getpaymentaging.component.css']
})
export class GetpaymentagingComponent implements OnInit {
  
 
  uname:any;
payment:any;
 
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
     
     this.http.post('http://localhost:3000/getpayment', { uname: this.uname }).subscribe((data:any) => {
       console.log(data);
       this.payment = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_GET_PAYMENTAGING_KNH.Response']['IT_DETAILS']['item'];
      // console.log(this.delivery_list);
       
     })

   } 
   calculateAging(date1:any){
    var date3 = new Date(date1);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()+1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var date5 = yyyy + '/' + mm + '/' + dd;
    var date4 = new Date(date5);
    var Time = date4.getTime() - date3.getTime();
    var Days = Time / (1000 * 3600 * 24);
    if(Days<0){
      Days = Days*-1;
    } 
    return(Math.round(Days));
  } 
}

