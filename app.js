const routes = [

  {
    id: "Route 7 AM",
    name: "",
    school: "Route 7 AM",
    start: "",
    end: "",
    stops: [
      "9700 sollie smith rd, tillamook, oregon",
      "9300 sollie smith rd, tillamook, oregon",
      "8115 sollie smith rd, tillamook, oregon",
      "Northwood dr & sollie smith rd tillamook, oregon",
      "westood dr & sollie smith rd, tillamook, oregon",
      "aldrercrest & sollie smith rd, tillamook, oregon",
      "5440 sollie smith rd, tillamook, oregon",
      "Hubert & latimer rd, tillamook, oregon",
      "4370 latimer rd, tillamook, oregon",
      "4260 latimer rd, tillamook, oregon",
      "bells & latimer rd, tillamook, oregon",
      "4170 latimer rd, tillamook, oregon",
      "alla ln & latimer rd, tillamook, oregon",
      "3960 latimer rd, tillamook, oregon",
      "old latimer rd, tillamook, oregon",
      "3300 latimer rd, tillamook, oregon",
      "3225 latimer rd, tillamook, oregon",
      "ashley inn, tillamook, oregon",
      "1720 makinster rd, tillamook, oregon",
      "1260 makinster rd, tillamook, oregon",
      "985 makinster rd, tillamook, oregon",
      "955 makinster rd, tillamook, oregon",
      "2020 wilson river loop, tillamook, oregon",
      "1820 wilson river loop, tillamook, oregon",
      "blum ln & wilson river loop, tillamook, oregon",
      "880 wilson river loop, tillamook, oregon",
      "575 wilson river loop, tillamook, oregon",
      "430 wilson river loop, tillamook, oregon",
      "olson & hwy 6, tillamook, oregon",
      "4th & delmonte, tillamook, oregon",
      "tillamook high school, tillamook, oregon",
      "5th & nestucca, tillamook, oregon",
      "south prarie school, tillamook, oregon",
      "liberty school, tillamook, oregon",
      "wilson school, tillamook, oregon",
      "tillamook junior high school, tillamook, oregon",
      "east school, tillamook, oregon",
      
    ]
  },
  {
    id: "middle-pm",
    name: "Middle School PM Route",
    school: "Springfield Middle School",
    start: "800 N Grand Ave W, Springfield, IL",
    end: "123 Bus Yard Rd, Springfield, IL",
    stops: [
      "2210 Somerset Dr, Springfield, IL",
      "4152 Cobblestone Rd, Springfield, IL",
      "780 Walnut St, Springfield, IL",
      "1616 Laurel St, Springfield, IL"
    ]
  },
  {
    id: "special-needs",
    name: "Special Program Route",
    school: "Jefferson Learning Center",
    start: "123 Bus Yard Rd, Springfield, IL",
    end: "123 Bus Yard Rd, Springfield, IL",
    stops: [
      "2900 Stevenson Dr, Springfield, IL",
      "3351 South Park Ave, Springfield, IL",
      "1048 E Cook St, Springfield, IL"
    ]
  }
];

const routeSelect = document.getElementById("routeSelect");
const schoolName = document.getElementById("schoolName");
const startPoint = document.getElementById("startPoint");
const endPoint = document.getElementById("endPoint");
const stopCount = document.getElementById("stopCount");
const stopsList = document.getElementById("stopsList");
const openMapsButton = document.getElementById("openMapsButton");
const installButton = document.getElementById("installButton");
let deferredInstallPrompt = null;

function buildGoogleMapsUrl(route) {
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    origin: route.start,
    destination: route.end
  });

  if (route.stops.length > 0) {
    params.set("waypoints", route.stops.join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function renderRoute(route) {
  schoolName.textContent = route.school;
  startPoint.textContent = route.start;
  endPoint.textContent = route.end;
  stopCount.textContent = `${route.stops.length} stop${route.stops.length === 1 ? "" : "s"}`;
  stopsList.innerHTML = "";

  route.stops.forEach((stop) => {
    const item = document.createElement("li");
    item.textContent = stop;
    stopsList.appendChild(item);
  });
}

function populateRouteOptions() {
  routes.forEach((route) => {
    const option = document.createElement("option");
    option.value = route.id;
    option.textContent = route.name;
    routeSelect.appendChild(option);
  });
}

function getSelectedRoute() {
  return routes.find((route) => route.id === routeSelect.value) ?? routes[0];
}

routeSelect.addEventListener("change", () => {
  renderRoute(getSelectedRoute());
});

openMapsButton.addEventListener("click", () => {
  const route = getSelectedRoute();
  const mapsUrl = buildGoogleMapsUrl(route);
  window.open(mapsUrl, "_blank", "noopener,noreferrer");
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.classList.remove("hidden");
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.classList.add("hidden");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installButton.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

populateRouteOptions();
routeSelect.value = routes[0].id;
renderRoute(routes[0]);
