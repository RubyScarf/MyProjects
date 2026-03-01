let currentIndex = 0;

function formatRunName(run) {
    return run.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function createCarouselFromTable() {
    const carousel = document.querySelector('.carousel');
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const last5 = rows.slice(0, 5); // Take first 5 rows from table (latest runs)

    last5.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const date = cells[0].textContent.trim();    // Run Date
        const run = cells[1].textContent.trim(); // Run Name
        const status = cells[2].textContent.trim();  // Status
        const notes = cells[3]?.textContent.trim() || ""; // Notes (optional)
        const formattedName = formatRunName(run);

        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.style.backgroundImage = `url('images/${formattedName}.png')`;
        item.style.display = 'none';

        const overlay = document.createElement('div');
        overlay.className = 'carousel-overlay';

        const dateText = document.createElement('p');
        dateText.textContent = `Date: ${date}`;

        const runText = document.createElement('p');
        runText.textContent = `Run: ${run}`;

        const statusText = document.createElement('p');
        statusText.textContent = `Status: ${status}`;

        overlay.appendChild(dateText);
        overlay.appendChild(runText);
        overlay.appendChild(statusText);

        item.appendChild(overlay);
        carousel.appendChild(item);
    });
}

function showNextItem() {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    items[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].style.display = 'block';
}

function initializeCarousel() {
    createCarouselFromTable();
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    items[0].style.display = 'block';
    setInterval(showNextItem, 3000);
}

document.addEventListener('DOMContentLoaded', initializeCarousel);