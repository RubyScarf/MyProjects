// Load matches or initialize
let matches = JSON.parse(localStorage.getItem("matches")) || [];

// Update saveMatch to handle saving matches dynamically
function saveMatch(e) {
    if (e) e.preventDefault();

    const date = document.getElementById("matchDate").value;
    const opponent = document.getElementById("matchOpponent")?.value || document.getElementById("opponent").value;
    const notes = document.getElementById("matchNotes")?.value || document.getElementById("notes").value;
    const score = document.getElementById("matchScore")?.value || document.getElementById("score").value;

    const newMatch = {
        date,
        opponent,
        notes,
        score: score || "TBA",
    };

    // Save matches under the correct key
    const matches = JSON.parse(localStorage.getItem("mexicoMatches")) || [];
    matches.push(newMatch);
    localStorage.setItem("mexicoMatches", JSON.stringify(matches));

    alert("Match saved!");

    if (e) window.location.href = "nationalmexicanmenssoccer.html"; // Redirect only if event exists
}

// If matchForm exists on this page → attach listener
const form = document.getElementById("matchForm");
if (form) form.addEventListener("submit", saveMatch);

function editMatch(index) {
    const matches = JSON.parse(localStorage.getItem("mexicoMatches")) || [];
    const match = matches[index];

    // Pre-fill the form fields with the selected match's data
    document.getElementById("matchDate").value = match.date;
    document.getElementById("opponent").value = match.opponent;
    document.getElementById("score").value = match.score || "";
    document.getElementById("notes").value = match.notes || "";

    // Remove the match being edited from the list
    matches.splice(index, 1);
    localStorage.setItem("mexicoMatches", JSON.stringify(matches));
    displayMatches(); // Refresh the table
}

function deleteMatch(index) {
    const matches = JSON.parse(localStorage.getItem("mexicoMatches")) || [];
    matches.splice(index, 1); // Remove the match at the specified index
    localStorage.setItem("mexicoMatches", JSON.stringify(matches)); // Save updated matches
    displayMatches(); // Refresh the table
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function displayMatches() {
    const tableBody = document.querySelector("#matchesTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const matches = JSON.parse(localStorage.getItem("mexicoMatches")) || [];

    matches.sort((a, b) => new Date(b.date) - new Date(a.date));

    matches.forEach((m, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${formatDate(m.date)}</td>
            <td>${m.opponent}</td>
            <td>${m.score}</td>
            <td>${m.notes}</td>
            <td>
                <button onclick="editMatch(${index})">Edit</button>
                <button onclick="deleteMatch(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

displayMatches();
