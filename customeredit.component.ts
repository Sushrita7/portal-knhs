import { HttpClient } from '@angular/common/http';
import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.css']
})
export class CustomereditComponent implements OnInit {
  fname:any;
  lname:any;
  city:any;
  country:any;
  state:any;
  pincode:any;
  street:any;
  mobile:any;
  uname:any;
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
    this.uname = sessionStorage.getItem("uname");
    this.fname = sessionStorage.getItem("fname");
    this.lname = sessionStorage.getItem("lname");
    this.city = sessionStorage.getItem("city");
    this.street = sessionStorage.getItem("street");
    this.state = sessionStorage.getItem("state");
    this.pincode = sessionStorage.getItem("pincode");
    this.mobile = sessionStorage.getItem("mobile");
    this.country = sessionStorage.getItem("country");
    
    this.a=this.fname;
    this.b=this.lname;
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
    var cust_details = {
      uname: this.uname, fname: this.fname, lname: this.lname,
      street: this.street, city: this.city, state: this.state,
      pincode: this.pincode, country: this.country, mobile: this.mobile
    }
    this.http.post('http://localhost:3000/custedit', cust_details).subscribe((data:any) => {
    // console.log(this.lname);  
      this.fname = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].F_NAME;
      this.lname = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].L_NAME;
      this.city = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].CITY;
      this.country = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].COUNTRY;
      this.state = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].STATE;
      this.street = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].STREET;
      this.mobile = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].MOBILE;
      this.pincode = data['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_CUSTPROFILE_EDIT_KNH.Response'].PIN_CODE;
      // console.log(data);
    })
    console.log(this.b);
    console.log(this.lname);
    if(this.a==this.fname&&this.b==this.lname&&this.c==this.street&&this.d==this.city&&this.e==this.state
      &&this.f==this.pincode&&this.g==this.country&&this.h==this.mobile){
        alert("No Changes made"); 
      }
    else{
      
      alert("Changes saved successfully");
    }
    this.router.navigate(['/customerdetail']);
  }

}
