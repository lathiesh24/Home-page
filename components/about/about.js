class AboutUs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("about.json");
      const data = await response.json();
      this.render(data.aboutPage);
    } catch (error) {
      console.error("Error fetching the about data:", error);
      this.shadowRoot.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    }
  }

  render({ title, description, sections }) {
    const sectionsHTML = sections.map((section) => {
      if (section.id === "team") {
        const membersHTML = section.members
          .map(
            (member) => ` 
              <div class="team-member">
                <img src="${member.image}" alt="${member.name}" />
                <h3>${member.name}</h3>
                <p>${member.position}</p>
                <p>${member.bio}</p>
              </div>
            `
          )
          .join("");
        return ` 
            <div class="section" id="${section.id}">
              <h2>${section.title}</h2>
              <div class="team-members">${membersHTML}</div>
            </div>
          `;
      } else if (section.id === "contact") {
        return ` 
          <div class="section" id="${section.id}">
            <h2>${section.title}</h2>
            <div class="contact-container">
              <div class="contact-info">
                <p>Email: <a href="mailto:${section.info.email}">${section.info.email}</a></p>
                <p>Phone: <a href="tel:${section.info.phone}">${section.info.phone}</a></p>
                <p>Address: ${section.info.address}</p>
                <p><a href="${section.info.map}" target="_blank">View on Map</a></p>
              </div>
              <div class="mapouter">
                <iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Graftohttps://www.google.com/maps/place/Coimbatore,+Tamil+Nadu/@11.0139689,76.967235,12z/data=!3m1!4b1!4m6!3m5!1s0x3ba859af2f971cb5:0x2fc1c81e183ed282!8m2!3d11.0168445!4d76.9558321!16zL20vMDE5ZmM0?entry=ttu&amp;g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%253D%253Dn%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
              </div>
            </div>
          </div>
        `;
      } else {
        return ` 
            <div class="section" id="${section.id}">
              <h2>${section.title}</h2>
              <p>${section.content}</p>
            </div>
          `;
      }
    });

    this.shadowRoot.innerHTML = `
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .about-container {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .about-header {
        text-align: center;
        margin-bottom: 30px;
      }
      .about-header h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        color: #000000;
      }
      .about-header p {
        font-size: 1.2rem;
        color: #555;
      }
      .section {
        margin-bottom: 40px;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .section h2 {
        font-size: 1.8rem;
        color: #444;
        margin-bottom: 10px;
        text-align: center;
      }
      .section p {
        font-size: 1rem;
        color: #666;
        text-align: justify;
        padding: 10px;
      }
      .team-members {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }
      .team-member {
        flex: 1 1 300px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
      }
      .team-member img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .team-member h3 {
        font-size: 1.2rem;
        margin: 5px 0;
      }
      .team-member p {
        font-size: 0.9rem;
        color: #555;
        text-align: center;
      }
      .contact-container {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .contact-info {
        flex: 1;
        padding: 15px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .mapouter {
        flex: 1;
        padding: 15px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .mapouter iframe {
        width: 100%;
        border: none;
        border-radius: 8px;
      }
      .contact-info a {
        color: #007BFF;
        text-decoration: none;
      }
      .contact-info a:hover {
        text-decoration: underline;
      }
    </style>
    <div class="about-container">
      <header class="about-header">
        <h1>${title}</h1>
        <p>${description}</p>
      </header>
      ${sectionsHTML.join("")}
    </div>
    `;
  }
}

customElements.define("about-us", AboutUs);
