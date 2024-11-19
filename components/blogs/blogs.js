class BlogsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.loadBlogs();
  }

  async loadBlogs() {
    try {
      const response = await fetch("blogs.json");
      const data = await response.json();
      this.render(data.blogsPage);
    } catch (error) {
      console.error("Error loading blogs:", error);
      this.shadowRoot.innerHTML = `<p>Error loading blogs. Please try again later.</p>`;
    }
  }

  render({ description, blogs }) {
    const styles = `
        <style>
          :host {
            display: block;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
  *{
          padding-top: 60px;}
          .description {
            text-align: center;
            font-size: 1.2em;
            margin-bottom: 20px;
            color: #555;
          }
  
          .blogs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
            gap: 20px;
          }
  
          .blog-card {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin-left:10px;
            transition: transform 0.2s ease-in-out;
          }
  
          .blog-card:hover {
            transform: translateY(-10px);
          }
  
          .blog-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
  
          .blog-content {
            padding: 15px;
          }
  
          .blog-title {
            font-size: 1.5em;
            margin: 0 0 10px;
          }
  
          .blog-summary {
            margin: 0 0 15px;
          }
  
          .blog-meta {
            font-size: 0.9em;
            color: #888;
          }
  
          .read-more {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 15px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.2s;
          }
  
          .read-more:hover {
            background-color: #0056b3;
          }
        </style>
      `;

    const content = `
        <p class="description">${description}</p>
        <div class="blogs-grid">
          ${blogs
            .map(
              (blog) => `
              <div class="blog-card">
                <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                <div class="blog-content">
                  <h2 class="blog-title">${blog.title}</h2>
                  <p class="blog-meta">By ${blog.author} on ${new Date(
                blog.date
              ).toLocaleDateString()}</p>
                  <p class="blog-summary">${blog.summary}</p>
                  <a href="${blog.contentUrl}" class="read-more">Read More</a>
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

customElements.define("blogs-section", BlogsSection);
