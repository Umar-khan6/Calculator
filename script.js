const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button"); // FIX: Only calculator buttons
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let lastResult = ""; // store last calculated result
let lastPressedEquals = false; // track if "=" was pressed last

// Function to calculate
const calculate = (btnValue) => {
  display.focus();

  // If "=" is pressed
  if (btnValue === "=" && output !== "") {
    // Replace % with /100 before evaluating
    output = eval(output.replace("%", "/100"));
    lastResult = output; // store result
    lastPressedEquals = true; // mark equals pressed
  }
  // Clear all
  else if (btnValue === "AC") {
    output = "";
    lastResult = "";
    lastPressedEquals = false;
  }
  // Delete last character
  else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    // If last pressed was "=", start new calculation using result
    if (
      lastPressedEquals &&
      specialChars.includes(btnValue) &&
      btnValue !== "="
    ) {
      output = lastResult + btnValue; // continue from result
      lastPressedEquals = false;
    }
    // Prevent starting with special character
    else if (output === "" && specialChars.includes(btnValue)) {
      return;
    } else {
      // If last pressed was "=", and user presses number → reset
      if (lastPressedEquals && !specialChars.includes(btnValue)) {
        output = "";
        lastPressedEquals = false;
      }
      output += btnValue;
    }
  }

  display.value = output;
};

// Add event listeners to calculator buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById("theme-toggle");

// Check saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});
