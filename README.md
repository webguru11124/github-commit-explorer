# Project Readme

This project is a React, Material-UI (Mui), and Vite-based application with configured ESLint, Vite test, and Storybook plugins. It utilizes React Router for saving state to the URL and parsing it. The state management is handled by React Toolkit (RTK) and RTK Query for fetching and saving data to the store.

## Getting Started

To run the project locally, follow these steps:

1. Install dependencies:

```bash
yarn install
```

2. Run the development server:

```bash
yarn dev
```

This will start the development server, and you can access the application at [http://localhost:5173](http://localhost:5173).

## Available Scripts

- `yarn dev`: Runs the development server.
- `yarn build`: Builds the application for deployment.
- `yarn preview`: Previews the production build.
- `yarn test`: Runs tests using Vite test.
- `yarn lint`: Runs ESLint to check for linting issues.
- `yarn storybook`: Launches Storybook for component documentation and exploration.

## Project Features

- **Autocomplete Search Bar**: The application features an autocomplete search bar that allows users to search for a repository by its name.

- **Repository Management**: Users can select a repository from the search bar to add it to the repository list and graph.

- **Commit Activity Graph**: The application displays a graph comparing the last year of commit activity grouped by week for each selected repository.

- **Hover State**: Hovering over the graph provides additional information, and users can remove a repository from the repository list.

- **Responsive User Interface**: The user interface is designed to be responsive and user-friendly.

- **Additional Libraries Used**:
  - `chart.js`: Used for rendering charts.
  - `react-chat-2`: Utilized for viewing chat.

## Demo

Watch a demo of the application on [Loom](https://www.loom.com/share/700e0292464d4910b593047529d9351c).

Feel free to explore, contribute, and enhance the project!
