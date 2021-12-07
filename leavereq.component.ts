import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leavereq',
  templateUrl: './leavereq.component.html',
  styleUrls: ['./leavereq.component.css']
})
export class LeavereqComponent implements OnInit {
  leave_type:any;
  uname:any;
  start_date:any;
  end_date:any;
  start_time:any;
  end_time:any;
  no_of_hrs:any;
  leave_t:any;

  leave_req:any;
  leave_res:any;
  leave_res_msg="" as any;
  leave_remain: any;
  result:any;
  check=true;
  chk=false;

  constructor(private router: Router, private http: HttpClient,private datepipe:DatePipe) { }
 

  ngOnInit(): void {
    this.uname = sessionStorage.getItem("uname");
    this.http.post('http://localhost:3000/leavetype', { uname: this.uname }).subscribe((data:any) => {
      console.log(data);
      this.leave_type = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_TYPE_KNH.Response']['IT_LEAVE_TYPE']['item'];
      console.log(this.leave_type);

      
    })
    this.http.post('http://localhost:3000/leavedetails', { uname: this.uname }).subscribe((data:any) => {
      console.log(data);
      this.leave_remain = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_DETAILS_KNH.Response']['IT_LEAVE_REMAIN']['IT_LEAVE_REMAIN']['item'][1].QUOTANUM._text;;
      this.leave_remain=this.leave_remain[0].QUOTANUM._text;
      this.leave_remain=parseInt(this.leave_remain);
      console.log(this.leave_remain);
      if(this.leave_remain<=5){
        this.result = window.confirm("Your Leave balance is about to expire. Kindly check before applying.");
      }
      if(this.leave_remain==0){
        alert("Your Leave balance is"+this.leave_remain+" Your Leave will be considered as loss of Pay");
      }
      if(this.result){
        this.router.navigate(["/employee-leavedetails"]);
      }
    })

  }

  submit_values(){
    this.start_date=this.datepipe.transform(this.start_date,'yyyyMMdd');
    this.end_date=this.datepipe.transform(this.end_date,'yyyyMMdd');
    console.log(this.start_date+"   "+this.end_date);
    console.log(this.start_time+"   "+this.end_time);
    console.log(this.leave_t);
    if(this.start_date==null){
      alert("Enter Valid Sart Date");
    }
    if(this.end_date==null){
      alert("Enter Valid End Date");
    }
    if(this.leave_t==null){
      alert("Enter Valid Leave Type");
;    }

    this.http.post('http://localhost:3000/leaverequest', { uname: this.uname ,start_date:this.start_date,end_date:this.end_date,start_time:this.start_time,end_time:this.end_time,no_of_hrs:this.no_of_hrs,leave_t:this.leave_t }).subscribe((data:any) => {
      console.log(data);
      this.leave_res = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_REQUEST_CHS.Response']['E_RETURN'].TYPE._text;
      this.leave_res_msg = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_REQUEST_CHS.Response'].E_MESSAGE._text;
      console.log(this.leave_res + "  "+ this.leave_res_msg);
      if(this.leave_res=="S" && this.leave_res_msg==null){
        alert("Leave Request Created Successfully !");
      }
      else {
        alert("Failed to create leave request !");
      }
      
    })
  }

  min(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()+1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var date5 = yyyy + '/' + mm + '/' + dd;
    var date4 = new Date(date5);
    return(date4);
  }

  showLeaves(){
    this.check=false;
    this.chk=true;
  }
  showicon(){
    this.check=true;
    this.chk=false;
  }
}


