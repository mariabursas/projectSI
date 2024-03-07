export class Locations {
  constructor() {}

  getLocations(mapObject) {
    const locationContent = document.createElement("div");
    locationContent.classList.add("locationContent");
    const scheduleContainer = document.createElement("div");
    scheduleContainer.classList.add("scheduleContainer");
    locationContent.appendChild(scheduleContainer);
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("museumName");
    const address = document.createElement("div");
    address.classList.add("address");
    address.innerHTML = mapObject.address;
    titleContainer.innerHTML = mapObject.title;
    const horizontalLine = document.createElement("hr");
    horizontalLine.classList.add("horizontal");
    const openTitle = document.createElement("div");
    openTitle.classList.add("sectionTitle");
    openTitle.innerHTML = "Open";
    const openHours = document.createElement("div");
    openHours.innerHTML = mapObject.regularHours;
    const horizontalLine2 = document.createElement("hr");
    horizontalLine2.classList.add("horizontal");
    const closedTitle = document.createElement("div");
    closedTitle.classList.add("sectionTitle");
    closedTitle.innerHTML = "Closed";
    const closed = document.createElement("div");
    closed.innerHTML = mapObject.closed;

    scheduleContainer.appendChild(titleContainer);
    scheduleContainer.appendChild(address);
    scheduleContainer.appendChild(horizontalLine);
    scheduleContainer.appendChild(openTitle);
    scheduleContainer.appendChild(openHours);
    scheduleContainer.appendChild(horizontalLine2);
    scheduleContainer.appendChild(closedTitle);
    scheduleContainer.appendChild(closed);
    const mapContent = document.createElement("div");
    mapContent.setAttribute("id", mapObject.id);
    locationContent.appendChild(mapContent);
    visitContainer.appendChild(locationContent);
    this.displayMapLocation(mapObject);
  }
  displayMapLocation(mapObject) {
    let map = L.map(mapObject.id).setView(
      mapObject.center,
      mapObject.zoomLevel
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(mapObject.marker.position)
      .addTo(map)
      .bindPopup(mapObject.marker.popupContent);
  }
}
