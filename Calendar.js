import events from "./events.js";
export default class Calendar {
  constructor() {
    this.events = events;
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    this.today = new Date();
    this.updateMonthVariables();
  }

  updateMonthVariables() {
    this.year = this.today.getFullYear();
    this.monthIndex = this.today.getMonth();
    this.month = this.months[this.monthIndex];
    this.first = new Date(this.year, this.monthIndex, 1);
    this.last = new Date(this.year, this.monthIndex + 1, 0);
    this.prevLast = new Date(this.year, this.monthIndex, 0);
    this.prevDays = this.prevLast.getDate();
    this.lastDays = this.last.getDate();
    this.nextDays = 6 - this.last.getDay();
    this.startingDayOfWeek = (this.first.getDay() + 6) % 7;
  }

  displayNextMonth() {
    const calendarContainer = document.querySelector("#calendar");
    calendarContainer.innerHTML = "";
    this.today.setMonth(this.today.getMonth() + 1);
    this.updateMonthVariables();
    this.renderCalendar();
  }

  displayPrevMonth() {
    const calendarContainer = document.querySelector("#calendar");
    calendarContainer.innerHTML = "";
    this.today.setMonth(this.today.getMonth() - 1);
    this.updateMonthVariables();
    this.renderCalendar();
  }

  renderCalendar() {
    const calendarContainer = document.querySelector("#calendar");
    calendarContainer.classList.add("calendarContainer");
    const monthContainer = document.createElement("div");
    monthContainer.classList.add("monthContainer");
    const leftArrow = document.createElement("i");
    leftArrow.classList.add("fa", "fa-angle-left", "prev");

    const monthElement = document.createElement("div");
    monthElement.innerHTML = this.month + " " + this.year;

    const rightArrow = document.createElement("i");
    rightArrow.classList.add("fa", "fa-angle-right", "next");

    monthContainer.appendChild(leftArrow);
    monthContainer.appendChild(monthElement);
    monthContainer.appendChild(rightArrow);
    calendarContainer.appendChild(monthContainer);

    const calendarHeader = document.createElement("div");
    calendarHeader.classList.add("calendarHeader");
    for (let dayOfWeek of this.daysOfWeek) {
      const dayHeader = document.createElement("div");
      dayHeader.innerHTML = dayOfWeek;
      calendarHeader.appendChild(dayHeader);
    }
    calendarContainer.appendChild(calendarHeader);

    const daysContainer = document.createElement("div");
    daysContainer.classList.add("daysContainer");
    this.getDays(daysContainer, this.prevDays, this.lastDays, this.nextDays);
    calendarContainer.appendChild(daysContainer);

    leftArrow.addEventListener("click", this.displayPrevMonth.bind(this));
    rightArrow.addEventListener("click", this.displayNextMonth.bind(this));
  }

  getDays(container, prevDays, lastDays, nextDays) {
    for (let i = prevDays - this.startingDayOfWeek + 1; i <= prevDays; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day", "prev-days");
      dayElement.innerHTML = i;
      dayElement.addEventListener("click", function () {
        setActiveDay(dayElement);
      });
      container.appendChild(dayElement);
    }

    for (let day = 1; day <= lastDays; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      if (day === this.today.getDate()) {
        dayElement.classList.add("today");
      }
      const event = this.events.find((event) => {
        const eventDate = new Date(event.date);

        return (
          eventDate.getDate() === day &&
          eventDate.getMonth() + 1 === this.monthIndex + 1 &&
          eventDate.getFullYear() === this.year
        );
      });

      if (event) {
        dayElement.classList.add("added");
      }
      dayElement.innerHTML = day;
      dayElement.addEventListener("click", function () {
        const calendarContainer = document.querySelector("#calendar");
        let openedEvents = document.querySelectorAll(".eventModal");
        if (openedEvents.length > 0) {
          openedEvents.forEach((eventContainer) => {
            eventContainer.parentNode.removeChild(eventContainer);
          });
        }
        setActiveDay(dayElement);
        if (dayElement.classList.contains("added")) {
          const eventContainer = document.createElement("div");
          eventContainer.classList.add("eventModal");
          const eventImg = document.createElement("img");
          eventImg.src = "./resources/logo1.gif";
          eventContainer.appendChild(eventImg);
          const eventDescription = document.createElement("div");
          eventDescription.classList.add("eventDescription");
          const title = document.createElement("div");
          title.classList.add("eventTitle");
          title.innerHTML = event.name;
          const eventDetails = document.createElement("div");
          eventDetails.innerHTML = event.details;
          const location = document.createElement("div");
          location.innerHTML = "Location: " + event.location;
          eventDescription.appendChild(title);
          eventDescription.appendChild(eventDetails);
          eventDescription.appendChild(location);
          eventContainer.appendChild(eventDescription);
          let closeButton = document.createElement("i");
          closeButton.classList.add(
            "fa-regular",
            "fa-circle-xmark",
            "close-icon"
          );
          eventContainer.appendChild(closeButton);
          closeButton.addEventListener("click", function () {
            eventContainer.parentNode.removeChild(eventContainer);
          });
          calendarContainer.appendChild(eventContainer);
        }
      });
      container.appendChild(dayElement);
    }

    for (let day = 1; day <= nextDays + 1; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day", "next-days");
      dayElement.innerHTML = day;
      dayElement.addEventListener("click", function () {
        setActiveDay(dayElement);
      });
      container.appendChild(dayElement);
    }

    const setActiveDay = (dayElement) => {
      const allDayElements = container.querySelectorAll(".day");
      allDayElements.forEach((element) => {
        element.classList.remove("active");
      });

      dayElement.classList.add("active");
    };
  }
}
