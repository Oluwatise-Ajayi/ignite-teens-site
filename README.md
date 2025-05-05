# Ignite Teens Website Frontend

This project is the frontend for the Ignite Teens website, built using Vite, React, and Mantine UI.

## Tech Stack

*   **Framework:** React
*   **Build Tool:** Vite
*   **UI Library:** Mantine UI (`@mantine/core`, `@mantine/hooks`, `@mantine/form`)
*   **Icons:** Tabler Icons (`@tabler/icons-react`)
*   **Styling:** Mantine UI components, CSS Modules (`*.module.css`)
*   **Language:** JavaScript (JSX)

## Features

*   Responsive design.
*   Smooth scrolling between sections.
*   Component-based architecture.
*   Sections implemented:
    *   **Gallery:** Displays images with a cycling animation.
    *   **Counseling:** Information and contact button for counseling services.
    *   **Contact Form:** A form for users to join the community.
    *   **Contact/Footer:** Displays social links, contact information, an embedded map, and copyright.

## Configuration

Before running the application, you might need to configure the following:

1.  **Contact Information (`src/config/contact.js`):** This file exports objects containing social media links, contact details (phone, email, address, WhatsApp), the Google Maps embed URL, and a list of branches. Update the placeholder values with your actual information.
    ```javascript
    export const socialLinks = [
      { name: "Instagram", url: "...", icon: "Instagram" },
      // ... other links
    ];

    export const contactInfo = {
      whatsapp: "...", // Number without +
      email: "...",
      address: "...",
      phone: "...",
      mapEmbedUrl: "...", // Get from Google Maps > Share > Embed a map > src URL
    };

    export const branches = ["Branch 1", "Branch 2"];
    ```
2.  **Image Paths (`src/config/images.js`):** This file exports arrays of image paths used in the Gallery and potentially other sections. Ensure the paths correspond to images placed in the `public/images/` directory.
    ```javascript
    export const galleryImages = [
      "/images/gallery1.jpg",
      // ... other image paths
    ];
    ```
3.  **Public Images (`public/images/`):** Place all static image assets (like those referenced in `images.js`) inside the `public/images/` folder in the project root.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd ignite-teens-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure:** Update `src/config/contact.js`, `src/config/images.js`, and add images to `public/images/` as described in the **Configuration** section.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or the next available port).

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the project files (if ESLint is configured).
*   `npm run preview`: Serves the production build locally.
