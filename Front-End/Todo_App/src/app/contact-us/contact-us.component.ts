import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  
  constructor(private builder: FormBuilder,private contact:ContactService) { }
  ngOnInit() {}
  FormData = this.builder.group({
  EmailAddress: new FormControl('', [Validators.required]),
  Body: new FormControl('', [Validators.required])
  })

  
  onSubmit(FormData:any) {
    console.log(FormData)
    this.contact.SendEmail(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
    }
}
