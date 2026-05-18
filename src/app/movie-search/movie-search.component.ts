import { Component, model, signal } from '@angular/core';
import { OmdbApiService } from '../omdb-api.service';
import { Subject } from 'rxjs';
import { OmdbResultDetails} from '../types/omdb';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { form, FormField } from "@angular/forms/signals";

@Component({
  selector: 'app-movie-search',
  imports: [FormField],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent {
  protected titleModel = signal<string>("");
  protected titleForm = form(this.titleModel);
  private omdbResults$ = new Subject<OmdbResultDetails>();
  public newResult = outputFromObservable(this.omdbResults$, {alias: 'result-changed'});
  constructor(
    private omdbApi: OmdbApiService,
  ) { }

  submitSearch() {
    this.omdbApi.retrieveOmdb({title: this.titleModel()}).subscribe({
      next: (result) => {
        this.omdbResults$.next(result);
      }
    });
  }
}
