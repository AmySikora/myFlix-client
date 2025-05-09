# myFlix

myFlix is a web application built with React that allows users to browse, view details, and manage their favorite movies. With myFlix, users can sign up, log in, view a list of movies, see detailed information about each one, and manage their profile information and favorite movies. 

## Features

- **User Authentication**: Sign up, log in, and log out securely.
- **Browse Movies**: View a list of movies with search functionality.
- **Detailed Movie Information**: Click on any movie to see details, including genre, director, description, and image.
- **Favorite Movies Management**: Add or remove movies from your list of favorites.
- **User Profile Management**: Update profile information and manage your favorite movies.

## Usage

1. **Sign Up or Log In:**
    - Sign up for a new account or log in with existing credentials.
2. **Browse Movies:**
    - After logging in, browse the main movie list with search functionality to find specific titles.
3. **View Movie Details:**
    - Select any movie to view detailed information, including the director, genre, and synopsis.
4. **Manage Favorite Movies:**
    - Add or remove movies from your favorites directly on the movie details page.
    - Access and manage your favorite movies from your profile page.
5. **User Profile:**
    - Update your username, password, email, or date of birth.
    - View and manage your favorite movies directly from your profile.

## Essential Views & Components

- **MainView**: Manages routing and renders views for browsing, searching, and viewing movie lists.
- **NavigationBar**: Provides navigation links for login, signup, home, profile, and logout.
- **LoginView**: Allows users to log in.
- **SignupView**: Allows new users to register.
- **MovieCard**: Shows a summary of each movie with an image and title.
- **MovieView**: Provides detailed information for a selected movie and includes an option to add it to favorites.
- **ProfileView**: Displays and manages user profile information, including favorite movies and personal data.

## Dependencies

- **React**: For building the user interface.
- **React Router**: For handling in-app routing.
- **Redux**: For state management, especially for user authentication and movie data.
- **React Bootstrap**: For styling and responsive UI components.
- **React Loading Skeleton**: For loading animations to enhance user experience.

## API Integration

The myFlix app communicates with a RESTful backend API to fetch and update movie and user data. The backend is hosted at: [heroku.com](https://dashboard.heroku.com/apps/myflixmovies123)

### Endpoints Used

- **GET** `/movies`: Retrieves all movies.
- **GET** `/movies/:id`: Retrieves detailed information for a single movie.
- **POST** `/users`: Registers a new user.
- **POST** `/login`: Authenticates a user.
- **PUT** `/users/:username`: Updates user profile data.
- **POST** `/users/:username/movies/:movieId`: Adds a movie to user favorites.
- **DELETE** `/users/:username/movies/:movieId`: Removes a movie from user favorites.
- **DELETE** `/users/:username`: Deregisters the user account.

## Development & Deployment

To run or deploy the application locally or on a server:

1. **Install Dependencies**:
   ```bash
   npm install
