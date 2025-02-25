import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Image } from '@vault/shared';
import { dev } from '../../../environments/environment';
import { AlertService, ImageService } from '../../_services';
import { selectAllImages, State } from '../../_store';

@Component({
  selector: 'app-manage-pool',
  standalone: true,
  imports: [CommonModule, PushPipe],
  templateUrl: './manage-pool.component.html',
  styleUrl: './manage-pool.component.css',
})
export class ManagePoolComponent {
  draftId = input.required<number>();
  loading = false;
  submitted = false;
  imgFile: File | null = null;
  readonly imageUrl = dev.userUploadUrl;

  private readonly store$ = inject(Store<State>);
  readonly images$: Observable<Image[]> = this.store$.select(selectAllImages);

  constructor(
    private readonly imageService: ImageService,
    private readonly alertService: AlertService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.imgFile = file;
    }
  }

  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (!this.imgFile) {
      this.alertService.error('Please select a file to upload');
      this.submitted = false;
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.imgFile);
    formData.append('draftId', String(this.draftId()));
    this.imageService.handleImageUpload(formData).subscribe();
    this.imgFile = null;
    this.loading = false;
  }
}
