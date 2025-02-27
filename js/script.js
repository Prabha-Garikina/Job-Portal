document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const jobContainer = document.querySelector(".job-listings .row");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get input values
    const title = document.querySelector("input[name='keywords']").value;
    const location = document.querySelector("input[name='location']").value;
    const company = document.querySelector("input[name='company']").value;

    // Build API URL with query parameters
    let apiUrl = "http://localhost:3000/api/jobs?";
    if (title) apiUrl += `title=${encodeURIComponent(title)}&`;
    if (location) apiUrl += `location=${encodeURIComponent(location)}&`;
    if (company) apiUrl += `company=${encodeURIComponent(company)}&`;

    // Fetch jobs from backend
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        jobContainer.innerHTML = ""; // Clear previous results

        if (data.length === 0) {
          jobContainer.innerHTML = "<p class='text-center'>No jobs found.</p>";
          return;
        }

        data.forEach((job) => {
          jobContainer.innerHTML += `
                      <div class="col-md-6">
                          <div class="card mb-4">
                              <div class="card-body">
                                  <h3 class="card-title">${job.title}</h3>
                                  <p class="card-text">Company: ${job.company}</p>
                                  <p class="card-text">Location: ${job.location}</p>
                                  <p class="card-text">${job.description}</p>
                                  <a href="${job.link}" class="btn btn-success btn-sm" target="_blank">Apply Now</a>
                              </div>
                          </div>
                      </div>
                  `;
        });
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  });
});
