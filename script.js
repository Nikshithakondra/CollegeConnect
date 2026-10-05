import { collection, addDoc } 
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import { db } from "./firebase.js";
/* ================= TOAST MESSAGE ================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2800);
}


/* ================= EVENT REGISTRATION ================= */

async function registerEvent(eventName) {

    let registrations =
        JSON.parse(localStorage.getItem("campusRegistrations")) || [];

    if (!registrations.includes(eventName)) {

        registrations.push(eventName);

        localStorage.setItem(
            "campusRegistrations",
            JSON.stringify(registrations)
        );

        try {

            await addDoc(collection(db, "eventRegistrations"), {
                eventName: eventName,
                studentName:
                    localStorage.getItem("campusStudent") || "Student",
                registeredAt: new Date().toISOString()
            });

            showToast(
                "✅ Successfully registered for " + eventName
            );

        } catch (error) {

            console.error("Firebase error:", error);

            showToast(
                "⚠️ Registration saved locally, but Firebase failed."
            );
        }

    } else {

        showToast(
            "ℹ️ You are already registered for this event."
        );
    }
}

/* ================= CLUB JOIN ================= */

function joinClub(clubName) {

    let clubs =
        JSON.parse(localStorage.getItem("campusClubs")) || [];

    if (!clubs.includes(clubName)) {

        clubs.push(clubName);

        localStorage.setItem(
            "campusClubs",
            JSON.stringify(clubs)
        );

        showToast("🎉 Welcome to " + clubName + " Club!");

    } else {

        showToast("ℹ️ You already joined " + clubName + ".");

    }
}


/* ================= EVENT SEARCH ================= */

function filterEvents() {

    const search =
        document.getElementById("eventSearch")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll(".event-card");

    cards.forEach(function(card) {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


/* ================= EVENT CATEGORY FILTER ================= */

function filterCategory(category, button) {

    const cards =
        document.querySelectorAll(".event-card");

    const filters =
        document.querySelectorAll(".filter");

    filters.forEach(function(filter) {

        filter.classList.remove("active");

    });

    button.classList.add("active");

    cards.forEach(function(card) {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= LOGIN ================= */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");

}


function loginStudent() {

    const name =
        document.getElementById("studentName")
        .value
        .trim();

    const email =
        document.getElementById("studentEmail")
        .value
        .trim();

    if (name === "" || email === "") {

        showToast("⚠️ Please enter your name and email.");

        return;
    }

    localStorage.setItem("campusStudent", name);

    window.location.href = "dashboard.html";

}


/* ================= FEEDBACK ================= */

function submitFeedback() {

    const feedback =
        document.getElementById("feedback")
        .value
        .trim();

    if (feedback === "") {

        showToast("⚠️ Please write some feedback first.");

        return;
    }

    let feedbackList =
        JSON.parse(localStorage.getItem("campusFeedback")) || [];

    feedbackList.push({
        message: feedback,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "campusFeedback",
        JSON.stringify(feedbackList)
    );

    document.getElementById("feedback").value = "";

    showToast("💙 Thank you! Your feedback was submitted.");

}


/* ================= CLOSE MODAL ================= */

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

});


/* ================= WELCOME BACK ================= */

window.addEventListener("load", function() {

    const student =
        localStorage.getItem("campusStudent");

    if (student) {

        console.log(
            "Welcome back, " + student + "!"
        );

    }

});
window.registerEvent = registerEvent;

window.openLogin = openLogin;
window.closeLogin = closeLogin;
window.loginStudent = loginStudent;
window.submitFeedback = submitFeedback;
