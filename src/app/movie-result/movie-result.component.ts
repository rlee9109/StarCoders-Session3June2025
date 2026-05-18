
import { Component, computed, effect, input } from '@angular/core';
import { OmdbResultDetails } from '../types/omdb';

@Component({
  selector: 'app-movie-result',
  templateUrl: './movie-result.component.html',
  styleUrl: './movie-result.component.css'
})
export class MovieResultComponent {
  shouldWatch = input<boolean | null>(null, {
    alias: "should-watch",
  });
  result = input<OmdbResultDetails>();
  protected resultText = computed(() => {
    const shouldWatch = this.shouldWatch();
    console.log(shouldWatch);
    if (shouldWatch) {
      return "It's a great movie! You should watch it.";
    }
    else {
      return "This is not the movie for you! Don't watch it.";
    }
  });
}
