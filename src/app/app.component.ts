import { Component, computed, model, signal } from '@angular/core';
import { CriticScoreComponent } from './critic-score/critic-score.component';
import { GenreComponent } from './genre/genre.component';
import { MpaaRatingComponent } from './mpaa-rating/mpaa-rating.component';
import { MovieResultComponent } from "./movie-result/movie-result.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { OmdbResultDetails } from './types/omdb';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CriticScoreComponent, GenreComponent, MpaaRatingComponent, MovieResultComponent, MovieSearchComponent]
})
export class AppComponent {
  protected omdbResult = signal<OmdbResultDetails | undefined>(undefined);
  protected isGoodScore = signal<boolean | null>(null);
  protected isGoodRating = signal<boolean | null>(null);
  protected isGoodGenre = signal<boolean | null>(null);
  protected shouldWatch = computed(() => {
      const [omdbResult, isGoodGenre, isGoodRating, isGoodScore] = [this.omdbResult(), this.isGoodGenre(), this.isGoodRating(), this.isGoodScore()];
      return (omdbResult ?? null) && isGoodGenre && isGoodRating && isGoodScore;
    }
  );
}
