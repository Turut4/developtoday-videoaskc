# Vehicle Models Finder

This project allows users to find vehicle models based on Make ID and Year.

## Overview

The **Vehicle Models Finder** is a web application that enables users to search for vehicle models by specifying a Make ID and Year. The application retrieves data from the National Highway Traffic Safety Administration (NHTSA) API and dynamically displays the results.

### Features

- **Fetch Vehicle Models:** Retrieve vehicle models based on Make ID and Year.
- **Styled with Tailwind CSS:** The application uses Tailwind CSS for a responsive and modern design.
- **Dynamic Routes with Next.js:** Utilizes Next.js dynamic routing to handle search queries and display results.

## Architecture

- **Frontend:** Built with Next.js, a React framework that provides server-side rendering and static site generation capabilities.
- **Styling:** Tailwind CSS is used for styling the application, offering a utility-first CSS framework.
- **API Integration:** Data is fetched from the NHTSA API to provide vehicle model information based on user input.

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root of your project and add the following line:
   ```bash
   NEXT_PUBLIC_API_URL=https://vpic.nhtsa.dot.gov/api/vehicles
   ```

## Building for Production

To build the application for production, use the following command:
```bash
npm run build
```
This will generate an optimized production build in the `.next` folder. To start the production server, use:
```bash
npm start
```

## Additional Notes

- Ensure you have Node.js installed on your system.
- The application relies on the NHTSA API, so an internet connection is required to fetch data.
