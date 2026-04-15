export default function About() {
    return (
        <div>
            <h1>About the project</h1>
             <p>This project is a Wordle-inspired web application where the player tries to guess a hidden word.</p>

             <p>The application is built using React for the frontend and Express/vite (dev server) for the backend.</p>   
             
             <p>A local MongoDB (community edition) database is used to store highscores.</p>

             <p>The frontend communicates with the backend through a REST API to fetch words and validate guesses.</p>

             <p>When a player wins, their result can be saved and displayed on the highscore page.</p>

             <p>The highscore page is server-side rendered using Handlebars to demonstrate SSR functionality.</p>
        </div>
    );
}