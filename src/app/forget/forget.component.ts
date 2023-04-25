import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  answer:string='';
  constructor(private service:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }
  forgot()
  {
    this.service.forgotpassword(this.answer).subscribe((res)=>
    {
      if(res==1)
      {
        console.log("Key is valid");
        this.router.navigate(["update"])


      }
      else{
        console.log("key is invalid")
      }


    })
  }

  onCancel(){    
    this.router.navigate(['/register']);
  }


}
