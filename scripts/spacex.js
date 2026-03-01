// Load launches or initialize
let launches = JSON.parse(localStorage.getItem("launches")) || [];

// Update saveLaunch to handle saving launches dynamically
function saveLaunch(e) {
    if (e) e.preventDefault();

    const date = document.getElementById("matchDate").value;
    const mission = document.getElementById("matchMission")?.value || document.getElementById("mission").value;
    const status = document.getElementById("matchStatus")?.value || document.getElementById("status").value;
    const notes = document.getElementById("matchNotes")?.value || document.getElementById("notes").value;

    const newMatch = {
        date,
        mission,
        status,
        notes: notes || "TBA"
    };

    // Save launches under the correct key
    const launches = JSON.parse(localStorage.getItem("spacexMissions")) || [];
    launches.push(newMatch);
    localStorage.setItem("spacexMissions", JSON.stringify(launches));

    alert("Launch saved!");

    if (e) window.location.href = "nationalmexicanmenssoccer.html"; // Redirect only if event exists
}

// If spacexForm exists on this page → attach listener
const form = document.getElementById("spacexForm");
if (form) form.addEventListener("submit", saveLaunch);

function editMatch(index) {
    const launches = JSON.parse(localStorage.getItem("spacexMissions")) || [];
    const launch = launches[index];

    // Pre-fill the form fields with the selected launch's data
    document.getElementById("matchDate").value = launch.date;
    document.getElementById("mission").value = launch.mission;
    document.getElementById("status").value = launch.status || "";
    document.getElementById("notes").value = launch.notes || "";

    // Remove the launch being edited from the list
    launches.splice(index, 1);
    localStorage.setItem("spacexMissions", JSON.stringify(launches));
    displayLaunches(); // Refresh the table
}

function deleteMatch(index) {
    const launches = JSON.parse(localStorage.getItem("spacexMissions")) || [];
    launches.splice(index, 1); // Remove the launch at the specified index
    localStorage.setItem("spacexMissions", JSON.stringify(launches)); // Save updated launches
    displayLaunches(); // Refresh the table
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function displayLaunches() {
    const tableBody = document.querySelector("#launchesTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const launches = JSON.parse(localStorage.getItem("spacexMissions")) || [];

    launches.sort((a, b) => new Date(b.date) - new Date(a.date));

    launches.forEach((m, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${formatDate(m.date)}</td>
            <td>${m.mission}</td>
            <td>${m.status}</td>
            <td>${m.notes}</td>
            <td>
                <button onclick="editLaunch(${index})">Edit</button>
                <button onclick="deleteLaunch(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

displayLaunches();
