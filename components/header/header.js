class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    const navMenu = this.querySelector(".nav-menu");
    navMenu.classList.toggle("active");
  }

  set data(value) {
    this.innerHTML = `
      <style>
        .header {
          position: absolute; 
          top: 0;
          left: 0;
          width: 93%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1em 2em;
          color: white;
          z-index: 10; 
          flex-wrap: wrap; 
        }

        .header img {
          height: 50px;
          width: 50px;
          border-radius: 50px;
        }

        .header h1 {
          font-size: 1.2em;
          margin: 0;
          font-weight: bold;
        }

        nav ul {
          list-style: none;
          display: flex;
          gap: 1.5em;
          margin: 0;
          padding: 0;
          align-items: center;
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

        .cta-button {
          background-color: #f0842f;
          color: white;
          padding: 0.5em 1em;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }

        .cta-button:hover {
          background-color: #0056b3;
        }

        /* Hamburger icon */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 20px;
          cursor: pointer;
        }

        .hamburger div {
          width: 30px;
          height: 3px;
          background-color: white;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1em;
          }

          nav ul {
            flex-direction: column;
            gap: 0.5em;
            width: 100%;
            text-align: left;
            padding-top: 1em;
            display: none; /* Hide menu by default */
          }

          .nav-menu.active {
            display: block; /* Show menu when active */
          }

          .cta-button {
            width: 20%;
            text-align: center;
            margin-top: 1em;
          }

          .header img {
            margin-bottom: 1em;
          }

          /* Show hamburger icon */
          .hamburger {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .header img {
            height: 30px;
                        width: 20%;

            width: 80px;
          }

          .header h1 {
            font-size: 1.0em;
          }

          .cta-button {
            font-size: 0.9em;
            padding: 0.4em 0.8em;

          }
        }
      </style>
      <div class="header">

        <img src="${value.brandLogo}" alt="${value.brandName} Logo" />
        <h1>${value.brandName}</h1>
        <nav>
          <ul class="nav-menu">
            ${value.navmenu
              .map((menu) => {
                return `<li><a href="${menu.url}" title="${menu.desc}">${menu.label}</a></li>`;
              })
              .join("")}
          </ul>
        </nav>
        <a href="${value.cta.url}" title="${
      value.cta.desc
    }" class="cta-button">${value.cta.label}</a>

        <!-- Hamburger Icon -->
        <div class="hamburger" onclick="${this.toggleMenu}">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
