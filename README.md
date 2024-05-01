# Campus Map (React)

This project provides a frontend experience for viewing UCF locations and campuses within a map application.

## Getting started

After cloning down the repository, run `npm install` to install all of the project dependencies. Once everything is installed you can use one of the following to build the project:

1. For local development, use `npm run dev` and vite start a local development session, rebuilding the project each time a change is made.
2. To build the production assets, run `npm run build`. This will output the production assets to the `dist/` directory. This directory should not be tracked in source code, and will be built during a deployment process.

## Generating Data

The data that drives the map is stored in the `public/data/geojson` directory. Currently, we receive this data in KML format and it needs to be converted into GeoJSON. This can be done by placing the KML files into the `public/data/kml` directory and then running the `npm run convert-kml` command.
