document.addEventListener("DOMContentLoaded", function () {
  var eventsList = [];

  //localStorage.removeItem('eventsList');

  if (localStorage.getItem("eventsList")) {
    eventsList = JSON.parse(localStorage.getItem("eventsList"));
    console.log(eventsList);
  } else {
    localStorage.setItem("eventsList", "");
  }

  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "myCustomButton",
    },
    initialView: "dayGridMonth",
    events: eventsList,
    height: 600,
    eventColor: "#f51d11",
    customButtons: {
      myCustomButton: {
        text: "Add Period",
        click: () => {
          var startDate = "";
          var endDate = "";
          do {
            startDate = prompt("Enter a start date in the format (YYYYMMDD)");
          } while (startDate === "");

          do {
            endDate = prompt("Enter an end date in the format (YYYYMMDD)");
          } while (endDate === "");

          let i = 0;
          while (i < 3) {
            tsd = parseInt(startDate) + 00000007 * 4 * i;
            ted = parseInt(endDate) + 00000007 * 4 * i;

            let sd = tsd.toString();
            let ed = ted.toString();

            if (startDate !== "" && endDate !== "") {
              {
                calendar.addEvent({
                  id: "period",
                  title: `Period ` + String(i + 1),
                  start: sd,
                  end: ed,
                });

                eventsList.push({
                  id: "period",
                  title: `Period ` + String(i + 1),
                  start: sd,
                  end: ed,
                });

                localStorage.setItem("eventsList", JSON.stringify(eventsList));

                i++;
              }
            }
          }
          alert("Period Started On " + startDate);
        },
      },
    },
  });
  calendar.render();

  calendar.on("dateClick", (par) => {
    console.log("date clicked", par);
  });
});
