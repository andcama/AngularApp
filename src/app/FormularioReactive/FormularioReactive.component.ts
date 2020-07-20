import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-reactive',
  templateUrl: './FormularioReactive.component.html',
  styleUrls: ['./FormularioReactive.component.css'],
})
export class FormularioReactiveComponent implements OnInit {
  contactform = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/'),
      ],
    ],
    city: ['', [Validators.required, Validators.minLength(5)]],
    state: ['', [Validators.required, Validators.minLength(5)]],
    zip: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    console.log('Form→' + JSON.stringify(this.contactform.value));
  }

  isValidField(name:string):boolean{
    const fieldName = this.contactform.get(name);
    return fieldName.invalid && fieldName.touched;
  }

  get isValidUserName(): boolean {
    const fieldUsername = this.contactform.get('userName');
    return (
      fieldUsername.touched || (fieldUsername.dirty && !fieldUsername.valid)
    );
  }

  onPathValue(): void {
    this.contactform.patchValue({ city: 'Alajuela' });
  }

  OnSetValue(): void {
    this.contactform.setValue({ firstName: 'Test' });
  }

  onSetDefault(): void {
    const contact = {
      firstName: 'Andres',
      userName: 'andcama',
      city: 'San Jose',
      state: 'Desamparados',
      zip: '10305',
    };

    this.contactform.setValue(contact);
  }

  onReset(): void {
    this.contactform.reset();
  }
}
