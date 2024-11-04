fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const headerComponent = document.querySelector("header-component");
    headerComponent.data = data.header;

    const footerComponent = document.querySelector("footer-component");
    footerComponent.data = data.footer;

    const homeComponent = document.querySelector("home-component");
    homeComponent.data = data.pages.home.sections;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
