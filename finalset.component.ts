import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalset',
  templateUrl: './finalset.component.html',
  styleUrls: ['./finalset.component.css']
})
export class FinalsetComponent implements OnInit {
  country:any;
  lang:any;
  cityc:any;
  dnotice:any;
  cnotice:any;
  flagnotice:any;
  flagtwo:any;
  uname:any;
  reqtype:any;
  notice:any;
  
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
  ename:any;
  eid:any;
  tel:any;
  stree:any;
  city:any;
  count:any;
  knhs:any;
  ss=false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.uname=sessionStorage.getItem("uname");
    this.checknotice();

  }
  checknotice(){
    this.reqtype="CHECK";
    this.http.post('http://localhost:3000/final', { uname: this.uname,reqtype:this.reqtype }).subscribe((data:any) => {
      console.log(data);
      this.notice = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_CHECK_FLAG._text;
      console.log(this.notice);
      if(this.notice=="Not in notice period"){
        this.knhs=true;
        this.flagnotice=true;
      }
      else{
        if(this.notice="In notice period"){
          this.flagnotice=false;
          this.flagtwo=true;
          this.ss=true;
          this.knhs=false;
          this.reqtype="DISPLAY";
          this.http.post('http://localhost:3000/final', { uname: this.uname,reqtype:this.reqtype }).subscribe((data:any) => {
            console.log(data);
            this.ename = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['E_EMPLOYEEDETAILS'].ENAME._text;
            // this.eid = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['E_EMPLOYEEDETAILS'].PENNR._text;
            this.tel = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['E_EMPLOYEEDETAILS'].TELNR._text;
            this.stree = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['E_EMPLOYEEDETAILS'].STRAS._text;
            this.city = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['E_EMPLOYEEDETAILS'].ORT01._text;
            this.count = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['E_EMPLOYEEDETAILS'].NATIO._text;

            this.ccode = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['COMPANYDETAILS']['item'][1].COMP_CODE._text;
            this.cname = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['COMPANYDETAILS']['item'][1].COMP_NAME._text;
            this.cityc = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['COMPANYDETAILS']['item'][1].CITY._text;
            this.curr = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['COMPANYDETAILS']['item'][1].CURRENCY._text;
            this.country= data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['COMPANYDETAILS']['item'][1].COUNTRY._text;
            // this.lang = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['COMPANYDETAILS']['item'][1].LANGU._text;
            this.wdet = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['WAGETYPES']['item'];
            console.log(this.wdet);
            this.bas= data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['BASICPAY']['item'][1].EMPLOYEENO._text;
            // this.add = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['WAGETYPES'].AMOUNT._text;
            this.gpay = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_GROSSPAY._text;
            this.npay= data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_NETPAY._text;
            // this.gpay = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response']['WAGETYPES'].NET_PAY._text;
            // this.jdate = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].JOIN_DATE._text;
            // this.edate = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].._text;
            this.jdate= data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_JOINDATE._text;
            this.edate = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_EXITDATE._text;
            this.tperiod = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_TENUREPERIOD._text;
            
          })
      this.http.post('http://localhost:3000/eprofile', { uname: this.uname }).subscribe((data:any) => {
      // this.ename = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].ENAME._text;
      // console.log(this.ename);
      // this.eid = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].PERNR._text;
      // this.tel = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].TELNR._text;
      // this.stree= data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].STRAS._text;
      // this.city = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].ORT01._text;
      // this.count = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_DETAILS_KNH.Response']['E_IT_OUTPUT'].NATIO._text;
  }
    )



        }
      }
      
    })

    
  }
  createnotice(){
    this.reqtype="CREATE";
    this.http.post('http://localhost:3000/final', { uname: this.uname,reqtype:this.reqtype }).subscribe((data:any) => {
      console.log(data);
      this.cnotice = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_CREATE_FLAG._text;
      console.log(this.cnotice);
      if(this.cnotice=="Added to notice period"){
        alert("Notice period create successfully");
        this.knhs=false;
        this.ss=true;
      }
      this.checknotice();
    })
  }
deletenotice(){
  this.reqtype="DELETE";
  this.http.post('http://localhost:3000/final', { uname: this.uname,reqtype:this.reqtype }).subscribe((data:any) => {
    console.log(data);
    this.dnotice = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLEMENT_CHS.Response'].E_REMOVE_FLAG._text;
    console.log(this.dnotice);
    if(this.dnotice=="You have been removed from notice period"){
      alert("Notice period deleted successfully");
      this.knhs=true;
      this.ss=false;
    }
    else{ 
      if(this.dnotice=="Cancel date expired"){
        alert("Cancel date expired and cannot be deleted");
      }
      else{
      alert("Notice period  not deleted ");
    }
  }
    this.checknotice();
    this.flagtwo=false;
  })
}
}
