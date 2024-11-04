class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  set data(value) {
    this.innerHTML = this.render(value);
  }

  render(data) {
    return `
      <style>
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1em 2em;
          background-color: #333;
          color: white;
        }

        .header img {
          height: 50px;
        }

        .header h1 {
          font-size: 1.5em;
          margin: 0;
          font-weight: bold;
        }

        nav ul {
          list-style: none;
          display: flex;
          gap: 1.5em;
          margin: 0;
          padding: 0;
        }

        nav ul > li {
          position: relative;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-size: 1em;
          padding: 0.5em;
        }

        nav a:hover {
          color: #ddd;
        }

        /* Dropdown styles */
        .dropdown {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #444;
          padding: 0.5em 0;
          border-radius: 5px;
          min-width: 150px;
          z-index: 1000;
        }

        .dropdown li {
          display: block;
        }

        .dropdown a {
          display: block;
          padding: 0.5em 1em;
          color: white;
        }

        .dropdown a:hover {
          background-color: #555;
        }

        nav ul > li:hover .dropdown {
          display: block;
        }

        .cta-button {
          background-color: #007bff;
          color: white;
          padding: 0.5em 1em;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }

        .cta-button:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="header">
        <img src="${data.brandLogo}" alt="${data.brandName} Logo" />
        <h1>${data.brandName}</h1>
        <nav>
          <ul>
            ${data.navmenu
              .map(
                (menu) => `
              <li>
                <a href="${menu.url}" title="${menu.desc}">${menu.label}</a>
                ${
                  menu.children
                    ? `
                  <ul class="dropdown">
                    ${menu.children
                      .map(
                        (child) => `
                      <li><a href="${child.url}" title="${child.desc}">${child.label}</a></li>
                    `
                      )
                      .join("")}
                  </ul>
                `
                    : ""
                }
              </li>
            `
              )
              .join("")}
          </ul>
        </nav>
        <a href="${data.cta.url}" title="${data.cta.desc}" class="cta-button">${
      data.cta.label
    }</a>
      </div>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
