function showMechanics(filter = {}) {
    const container = document.getElementById("mechanicsContainer");
    if (!container) return;

    container.innerHTML = "";
    let mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];

    if (filter.city) {
        mechanics = mechanics.filter(m => m.city.toLowerCase().includes(filter.city));
    }
    if (filter.speciality) {
        mechanics = mechanics.filter(m => m.speciality.toLowerCase().includes(filter.speciality));
    }

    mechanics.forEach(m => {
        const card = document.createElement("div");
        card.className = "mechanic-card";

        const avgRating = m.ratings.length ?
            (m.ratings.reduce((a, b) => a + b, 0) / m.ratings.length).toFixed(1) :
            "No ratings";

        card.innerHTML = `
      <img src="${m.image}" alt="${m.name}" />
      <h3>${m.name}</h3>
      <p>City: ${m.city}</p>
      <p>Location: ${m.location}</p>
      <p>Speciality: ${m.speciality}</p>
      <p>Phone: <a href="tel:${m.phone}">${m.phone}</a></p>
      <p>Rating: ${avgRating} ⭐</p>
      <button onclick="rateMechanic(${m.id})">Rate</button>
    `;

        container.appendChild(card);
    });
}

function rateMechanic(id) {
    const rating = Number(prompt("Rate from 1 to 5:"));
    if (rating < 1 || rating > 5 || isNaN(rating)) {
        alert("Invalid rating");
        return;
    }

    let mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];
    const index = mechanics.findIndex(m => m.id === id);
    if (index !== -1) {
        mechanics[index].ratings.push(rating);
        localStorage.setItem("mechanics", JSON.stringify(mechanics));
        alert("Thanks for your rating!");
        showMechanics();
    }
}

function searchMechanics() {
    const city = document.getElementById("searchCity").value.toLowerCase();
    const speciality = document.getElementById("searchSpeciality").value.toLowerCase();
    showMechanics({ city, speciality });
}

//login
document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        const greeting = document.getElementById("userGreeting");
        if (greeting) {
            greeting.textContent = `Welcome, ${user}!`;
        }
    }

    showMechanics();
});

//home
//home
document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        const greeting = document.getElementById("userGreeting");
        if (greeting) {
            greeting.textContent = `Welcome, ${user}!`;
        }
    }

    showMechanics();
});

//about us
// Fade-in on scroll
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Animate once
        }
    });
}, {
    threshold: 0.2,
});

fadeElements.forEach(el => observer.observe(el));


// services section

const services = [{
        title: "Car Service",
        description: "Complete car maintenance and repair.",
        image: "https://cdn-icons-png.flaticon.com/512/741/741407.png",
        features: ["Oil change", "Brake repair", "AC check", "Engine tuning"],
        time: "1-2 hours",
        price: "Starting from ₹800"
    },
    {
        title: "Bike Service",
        description: "Two-wheeler service & quick fixes.",
        image: "https://cdn-icons-png.flaticon.com/512/2224/2224131.png",
        features: ["Chain adjustment", "Oil change", "Brake service"],
        time: "30-60 minutes",
        price: "Starting from ₹300"
    },
    {
        title: "Auto Service",
        description: "Repair and service for auto-rickshaws.",
        image: "https://cdn-icons-png.flaticon.com/512/236/236293.png",
        features: ["Meter check", "Wheel alignment", "Engine service"],
        time: "1 hour",
        price: "Starting from ₹500"
    },
    {
        title: "Bus Service",
        description: "Heavy-duty service for buses.",
        image: "https://cdn-icons-png.flaticon.com/512/2332/2332688.png",
        features: ["Brake testing", "Engine overhaul", "Suspension tuning"],
        time: "2-4 hours",
        price: "Starting from ₹1500"
    }
];

const container = document.getElementById("servicesContainer");

services.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";

    const featuresList = service.features.map(item => `<li>🔧 ${item}</li>`).join("");

    card.innerHTML = `
      <img src="${service.image}" alt="${service.title}">
      <h3>${service.title}</h3>
      <p><strong>${service.description}</strong></p>
      <ul class="service-features">${featuresList}</ul>
      <p><strong>🕐 Time:</strong> ${service.time}</p>
      <p><strong>💰 Price:</strong> ${service.price}</p>
      <button class="service-btn">Book Now</button>
    `;

    container.appendChild(card);
});