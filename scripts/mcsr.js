// Load runs or initialize
let runs = JSON.parse(localStorage.getItem("runs")) || [];

// Update saveMCSR to handle saving runs dynamically
function saveMCSR() {
    if (e) e.preventDefault();

    const runDate = document.getElementById("runDate").value;
    const runTime = document.getElementById("runTime").value;
    const bastionType = document.getElementById("bastionType").value;
    const endEnter = document.getElementById("endEnter").value;
    const overworldType = document.getElementById("overworldType").value;

    const newRun = {
        date: runDate,
        time: runTime,
        bastion: bastionType,
        endEnter: endEnter,
        overworld: overworldType,
    };

    // Save runs under the correct key
    const runs = JSON.parse(localStorage.getItem("mcsrRuns")) || [];
    runs.push(newRun);
    localStorage.setItem("mcsrRuns", JSON.stringify(runs));

    alert("Run saved!");

    if (e) window.location.href = "mcsr.html"; // Redirect only if event exists
}

// If matchForm exists on this page → attach listener
const form = document.getElementById("mcsrForm");
if (form) form.addEventListener("submit", saveMCSR);

function editMCSR(index) {
    const runs = JSON.parse(localStorage.getItem("mcsrRuns")) || [];
    const run = runs[index];

    document.getElementById("runDate").value = run.date;
    document.getElementById("runTime").value = run.time;
    document.getElementById("bastionType").value = run.bastion;
    document.getElementById("overworldType").value = run.overworld;
    document.getElementById("notes").value = run.notes;

    // Remove the run being edited from the list
    runs.splice(index, 1);
    localStorage.setItem("mcsrRuns", JSON.stringify(runs));
    displayMCSR();
}

function deleteMCSR(index) {
    const runs = JSON.parse(localStorage.getItem("mcsrRuns")) || [];
    runs.splice(index, 1);
    localStorage.setItem("mcsrRuns", JSON.stringify(runs));
    displayMCSR();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function displayMCSR() {
    const tableBody = document.querySelector("#mcsrTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const runs = JSON.parse(localStorage.getItem("mcsrRuns")) || [];

    runs.sort((a, b) => new Date(b.date) - new Date(a.date));

    runs.forEach((run, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${formatDate(run.date)}</td>
            <td>${run.time}</td>
            <td>${run.bastionType}</td>
            <td>${run.overworldType}</td>
            <ts>${run.notes}</td>
            <td>
                <button onclick="editMCSR(${index})">Edit</button>
                <button onclick="deleteMCSR(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

displayMCSR();
