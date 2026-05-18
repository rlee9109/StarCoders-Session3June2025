import { Component, Signal, computed, effect, input, model, output, signal } from '@angular/core';
import { OmdbResultDetails } from '../types/omdb';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { form, FormField } from '@angular/forms/signals';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.css'],
    imports: [CommonModule, FontAwesomeModule, FormField]
})
export class GenreComponent {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  public result = input<OmdbResultDetails>();
  public goodGenreChanged = output<boolean | null>({
    alias: 'good-genre-changed',
  });

  private preferredGenreModel = signal<string>('All');
  protected preferredGenreForm = form(this.preferredGenreModel);
  protected isGoodGenre = computed(() => {
    const genres = this.result()?.genres;
    const preferredGenre = this.preferredGenreModel();

    return this.checkGenre(genres, preferredGenre);
  });

  protected iconStyle: Signal<IconDefinition> = computed(() => {
    const isGood = this.isGoodGenre();
    if (isGood) {
      return faCheckCircle;
    }
    else {
      return faXmarkCircle;
    }
  });

  protected iconColor: Signal<string> = computed(() => {
    const isGood = this.isGoodGenre();
    if (isGood) {
      return 'green';
    }
    else {
      return 'red';
    }
  });

  constructor() {
    effect(() => {
      this.goodGenreChanged.emit(this.isGoodGenre());
    });
  }

  // this function checks to make sure our movie is the same genre as the one we want to watch
  checkGenre(genres: string[] | undefined, preferredGenre: string): boolean | null {
    if (genres === undefined || genres.length === 0) {
      return null;
    }
    return preferredGenre === 'All' || genres.includes(preferredGenre);
  }
}
