import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.css']
})
export class LeaverequestComponent implements OnInit {
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

  showtable:any;
  loader:any;
  leaveType:any;
  // uname:any;
  rem:any;
  lres:any;
  header:any;
  myDateFilter:any;
  letype:any;
  // minDate: Moment;?
  minDate:any;
  
  constructor(private router: Router, private http: HttpClient,private datepipe:DatePipe) { }

  ngOnInit(): void {
  this.uname=sessionStorage.getItem("uname");
  this.header=true;
  this.http.post('http://localhost:3000/leavetype',{uname:this.uname}).subscribe((data:any) => {
    console.log(data);
   this.leaveType = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_TYPE_KNH.Response']['IT_LEAVE_TYPE']['item'];
   console.log(this.leaveType);  
  })
  
  this.http.post('http://localhost:3000/leavedetails', { uname: this.uname }).subscribe((data:any) => {
    console.log(data) ;
    this.rem = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_DETAILS_KNH.Response']['IT_LEAVE_REMAIN']['item'][1].QUOTANUM._text;
    console.log(this.rem);
      
    })

  }
  
  submit_values(){
    this.start_date=this.datepipe.transform(this.start_date,'yyyyMMdd');
    this.end_date=this.datepipe.transform(this.end_date,'yyyyMMdd');
    console.log(this.start_date+"   "+this.end_date);
    console.log(this.leave_t);
    if(this.start_date==null){
      alert("Enter Valid Start Date");
    }
    if(this.end_date==null){
      alert("Enter Valid End Date");
    }
    if(this.leave_t==null){
      alert("Enter Valid Leave Type");
      }

    this.http.post('http://localhost:3000/leaverequest', { uname: this.uname ,start_date:this.start_date,end_date:this.end_date,leave_t:this.leave_t }).subscribe((data:any) => {
      console.log(data);
      this.leave_res = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_REQUEST_CHS.Response']['E_RETURN'].TYPE._text;
      this.leave_res_msg = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_REQUEST_CHS.Response'].E_MESSAGE._text;
      console.log(this.leave_res + "  "+ this.leave_res_msg);
      if(this.leave_res=="S" && this.leave_res_msg==null){
        alert("Leave Request Created Successfully !");
        this.router.navigate(['/leavedetails']);
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

  
  // update() {
  //   this.uname = sessionStorage.getItem('uname');
  //   var emp = {
  //     uname: this.uname, startdate: this.startdate, enddate: this.enddate,
  //      letype:this.letype
  //   }
  //   console.log(this.letype);
  //   this.http.post('http://localhost:3000/leaverequest',emp).subscribe((data:any) => {
  //     console.log(emp);
  //   this.lres=data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_REQUEST_CHS.Response']['E_RETURN'];
  //   console.log(this.lres);
  //   if(this.lres=='S'){
  //   alert("Leave Request Created Successfully");
  //   this.router.navigate(['/leavedetails']);
  //          }

  //   })
    
  // }
  show_invoice_num(){
    this.showtable=true;
    this.loader=true;
  this.http.post('http://localhost:3000/leavetype',{uname:this.uname}).subscribe((data:any) => {
    console.log(data);
   this.leaveType = data['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_TYPE_KNH.Response']['IT_LEAVE_TYPE']['item'];
   console.log(this.leaveType); 
      this.loader=false;
    })

    
    

  }
  
  populate_value(a:any){
    this.leave_t=a;
    // this.year=b;
    console.log(this.leave_t);
    this.showtable=false;
  }
  
}
