import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payslippdf',
  templateUrl: './payslippdf.component.html',
  styleUrls: ['./payslippdf.component.css']
})
export class PayslippdfComponent implements OnInit {
  seq_num:any;
  uname:any;
  year:any;
  inv_data:any;
  PathReportString:any;
  inv=true;
  card=false;
  show_inv:any;
  show_table:any;
  loader=false;
  constructor( private router: Router, private http: HttpClient,private sanitizer:DomSanitizer) { }
  logout() {
    // this.authenticationService.logout();
    // sessionStorage.clear();
  }
  ngOnInit(): void {
    this.uname = sessionStorage.getItem("uname");

    
  }
  get_invoice(){
    this.loader=true;
    this.http.post('http://localhost:3000/payslippdf', {
       uname: this.uname,seq_num:this.seq_num}).subscribe((data:any) => {
      console.log(data);
      this.inv_data = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_PAYSLIP_PDF_KNH.Response']['E_BASE64']._text;
      console.log(this.inv_data);
      this.PathReportString = 'data:application/pdf;base64,'+(this.sanitizer.bypassSecurityTrustResourceUrl(this.inv_data) as any).changingThisBreaksApplicationSecurity;
      document.getElementById('inv').setAttribute("src",this.PathReportString);
      this.loader=false;
    })

  }
  show_invoice_num(){
    this.show_table=true;
    this.loader=true;
    this.http.post('http://localhost:3000/payslip', { uname: this.uname}).subscribe((data:any) => {
      console.log(data);
      this.show_inv = data['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_PAYSLIP_DETAILS_KNH.Response']['IT_OUTPUT']['item'];
      console.log(this.show_inv);
      this.loader=false;
    })
    

  }

  populate_value(a:any){
    this.seq_num=a;
    console.log(this.seq_num);
    this.show_table=false;
  }

  toogle(){
    this.inv=false;
    this.card=true;
  }

}
