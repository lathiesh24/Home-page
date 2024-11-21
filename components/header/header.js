class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  connectedCallback() {
    this.setupEventListeners();
  }

  disconnectedCallback() {
    const hamburger = this.querySelector(".hamburger");
    const closeButton = this.querySelector(".close-btn");
    if (hamburger) {
      hamburger.removeEventListener("click", this.toggleMenu);
    }
    if (closeButton) {
      closeButton.removeEventListener("click", this.closeMenu);
    }
  }

  setupEventListeners() {
    const hamburger = this.querySelector(".hamburger");
    const closeButton = this.querySelector(".close-btn");

    if (hamburger) {
      hamburger.addEventListener("click", this.toggleMenu);
    }
    if (closeButton) {
      closeButton.addEventListener("click", this.closeMenu);
    }
  }

  toggleMenu() {
    const sidebar = this.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("active");
    }
  }

  closeMenu() {
    const sidebar = this.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.remove("active");
    }
  }

  set data(value) {
    this.innerHTML = `
      <style>
        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 96%;
          height: auto;
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
          border-radius: 50%;
        }

        .header h1 {
          font-size: 1.5em;
          margin: 0;
          font-weight: bold;
          color: #fff;
        }

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

        nav.desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.5em;
        }

        nav.desktop-nav a {
          color: white;
          text-decoration: none;
          font-size: 1em;
          padding: 0.5em;
        }

        nav.desktop-nav a:hover {
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
          background-color: #d0701a;
        }

.sidebar {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
  color: white;
  padding: 2em;
  box-shadow: -3px 0 8px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 15;

}

.sidebar.active {
  transform: translateX(0);
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 2em;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: 500;
  padding: 0.5em 1em;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
}

.sidebar a:hover {
  background: #f0842f;
  color: white;
}

.sidebar .cta-button {
  display: block;
  margin: 2em 0 0;
  text-align: center;
  padding: 1em 1.5em;
  font-size: 1.1em;
  font-weight: bold;
  background: #f0842f;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  transition: background 0.3s ease-in-out;
}

.sidebar .cta-button:hover {
  background: #d0701a;
}

.close-btn {
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  border: none;
  font-size: 1.8em;
  font-weight: bold;
  color: #f0842f;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.close-btn:hover {
  color: white;
}


        @media (max-width: 768px) {
          nav.desktop-nav {
            display: none;
          }

          .hamburger {
            display: flex;
            margin-right: 30px;
          }

          .sidebar {
            display: block;
          }
        }
      </style>
      <div class="header">
        <img src="${value.brandLogo}" alt="${value.brandName} Logo" />
        <h1>${value.brandName}</h1>
        <div class="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav class="desktop-nav">
          ${value.navmenu
            .map(
              (menu) =>
                `<a href="${menu.url}" title="${menu.desc}">${menu.label}</a>`
            )
            .join("")}
          <a href="${value.cta.url}" title="${
      value.cta.desc
    }" class="cta-button">
            ${value.cta.label}
          </a>
        </nav>
      </div>
      <div class="sidebar">
        <button class="close-btn">&times;</button>
        <nav>
          ${value.navmenu
            .map(
              (menu) =>
                `<a href="${menu.url}" title="${menu.desc}">${menu.label}</a>`
            )
            .join("")}
        </nav>
        <a href="${value.cta.url}" title="${value.cta.desc}" class="cta-button">
          ${value.cta.label}
        </a>
      </div>
    `;
    this.setupEventListeners();
  }
}

customElements.define("header-component", HeaderComponent);
