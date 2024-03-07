export const metropolitan = {
  id: "metropolitan",
  title: "Metropolitan Museum of Art",
  regularHours: "Thursday–Tuesday: 10 am–5 pm",
  address: "New York, NY, USA",

  closed: "Wednesday",
  center: [40.779437, -73.963244],
  zoomLevel: 17,
  marker: {
    position: [40.779437, -73.963244],
    popupContent:
      "<b>Metropolitan Museum of Art</b><br>1000 5th Ave, New York, NY",
  },
};

export const moma = {
  id: "moma",
  title: "Museum of Modern Art (MoMA)",
  regularHours: "Thursday–Tuesday: 10 am–5 pm",
  address: "New York, NY, USA",

  closed: "Wednesday",
  center: [40.7614, -73.9776],
  zoomLevel: 17,
  marker: {
    position: [40.7614, -73.9776],
    popupContent:
      "<b>Museum of Modern Art (MoMA)</b><br>11 W 53rd St, New York, NY",
  },
};

export const louvre = {
  id: "louvre",
  title: "Louvre Museum",
  regularHours: "Wednesday–Monday: 10 am–5 pm",
  closed: "Tuesday",
  address: "Paris, France",

  center: [48.8606, 2.3376],
  zoomLevel: 17,
  marker: {
    position: [48.8606, 2.3376],
    popupContent: "<b>Louvre Museum</b><br>Rue de Rivoli, 75001 Paris, France",
  },
};

export const guggenheim = {
  id: "guggenheim",
  title: "Guggenheim Museum",
  regularHours: "Monday–Friday: 10 am–5:45 pm",
  address: "New York, NY, USA",

  closed: "Thursday",
  center: [40.7829, -73.9584],
  zoomLevel: 17,
  marker: {
    position: [40.7829, -73.9584],
    popupContent: "<b>Guggenheim Museum</b><br>1071 5th Ave, New York, NY",
  },
};

export const picassoMalaga = {
  id: "picassoMalaga",
  title: "Museo Picasso Málaga",
  regularHours: "Monday–Sunday: 9:30 am–6:30 pm",
  closed: "No closing days",
  center: [36.7211, -4.4197],
  address: "Malaga, Spain",

  zoomLevel: 17,
  marker: {
    position: [36.7211, -4.4197],
    popupContent:
      "<b>Museo Picasso Málaga</b><br>Palacio de Buenavista, Calle San Agustín, 8, 29015 Málaga, Spain",
  },
};

export const picassoBarcelona = {
  id: "picassoBarcelona",
  title: "Museu Picasso",
  regularHours: "Tuesday–Sunday: 9 am–8:30 pm",
  address: "Barcelona, Spain",

  closed: "Monday",
  center: [41.3851, 2.1734],
  zoomLevel: 17,
  marker: {
    position: [41.3851, 2.1734],
    popupContent:
      "<b>Museu Picasso</b><br>Carrer Montcada, 15-23, 08003 Barcelona, Spain",
  },
};

export const nationalGallery = {
  id: "nationalGallery",
  title: "National Gallery of Art",
  regularHours: "Monday–Saturday: 10 am–5 pm, Sunday: 11 am–6 pm",
  closed: "No closing days",
  center: [38.8913, -77.0199],
  zoomLevel: 17,
  marker: {
    position: [38.8913, -77.0199],
    popupContent:
      "<b>National Gallery of Art</b><br>6th & Constitution Ave NW, Washington, DC",
  },
};
export default {
  moma,
  louvre,
  guggenheim,
  metropolitan,
  nationalGallery,
  picassoBarcelona,
  picassoMalaga,
};
