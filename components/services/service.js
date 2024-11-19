class ServicesSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.loadServices();
  }

  async loadServices() {
    try {
      const response = await fetch("services.json");
      const data = await response.json();
      this.render(data.servicesPage);
    } catch (error) {
      console.error("Error loading services:", error);
      this.shadowRoot.innerHTML = `<p>Error loading services. Please try again later.</p>`;
    }
  }

  render({ description, services }) {
    const styles = `
        <style>
          :host {
            display: block;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
  
          .description {
            text-align: center;
            font-size: 1.2em;
            margin-bottom: 20px;

            color: #555;
          }
  
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
            gap: 20px;
            margin-left: 20px;
          }
  
          .service-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
              background: white; /* Default background */
  transition: background 0.3s ease-in-out; 

          }
  
          .service-card:hover {
  background: linear-gradient(to right, #fae9ec, white, #f7cbd4); 
          }




          .service-icon {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
  
          .service-content {
            padding: 15px;
          }
  
          .service-title {
            font-size: 1.5em;
            margin: 0 0 10px;
          }
  
          .service-description {
            margin: 0 0 15px;
          }
  
          .service-features {
            list-style-type: disc;
            margin: 0;
            padding-left: 20px;
          }
        </style>
      `;

    const content = `
        <p class="description">${description}</p>
        <div class="services-grid">
          ${services
            .map(
              (service) => `
              <div class="service-card">
                <img src="${service.icon}" alt="${
                service.title
              }" class="service-icon">
                <div class="service-content">
                  <h2 class="service-title">${service.title}</h2>
                  <p class="service-description">${service.description}</p>
                  <ul class="service-features">
                    ${service.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                  </ul>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      `;

    this.shadowRoot.innerHTML = `${styles}${content}`;
  }
}

customElements.define("services-section", ServicesSection);
