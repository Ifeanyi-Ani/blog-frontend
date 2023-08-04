# Forum App

The Forum App is a web application built with React, TypeScript, and Redux for
state management. It allows users to create accounts, create and manage posts,
like posts, update their profiles, and interact within a forum-like environment.
Additionally, the application features an admin dashboard, accessible only to
users with admin privileges.

## Features

- User Authentication: New users can create accounts to access the platform.
- Post Creation: Authenticated users can create new posts within the forum.
- Post Interactions: Users can like posts to show their appreciation for
  content. Users can also comments on a post.
- Post Deletion: Users are allowed to delete their own posts.
- Profile Page: Users can update their profile details, including their
  username, avatar, and other relevant information.
- Admin Dashboard: A special dashboard accessible to users with admin
  privileges, offering additional administrative features.

## Technologies Used

- React: A popular JavaScript library for building user interfaces.
- TypeScript: A superset of JavaScript that adds static types to the language.
- Redux: A predictable state container for managing the application's state.
- React Router: For handling routing within the application.
- React Bootstrap: A library of reusable UI components based on Bootstrap, for
  consistent styling.
- Backend API: The backend API for this project is hosted at
  [mongodb://127.0.0.1:27017/tumblr-app/](mongodb://127.0.0.1:27017/tumblr-app/).
  It handles user authentication, post creation, and other data management.

## Getting Started

To run the Forum App locally on your machine, follow these steps:

1. Clone the repository: git clone https://github.com/Ifeanyi-Ani/tumblr-blog

2. Install dependencies: cd forum-app npm install

3. Set up the Backend API:

The backend API is hosted at
[mongodb://127.0.0.1:27017/tumblr-app/](mongodb://127.0.0.1:27017/tumblr-app/).
Ensure it is accessible or update the API endpoint in the application's code
accordingly.

4. Start the development server: npm run dev

## Known Issues

- Styling: The application is not completely styled, and certain components may
  lack proper visual styling.
- Responsiveness: The app is not fully responsive across different devices and
  screen sizes.
- TypeScript Checks: TypeScript type checks are not fully implemented, and there
  might be places where the types are not correctly inferred or defined.

## Contributing

Contributions to the Forum App are welcome! If you find a bug or have
suggestions for improvement, feel free to open an issue or submit a pull
request.

Please adhere to the project's code style and follow the existing conventions.

## License

The Forum App is open-source and available under the [ISC License](LICENSE).
Feel free to use, modify, and distribute the application as per the terms of the
license.

---
