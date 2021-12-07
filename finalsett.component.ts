import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalsett',
  templateUrl: './finalsett.component.html',
  styleUrls: ['./finalsett.component.css']
})
export class FinalsettComponent implements OnInit {

  cname:any;
  ccode:any;
  dept:any;
  curr:any;
  div:any;
  cost:any;
  wdet:any;
  amount:any;
  app:any;
  bas:any;
  add:any;
  ded:any;
  gpay:any;
  npay:any;
  jdate:any;
  edate:any;
  wdays:any;
  tperiod:any;
  uname:any;
  ename:any;
  eid:any;
  tel:any;
  stree:any;
  city:any;
  count:any;


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


    this.http.post('http://localhost:3000/final', { uname: this.uname }).subscribe((data:any) => {
      this.cname = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].COMPANY._text;
      this.ccode = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].COMPCODE._text;
      this.dept = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].DEPARTMENT._text;
      this.curr = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].CURRENCY._text;
      this.div= data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].DIVISION._text;
      this.cost = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].COST_CENTER._text;
      this.wdet = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response']['IT_LEAVEDATA']['item'];
      this.bas= data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].GROSS_PAY._text;
      this.add = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].ADDITIONAL_PAY._text;
      this.ded = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].DEDUCT_AMT._text;
      this.npay= data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].GROSS_PAY._text;
      this.gpay = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].NET_PAY._text;
      this.jdate = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].JOIN_DATE._text;
      this.edate = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].LEAVE_DATE._text;
      this.wdays= data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].NUM_OF_LEAVES._text;
      this.tperiod = data['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_EMPLOYEE_FINAL_SET_KNH.Response'].TENURE_PERIOD._text;
   
      sessionStorage.setItem("fname", this.cname);
      sessionStorage.setItem("lname", this.ccode);
      sessionStorage.setItem("city", this.dept);
      sessionStorage.setItem("street", this.curr);
      sessionStorage.setItem("state", this.div);
      sessionStorage.setItem("pincode", this.cost);
    })
    this.http.post('http://localhost:3000/eprofile', { uname: this.uname }).subscribe((data:any) => {
      this.ename = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].ENAME._text;
      console.log(this.ename);
      this.eid = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].PERNR._text;
      this.tel = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].TELNR._text;
      this.stree= data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].STRAS._text;
      this.city = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].ORT01._text;
      this.count = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].NATIO._text;
  }
    )

    console.log(this.cname);
  }  



}
