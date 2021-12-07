import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeeedit',
  templateUrl: './employeeedit.component.html',
  styleUrls: ['./employeeedit.component.css']
})
export class EmployeeeditComponent implements OnInit {
  uname:any;
  fname:any;
  lname:any;
  city:any;
  country:any;
  state:any;
  pincode:any;
  street:any;
  mobile:any;
  // uname:any;
  a:any;
  b:any;
  c:any;
  d:any;
  e:any;
  f:any;
  g:any;
  h:any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fname = sessionStorage.getItem("fname");
    this.uname = sessionStorage.getItem("uname");
    this.city = sessionStorage.getItem("city");
    this.street = sessionStorage.getItem("street");
    this.state = sessionStorage.getItem("state");
    this.pincode = sessionStorage.getItem("pincode");
    this.mobile = sessionStorage.getItem("mobile");
    this.country = sessionStorage.getItem("country");
    
    this.a=this.fname;
    // this.b=this.lname;
    this.c=this.street;
    this.d=this.city;
    this.e=this.state;
    this.f=this.pincode;
    this.g=this.country;
    this.h=this.mobile;
    console.log(this.b);
  }

  update() {
    this.uname = sessionStorage.getItem('uname');
    var emp = {
      uname: this.uname, fname: this.fname,
      street: this.street, city: this.city, state: this.state,
      pincode: this.pincode, country: this.country, mobile: this.mobile
    }
    this.http.post('http://localhost:3000/empedit',emp).subscribe((data:any) => {
      this.fname = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].VORNA._text;
      // this.uname = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].._text;
      this.city = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].ORT01._text;
      this.country = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].NATIO._text;
      this.state = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].LAND._text;
      this.street = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].STRAS._text;
      this.mobile = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].TELNR._text;
      this.pincode = data['SOAP:Envelope']['SOAP:Body']['ns0:ZEMP_PROFILE_EDIT.Response'].PSTLZ._text;
      //  console.log(this.lname);
    })
    console.log(this.b);
    // console.log(this.lname);
    if(this.a==this.fname&&this.c==this.street&&this.d==this.city&&this.e==this.state
      &&this.f==this.pincode&&this.g==this.country&&this.h==this.mobile){
        alert("No Changes made"); 
      }
    else{
      
      alert("Changes saved successfully");
    }
    this.router.navigate(['/eprofile']);
  }


}
