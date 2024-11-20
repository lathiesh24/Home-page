class Sections extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch("data.json");
    const data = await response.json();
    const otherSections = data.pages.home.sections.filter(
      (section) => section.type !== "hero"
    );
    this.render(otherSections);
  }

  render(sections) {
    const sectionsHTML = sections
      .map((section) => {
        return `
          <section id="${section.id}" class="section">
            <img src="${section.imageUrl}" alt="${section.heading}" class="section-image" />
            <h2 class="section-heading">${section.heading}</h2>
            <p class="section-description">${section.description}</p>
            <a href="${section.cta.url}" class="cta-button">${section.cta.label}</a>
          </section>
        `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        main {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .section {
          border: 1px solid #ddd;
          border-radius: 8px;
          background: linear-gradient(135deg, #8e0e00, #d42589, #ff7e5f);          
          padding: 16px;
          text-align: center;
        }
        .section-image {
          max-width: 100%;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .section-heading {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .section-description {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .cta-button {
          display: inline-block;
          padding: 8px 16px;
          color: #d42589;
          font-weight: bold;
          border: 1;
          background-color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.9rem;
        }

      </style>
      <main>
        ${sectionsHTML}
      </main>
    `;
  }
}

customElements.define("other-sections", Sections);
