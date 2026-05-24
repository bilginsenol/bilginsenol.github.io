// Shared "More Works by Me" dropdown — single source of truth across all paper pages.
//
// To add a paper: append an entry to the `works` array below. Every page that
// includes this script and has a <div id="more-works-root"></div> mount point
// picks up the change automatically — no need to edit each page.
//
// Pages include it with an absolute path so it resolves from any subdirectory:
//   <script defer src="/more-works.js"></script>
// (toggleMoreWorks() is provided by each page's static/js/index.js.)
(function () {
  const works = [
    {
      title: "TpTf: Transporting Transformer Networks",
      desc: "A shared self-attention encoder replacing Transporter's three CNN branches for visual robotic manipulation.",
      venue: "Preprint 2026",
      url: "https://bilginsenol.github.io/tptf/"
    }
    // Add new publications here, e.g.:
    // { title: "Paper 2 Title", desc: "One-line summary.", venue: "Venue Year", url: "https://bilginsenol.github.io/paper2/" },
  ];

  function render() {
    const mount = document.getElementById("more-works-root");
    if (!mount) return;

    const items = works.map(w => `
        <a href="${w.url}" class="work-item">
          <div class="work-info">
            <h5>${w.title}</h5>
            <p>${w.desc}</p>
            <span class="work-venue">${w.venue}</span>
          </div>
          <i class="fas fa-external-link-alt"></i>
        </a>`).join("");

    mount.innerHTML = `
      <div class="more-works-container">
        <button class="more-works-btn" onclick="toggleMoreWorks()" title="More works by me">
          <i class="fas fa-flask"></i>
          More Works
          <i class="fas fa-chevron-down dropdown-arrow"></i>
        </button>
        <div class="more-works-dropdown" id="moreWorksDropdown">
          <div class="dropdown-header">
            <h4>More Works by Me</h4>
            <button class="close-btn" onclick="toggleMoreWorks()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="works-list">${items}</div>
        </div>
      </div>`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
