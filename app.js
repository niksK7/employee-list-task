// creative feature: Highlight search matches, improves user experience by making the results stand out visually
let employees = [];

const listContainer = document.getElementById("employee-list");
const searchInput = document.getElementById("search");

// Fetch employees from JSON file
fetch("employees.json")
  .then((response) => response.json())
  .then((data) => {
    employees = data;
    renderList(employees);
  });

function renderList(data) {
  listContainer.innerHTML = ""; // clears the current list in the DOM
  data.forEach((employee, index) => {
    const li = document.createElement("li");
    const header = document.createElement("div");
    const name = employee.name;
    const title = employee.title;
    const searchText = searchInput.value.toLowerCase();
    let highlightedName = name;
    const matchIndex = name.toLowerCase().indexOf(searchText);

    // highlights the search match
    if (matchIndex !== -1 && searchText !== "") {
      const before = name.slice(0, matchIndex);
      const match = name.slice(matchIndex, matchIndex + searchText.length);
      const after = name.slice(matchIndex + searchText.length);
      highlightedName = `${before}<mark>${match}</mark>${after}`;
    }

    header.innerHTML = `${highlightedName} - ${title}`;
    header.classList.add("employee-header");

    // displays employee details
    const details = document.createElement("div");
    details.classList.add("employee-details", "hidden");
    details.innerHTML = `
        <p><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Start Date:</strong> ${employee.startDate}</p>
      `;

    // when clicked on employee displays details
    header.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    // adds the employee info to the list
    li.appendChild(header);
    li.appendChild(details);
    listContainer.appendChild(li);
  });
}
// searches for employees based on user search input
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchText)
  );
  renderList(filtered);
});
