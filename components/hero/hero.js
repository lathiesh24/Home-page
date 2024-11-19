class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const heroSection = data.pages.home.sections.find(
        (section) => section.type === "hero"
      );

      if (heroSection) {
        this.render(heroSection);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  render(section) {
    this.shadowRoot.innerHTML = `
      <style>
        .hero-section {
          width: 97%;
          height: 100vh;
          background-image: url('images/rose-petals.png');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          padding: 20px;
          position: relative;
          box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
        }

        .section-heading {
          font-size: 2.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .section-caption {
          font-size: 1.2em;
          margin-bottom: 1em;
        }

        .section-description {
          font-size: 1em;
          margin-bottom: 2em;
        }

        .cta-button {
          padding: 10px 20px;
          background-color: white;
          color: #930548;
          font-weight: bold;
          text-decoration: none;
          font-size: 1em;
          border-radius: 30px;
          transition: background 0.3s ease-in-out;
        }


      </style>
      <section class="hero-section">
        <h2 class="section-heading">${section.heading}</h2>
        <h3 class="section-caption">${section.caption}</h3>
        <p class="section-description">${section.description}</p>
        <a href="${section.cta.url}" title="${section.cta.desc}" class="cta-button">${section.cta.label}</a>
      </section>
    `;
  }
}

customElements.define("hero-section", HeroSection);
