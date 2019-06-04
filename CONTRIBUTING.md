# Contributing radio-drama-queen

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Developer: Run the project

### Clone this repository

```bash
git clone git@github.com:just-paja/radio-drama-queen.git
```

### Install dependencies

```bash
npm ci
```

### Start webpack dev server

This is required for development. Starts the dev server on port 3000 and the electron application expects to see the bundle in there. Currently there is no workaround.

```bash
npm start
```

### Run electron app

Opens electron window with the app and hot reload features.

```bash
npm run electron
```

## Developer: Build the project

This project is taking benefit of two big script libraries: [create-react-app](https://github.com/electron-userland/electron-forge/tree/5.x) and [electron-forge](https://github.com/electron-userland/electron-forge). It might be possible that the current build process does not work on all platforms.

To build the project on current platform, just run:

```
npm run build
```

The resulting build is going to be in dist directory.
