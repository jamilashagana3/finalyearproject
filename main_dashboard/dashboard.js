// ===== MAIN DASHBOARD JS =====

// ===== LOAD SAVED CONTENT =====
function loadSavedContent(){
    // Welcome
    if(localStorage.getItem("welcomeMessage")){
        document.querySelector(".info-boxes .box:nth-child(1) p").innerText =
            localStorage.getItem("welcomeMessage");
    }

    // Programs Offered
    if(localStorage.getItem("programsOffered")){
        document.querySelector(".info-boxes .box:nth-child(2) p").innerText =
            localStorage.getItem("programsOffered");
    }

    // Announcements
    if(localStorage.getItem("announcements")){
        document.querySelector(".info-boxes .box:nth-child(3) p").innerText =
            localStorage.getItem("announcements");
    }
}

// ===== LOAD EVENTS =====
function loadEvents(){
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let track = document.querySelector(".event-track");
    track.innerHTML = ""; // Clear previous cards

    events.forEach((e) => {
        let card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${e.img}" alt="${e.name}">
            <p>${e.name}</p>
            <div class="event-overlay">
                <h4>${e.name}</h4>
                <p>${e.date}</p>
            </div>
        `;
        track.appendChild(card);
    });
}

// ===== ROLE BASED ACCESS =====
function applyRole(){
    let role = localStorage.getItem("userRole"); // 'staff', 'hod', 'student'

    if(role !== 'staff'){
        // Hide staff-only buttons if exist
        document.querySelectorAll('.staff-actions').forEach(btn => {
            btn.style.display = 'none';
        });
    }
}

// ===== LOGIN PANEL =====
function openLogin() {
    document.getElementById("loginPanel").classList.add("active");
}

function closeLogin() {
    document.getElementById("loginPanel").classList.remove("active");
}

// ===== ON PAGE LOAD =====
window.onload = function(){
    loadSavedContent();
    loadEvents();
    applyRole();
}
