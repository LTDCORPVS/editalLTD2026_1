const content = window.siteContent;

function renderOpeningText() {
  const container = document.getElementById("hero-opening");

  container.innerHTML = `
    <p class="hero__opening-title">Abertura oficial</p>
    <p class="hero__opening-text">${content.openingText}</p>
  `;
}

function renderHeroStats() {
  const container = document.getElementById("hero-stats");

  container.innerHTML = content.heroStats
    .map(
      (item, index) => `
        <article class="stat-card reveal" style="--delay:${index * 90}ms">
          <p class="stat-card__value">${item.value}</p>
          <p class="stat-card__label">${item.label}</p>
          <p class="stat-card__detail">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderHighlights() {
  const container = document.getElementById("highlights-grid");

  container.innerHTML = content.highlights
    .map(
      (item, index) => `
        <article class="metric-card reveal" style="--delay:${index * 70}ms">
          <p class="metric-card__label">${item.label}</p>
          <h3 class="metric-card__value">${item.value}</h3>
          <p class="metric-card__detail">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderEdital() {
  const container = document.getElementById("edital-grid");

  container.innerHTML = content.editalSections
    .map((section, index) => {
      const paragraphs = (section.paragraphs || [])
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("");

      const listTitle = section.listTitle
        ? `<p class="panel__list-title">${section.listTitle}</p>`
        : "";

      const list = (section.list || []).length
        ? `<ul class="panel__list">${section.list
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>`
        : "";

      const orderedList = (section.orderedList || []).length
        ? `<ol class="panel__list panel__list--ordered">${section.orderedList
            .map((item) => `<li>${item}</li>`)
            .join("")}</ol>`
        : "";

      const note = section.note ? `<p class="panel__note">${section.note}</p>` : "";

      return `
        <article class="panel reveal" style="--delay:${(index % 3) * 80}ms">
          <div class="panel__top">
            <span class="panel__index">${String(index + 1).padStart(2, "0")}</span>
            <h3 class="panel__title">${section.title}</h3>
          </div>
          <div class="panel__content">
            ${paragraphs}
            ${listTitle}
            ${list}
            ${orderedList}
            ${note}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTimeline() {
  const container = document.getElementById("timeline-grid");

  container.innerHTML = content.timeline
    .map(
      (item, index) => `
        <article class="timeline-card reveal" style="--delay:${index * 80}ms">
          <span class="timeline-card__step">${String(index + 1).padStart(2, "0")}</span>
          <p class="timeline-card__title">${item.title}</p>
          <h3 class="timeline-card__date">${item.date}</h3>
          <p class="timeline-card__detail">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderVacancies() {
  const container = document.getElementById("vacancies-grid");

  container.innerHTML = content.vacancies
    .map(
      (item, index) => `
        <article class="vacancy-card reveal ${item.emphasis ? "vacancy-card--emphasis" : ""}" style="--delay:${index * 90}ms">
          <p class="vacancy-card__label">${item.label}</p>
          <p class="vacancy-card__value">${item.value}</p>
          <p class="vacancy-card__detail">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderResponsibles() {
  const container = document.getElementById("responsibles-grid");

  container.innerHTML = content.responsibles
    .map(
      (person, index) => `
        <article class="responsible-card reveal" style="--delay:${index * 100}ms">
          <p class="responsible-card__eyebrow">Assinatura institucional</p>
          <h3 class="responsible-card__name">${person.name}</h3>
          <p class="responsible-card__role">${person.role}</p>
          <p class="responsible-card__institution">${person.institution}</p>
        </article>
      `
    )
    .join("");
}

function applyApplicationLinks() {
  document.querySelectorAll("[data-application-link]").forEach((link) => {
    link.setAttribute("href", content.applicationUrl);
  });
}

function bindMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      document.body.classList.remove("menu-open");
    });
  });
}

function updateHeaderOffset() {
  const header = document.querySelector(".site-header");
  document.documentElement.style.setProperty(
    "--header-offset",
    `${header.offsetHeight + 28}px`
  );
}

function enableReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function init() {
  renderOpeningText();
  renderHeroStats();
  renderHighlights();
  renderEdital();
  renderTimeline();
  renderVacancies();
  renderResponsibles();
  applyApplicationLinks();
  bindMenu();
  updateHeaderOffset();
  enableReveal();
}

window.addEventListener("resize", updateHeaderOffset);
window.addEventListener("DOMContentLoaded", init);
