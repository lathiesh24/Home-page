class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(footerData) {
    this.render(footerData);
  }

  render(footerData) {
    const sitemapLinks = footerData.sitemap
      .map(
        (item) => `
      <li><a href="${item.url}">${item.label}</a></li>
    `
      )
      .join("");

    const socialMediaLinks = footerData.socialmedia
      .map(
        (item) => `
      <li><a href="${item.url}" target="_blank">${item.platform}</a></li>
    `
      )
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <footer>
        <h2>Site Map</h2>
        <ul>${sitemapLinks}</ul>
        <h2>Follow Us</h2>
        <ul>${socialMediaLinks}</ul>
      </footer>
    `;
  }
}

customElements.define("footer-component", FooterComponent);
