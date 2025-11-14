// Mock registered user (default login)
let registeredUser = { username: "pranav", password: "1234" };

// Monthly Activities Array
const activities = [
  { id: 1, activity: "Create project file with tables 12–19", subject: "Maths" },
  { id: 2, activity: "Complete science experiment report", subject: "Science" },
  { id: 3, activity: "Write essay on climate change", subject: "English" },
  { id: 4, activity: "Practice algebra worksheet", subject: "Maths" },
  { id: 5, activity: "Prepare chart on solar system", subject: "Science" }
];

// Switch between Login and Register
function showRegister() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

// Register new user
function register() {
  const uname = document.getElementById("regUsername").value.trim();
  const pass = document.getElementById("regPassword").value.trim();

  if (!uname || !pass) {
    alert("Please fill all fields!");
    return;
  }

  registeredUser = { username: uname, password: pass };
  alert("Registration Successful! Please Login.");
  showLogin();
}

// Login validation
function login() {
  const uname = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (uname === registeredUser.username && pass === registeredUser.password) {
    document.getElementById("studentName").textContent = uname;
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("welcomePage").classList.remove("hidden");
  } else {
    alert("Invalid Username or Password!");
  }
}

// Switch between sections (home/profile/activities)
function showSection(sectionId) {
  document.querySelectorAll("main .content").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Show activities based on selected subject
function showActivities() {
  const subject = document.getElementById("subjectSelect").value;
  const listDiv = document.getElementById("activityList");
  listDiv.innerHTML = "";

  if (!subject) return;

  const subjectActivities = activities.filter(a => a.subject === subject);

  if (subjectActivities.length === 0) {
    listDiv.innerHTML = "<p>No activities found for this subject.</p>";
    return;
  }

  subjectActivities.forEach(a => {
    const item = document.createElement("div");
    item.classList.add("activity-item");
    item.innerHTML = `<strong>${a.subject}:</strong> ${a.activity}`;
    listDiv.appendChild(item);
  });
}
