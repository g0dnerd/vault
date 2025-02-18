import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AlertService } from '../../_services';
import * as ImageActions from '../actions/image.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ImageService } from '../../_services/image.service';

export const imageStoreFailure = createEffect(
  (actions$ = inject(Actions), alertService = inject(AlertService)) => {
    return actions$.pipe(
      ofType(ImageActions.imageStoreFailure),
      tap(({ errorMessage }) => {
        alertService.error(errorMessage, true);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const initAllImages = createEffect(
  (actions$ = inject(Actions), imageService = inject(ImageService)) => {
    return actions$.pipe(
      ofType(ImageActions.initializeAllImages),
      mergeMap(() => {
        return imageService.getAllImages().pipe(
          map((images) => {
            return ImageActions.loadImages({ images });
          }),
          catchError((error) => {
            return of(
              ImageActions.imageStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);

export const initPlayerImages = createEffect(
  (actions$ = inject(Actions), imageService = inject(ImageService)) => {
    return actions$.pipe(
      ofType(ImageActions.initializePlayerImages),
      mergeMap(({ playerId }) => {
        return imageService.getImagesForPlayer(playerId).pipe(
          map((images) => {
            const ids = images.map((i) => i.id);
            return ImageActions.setPlayerImages({ ids });
          }),
          catchError((error) => {
            return of(
              ImageActions.imageStoreFailure({
                errorMessage: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true, dispatch: true }
);
