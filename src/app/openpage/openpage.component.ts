import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-openpage',
  templateUrl: './openpage.component.html',
  styleUrls: ['./openpage.component.css']
})
export class OpenpageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  Userlog(){
    this.router.navigate(['login']);
  }

  Adminlog(){
    this.router.navigate(['adiminlog']);
  }


}
