// ===== EVENT MODAL =====
const modal = document.getElementById("eventModal");

function openModal(){
  modal.style.display = "flex";
}

function closeModal(){
  modal.style.display = "none";
}

// ===== SAVE EVENT =====
function saveEvent(){
  let name = document.getElementById("eventName").value;
  let date = document.getElementById("eventDate").value;
  let img  = document.getElementById("eventImage").value;

  if(name === "" || date === "" || img === ""){
    alert("Please fill all fields");
    return;
  }

  let events = JSON.parse(localStorage.getItem("events")) || [];
  events.push({ name, date, img });
  localStorage.setItem("events", JSON.stringify(events));

  closeModal();
  loadEvents(); // dynamic reload
  clearEventModal();
}

// ===== CLEAR EVENT MODAL INPUTS =====
function clearEventModal(){
  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventImage").value = "";
}

// ===== LOAD EVENTS =====
function loadEvents(){
  let events = JSON.parse(localStorage.getItem("events")) || [];
  let track = document.querySelector(".event-track");
  track.innerHTML = ""; // clear previous events

  events.forEach((e, index) => {
    let card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${e.img}" alt="${e.name}">
      <p>${e.name}</p>
      <div class="event-overlay">
        <h4>${e.name}</h4>
        <p>${e.date}</p>
        <div class="staff-actions">
          <button onclick="editEvent(${index})">Edit</button>
          <button onclick="deleteEvent(${index})">Delete</button>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

// ===== DELETE EVENT =====
function deleteEvent(index){
  let events = JSON.parse(localStorage.getItem("events"));
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
}

// ===== EDIT EVENT =====
let currentEventIndex = null;

function editEvent(index){
  currentEventIndex = index;
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const e = events[index];

  // Fill modal inputs for editing
  document.getElementById("eventName").value = e.name;
  document.getElementById("eventDate").value = e.date;
  document.getElementById("eventImage").value = e.img;

  // Open modal
  openModal();

  // Change Save button to Save Edit dynamically
  const btn = document.querySelector("#eventModal .modal-actions button:first-child");
  btn.innerText = "Save Edit";
  btn.onclick = saveEditEvent;
}

// ===== SAVE EDITED EVENT =====
function saveEditEvent(){
  let name = document.getElementById("eventName").value;
  let date = document.getElementById("eventDate").value;
  let img  = document.getElementById("eventImage").value;

  if(name === "" || date === "" || img === ""){
    alert("Please fill all fields");
    return;
  }

  let events = JSON.parse(localStorage.getItem("events")) || [];
  events[currentEventIndex] = { name, date, img };
  localStorage.setItem("events", JSON.stringify(events));

  closeModal();
  loadEvents();
  clearEventModal();

  // Reset Save button back to normal
  const btn = document.querySelector("#eventModal .modal-actions button:first-child");
  btn.innerText = "Save";
  btn.onclick = saveEvent;
  currentEventIndex = null;
}

// ===== EDIT INFO BOXES =====
let currentParagraph = null;

function openPopup(button){
  currentParagraph = button.closest(".box").querySelector("p");
  document.getElementById("editText").value = currentParagraph.innerText;
  document.getElementById("editPopup").style.display = "flex";
}

function closePopup(){
  document.getElementById("editPopup").style.display = "none";
}

// ===== SAVE INFO BOX EDIT =====
function saveEditInfoBox(){
  if(currentParagraph){
    currentParagraph.innerText = document.getElementById("editText").value;

    const boxTitle = currentParagraph.closest(".box").querySelector("h3").innerText;

    if(boxTitle.includes("Welcome")){
      localStorage.setItem("welcomeMessage", currentParagraph.innerText);
    }
    if(boxTitle.includes("Programs")){
      localStorage.setItem("programsOffered", currentParagraph.innerText);
    }
    if(boxTitle.includes("Announcements")){
      localStorage.setItem("announcements", currentParagraph.innerText);
    }

    closePopup();
  }
}

// ===== ON LOAD =====
window.onload = function(){
  loadEvents();

  // Load saved info box content
  if(localStorage.getItem("welcomeMessage"))
    document.querySelector(".info-boxes .box:nth-child(1) p").innerText = localStorage.getItem("welcomeMessage");

  if(localStorage.getItem("programsOffered"))
    document.querySelector(".info-boxes .box:nth-child(2) p").innerText = localStorage.getItem("programsOffered");

  if(localStorage.getItem("announcements"))
    document.querySelector(".info-boxes .box:nth-child(3) p").innerText = localStorage.getItem("announcements");
}
