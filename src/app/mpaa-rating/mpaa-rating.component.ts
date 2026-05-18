import { Component, Signal, computed, effect, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpaaRating, OmdbResultDetails, POSSIBLE_MPAA_RATINGS, Rating, compareMpaaRatings, isUnrated } from '../types/omdb';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { form, FormField } from "@angular/forms/signals";

@Component({
    selector: 'app-mpaa-rating',
    templateUrl: './mpaa-rating.component.html',
    styleUrls: ['./mpaa-rating.component.css'],
    imports: [FontAwesomeModule, CommonModule, FormField]
})
export class MpaaRatingComponent {
  // this value is passed in from the parent component - AppComponent in app.component.ts
  public result = input<OmdbResultDetails>();
  public goodRatingChanged = output<boolean | null>({
    alias: 'good-rating-changed',
  });
  // we are setting default values here, but notice the user can change these values by
  // selecting a different rating and by searching a movie
  private preferredMaxRatingSignal = signal<MpaaRating>('R');
  protected preferredMaxRatingForm = form(this.preferredMaxRatingSignal);
  
  protected isGoodRating = computed(() => {
    const rated = this.result()?.rated ?? 'NR';
    const maxRated = this.preferredMaxRatingSignal();
    return this.checkRating(rated, maxRated);
  });

  protected iconStyle: Signal<IconDefinition> = computed(() => {
    const isGood = this.isGoodRating();
    if (isGood) {
      return faCheckCircle;
    }
    else {
      return faXmarkCircle;
    }
  });

  protected iconColor: Signal<string> = computed(() => {
    const isGood = this.isGoodRating();
    if (isGood) {
      return 'green';
    }
    else {
      return 'red';
    }
  });
  
  // re-expose to template
  protected readonly AVAILABLE_RATINGS = POSSIBLE_MPAA_RATINGS;

  constructor() {
    effect(() => {
      this.goodRatingChanged.emit(this.isGoodRating());
    });
  }

  // this function checks to make sure the movie we searched has an appropriate rating for us
  checkRating(rating: Rating, maxRating: MpaaRating): boolean | null {
    if (isUnrated(rating)) {
      return null;
    }
    else if (compareMpaaRatings(maxRating, rating) >= 0) {
      return true;
    }
    return false;
  }
}
