import { Component, OnInit } from '@angular/core';
import { TourService } from '../../tour.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title = 'Add Tour Location';
  tourForm: FormGroup;
  constructor(private tourservice: TourService, private fb: FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.tourForm = this.fb.group({
      location: ['', Validators.required],
      cost: ['', Validators.required]
   });
  }

  addTour() {
    this.tourservice.addTour(this.tourForm);
  }
  ngOnInit() {
  }

}
