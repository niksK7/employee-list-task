let employees = [];

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("employee-list");

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

      // displays name + title
      const header = document.createElement("div");
      header.textContent = `${employee.name} - ${employee.title}`;
      header.classList.add("employee-header");

      //adds the employee info to the list
      li.appendChild(header);
      listContainer.appendChild(li);
    });
  }
});
