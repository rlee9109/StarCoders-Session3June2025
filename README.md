# Instructions
## Setup
Get familiar with the application. Try out the UI, and walk through app.component.html.Understand how the components are connected.

1. Run the app and find an action movies with a critic score above 70 and have a maximum rating of PG-13.
    <details>
      <summary>Solution</summary>  
      
      - Black Panther
      - Inception
      - Godzilla Minus One
      
    </details>
    


2. Display the movie's plot in the search results.
    <details>
      <summary>Solution</summary>  
      
      Look at `movie-result.component.html` (and the `OmdbResultDetails` function in 
      `omdb.ts` for help on variable names).  
      Line 9 add:  
        ```html
        <p>{{this.result()?.plot}}</p>
        ```
      
    </details>

## Challenges
Explore each component independently! Spend a few minutes working independently, and then discuss with the group. Hints are available by clicking the arrows, but try doing it on your own first.  
### 1. Critic Score
Change the first criteria to "Choose a Maximum Critic Score"
<details>
  <summary>Solution</summary>  
  
  1. Look at `critic-score.component.ts`, `checkScores` function. The comparison should be `<=`  
      ```diff
       // this function checks to make sure the movie we searched has a good enough critic score for us
       checkScores(score: number | undefined, minScore: number): boolean | null {
         if (score === undefined) {
           return null;
         }
      -  return (score >= minScore);
      +  return (score <= minScore);
       }
      ```
  2. Change `critic-score.component.html` to say "Choose a Maximum Critic Score"  
      ```diff
       <div>
       @if (result()) {
         <fa-icon 
           [ngStyle]="{'margin-right': '1rem', 'color': iconColor()}"
           [icon]="iconStyle()"
           [title]="`Score: ${result()?.metascore?.toFixed(2)}`"
         />
       }
      -   <label for="minPreferredScore">Choose a Minimum Critic Score: </label>
      +   <label for="minPreferredScore">Choose a Maximum Critic Score: </label>
         <input type="number" id="minPreferredScore" [formField]="minPreferredScoreForm" />
       </div>
      ```

</details>
  

### 2. Genre
Change the second criteria to have an option for "Documentary"
<details>
  <summary>Solution</summary>

  Look at `genre.component.html`. Add an additional input and label similar to how other genres are implemented.  
  ```diff
       <input type="radio" value="Drama" id="dramaOption" [formField]="preferredGenreForm">
       <label for="dramaOption">
         Drama
       </label> 
  +     <input type="radio" value="Documentary" id="documentaryOption" [formField]="preferredGenreForm">
  +     <label for="documentaryOption">
  +       Documentary
  +     </label> 
     </div>
   </div>
  ```

</details>


### 3. MPAA Rating
Change the third criteria to "Choose a Minimum Rating"
<details>
  <summary>Solution</summary>
  
  1. Look at `mpaa-rating.component.ts`, in the `checkRating` function, you can reverse the comparison.
      ```diff
       // this function checks to make sure the movie we searched has an appropriate rating for us
       checkRating(rating: Rating, maxRating: MpaaRating): boolean | null {
         if (isUnrated(rating)) {
           return null;
         }
      -   else if (compareMpaaRatings(maxRating, rating) >= 0) {
      +   else if (compareMpaaRatings(maxRating, rating) <= 0) {
           return true;
         }
         return false;
       }
      ```
  2. Change `mpaa-rating.component.html` to say "Choose a Minimum Rating"  
      ```diff
       <div>
       @if (result()) {
         <fa-icon 
           [ngStyle]="{'margin-right': '1rem', 'color': iconColor()}"
           [title]="`Rated ${result()?.rated}`"
         />
       }
      -  <span>Choose a Maximum Rating: </span>
      +  <span>Choose a Minimum Rating: </span>
       </div>
      ```

</details>

### Bonus
Change the genre criteria to be multiselect. Do not use "Any" as an option.
<details>
<summary>Solution</summary>



</details>