import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Image } from '@vault/shared';
import { environment } from '../../../environments/environment';
import { AlertService, ImageService } from '../../_services';
import { selectPlayerImages, State } from '../../_store';
import { initializePlayerImages } from '../../_store/actions/image.actions';

@Component({
  selector: 'app-manage-pool',
  standalone: true,
  imports: [CommonModule, PushPipe],
  templateUrl: './manage-pool.component.html',
  styleUrl: './manage-pool.component.css',
})
export class ManagePoolComponent implements OnInit {
  @Input({ required: true, transform: numberAttribute }) playerId = 0;

  loading = false;
  submitted = false;

  readonly imageUrl = environment.userUploadUrl;
  imgFile: File | null = null;

  private readonly store$ = inject(Store<State>);
  readonly images$: Observable<Image[]> =
    this.store$.select(selectPlayerImages);

  constructor(
    private readonly imageService: ImageService,
    private readonly alertService: AlertService
  ) {}

  async ngOnInit() {
    this.store$.dispatch(initializePlayerImages({ playerId: this.playerId }));
  }

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
    this.imageService.handleImageUpload(formData).subscribe();
    this.imgFile = null;
    this.loading = false;
  }
}
