class HomeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch("data.json");
    const data = await response.json();
    this.render(data.pages.home.sections);
  }

  render(sections) {
    const sectionsHTML = sections
      .map((section) => {
        return `
            <section id="${section.id}" class="${section.type}">
              <img src="${section.imageUrl}" alt="${section.heading}" class="section-image" />
              <h2 class="section-heading">${section.heading}</h2>
              <h3 class="section-caption">${section.caption}</h3>
              <p class="section-description">${section.description}</p>
              <a href="${section.cta.url}" title="${section.cta.desc}" class="cta-button">${section.cta.label}</a>
            </section>
          `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
          <style>
            main {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
            }
            section {
              width: 100%;
              max-width: 800px;
              margin: 20px 0;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 8px;
              text-align: center;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              background-color: #fff;
             
            }
          
            .section-image {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            .section-heading {
              font-size: 1.5em;
              margin: 10px 0 5px;
              color: #333;
            }
            .section-caption {
              font-size: 1.2em;
              color: #777;
            }
            .section-description {
              font-size: 1em;
              color: #555;
              margin: 10px 0;
            }
            .cta-button {
              display: inline-block;
              margin-top: 15px;
              padding: 10px 20px;
              background: #007BFF;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background 0.3s;
            }
            .cta-button:hover {
              background: #0056b3;
            }
          </style>
          <main>
            ${sectionsHTML}
          </main>
        `;
  }
}

customElements.define("home-component", HomeComponent);
