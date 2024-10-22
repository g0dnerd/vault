import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../_services';

@Component({
  selector: 'app-create-draft',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './create-draft.component.html',
  styleUrl: './create-draft.component.css',
})
export class CreateDraftComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({

    });
  }
}
