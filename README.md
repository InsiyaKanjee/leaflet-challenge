# Visualizing Data with Leaflet

## Background

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

This repo has a visualization done from some of the data from their website.

## Visualization

1. **Get data set**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and picked a data set to visualize (all earthquakes in past 7 days). 

2. **Import & Visualize the Data**

   Created a map using Leaflet that plots all of the earthquakes from yotheur data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * Includes popups that provide additional information about the earthquake when a marker is clicked.

   * Includes a legend that will provide context for map data.

   * The map has 5 base maps: 
      1- Street
      2- Satellite
      3- Grayscale
      4- Outdoors
      5- Dark

   * The map has 2 overlays: 
      1- Earthquakes
      2- Tectonic Plates (relationship between tectonic plates and seismic activity)

   * Map also has a layer control to to toggle between options.      
   
   * Map is deployed on github pages

