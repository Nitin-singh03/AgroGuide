# AgroGuide

AgroGuide is a full-stack web application that connects the agricultural community—farmers, laborers, contractors, sellers, and administrators—using modern web technologies and multiple APIs. It provides real-time market insights, work listings, and communication tools to help users make informed decisions in agriculture.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [APIs and Integrations](#apis-and-integrations)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Overview

AgroGuide is built for four main types of users:

### Users (Buyers & Job Seekers):

- **Purchase agricultural products** (grains, machinery, chemicals, etc.).
- **Check real-time prices** of vegetables and fruits in nearby mandis.
- **View current weather conditions and forecasts.**
- **Find nearby contractors** for work opportunities.
- **Send work requests and track their status.**

### Contractors:

- **Manage a personalized dashboard.**
- **Post available work listings.**
- **Approve or reject incoming work requests.**
- **Communicate with potential work applicants** via an integrated messaging system.

### Sellers:

- **Add, edit, and delete product listings.**
- **Manage their inventory and showcase products.**

### Admin:

- **Oversee all listings and user activities.**
- **Approve or reject contractor/seller applications.**
- **Remove or block inappropriate users and listings.**
- **Handle disputes** using stored request data.

---

## Features

- **User Authentication:** Secure login and registration for users, contractors, sellers, and administrators.
- **Real-Time Data:** Integration with weather, market, and map APIs to provide live information.
- **Market Insights:** Access real-time government mandi prices for agricultural products.
- **Nearby Contractors:** Map integration to show contractors within a 10km radius.
- **Request & Messaging System:** Enables direct communication and work request tracking.
- **Modular Dashboard:** Tailored dashboards for contractors, sellers, and admin for easy management.
- **RESTful Architecture:** Organized structure using routes, controllers, and models for scalability.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** EJS (Embedded JavaScript)
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** MongoDB
- **APIs:**
  - Weather API for current conditions and forecasts.
  - Map API for locating nearby contractors.
  - Government API for real-time mandi prices.

---

## User Roles

### 1. User

**Purpose:** Buyers and job seekers.  
**Key Actions:**

- Search for and sort agricultural products.
- View real-time mandi prices.
- Check weather forecasts.
- Find and contact nearby contractors.
- Track work status.

### 2. Contractor

**Purpose:** Service providers.  
**Key Actions:**

- Add and manage work listings.
- Review, approve, or reject work requests.
- Use the messaging feature to communicate with users.

### 3. Seller

**Purpose:** Product vendors.  
**Key Actions:**

- Add, edit, and delete product listings.
- Manage inventory and product details.

### 4. Admin

**Purpose:** System oversight.  
**Key Actions:**

- Manage all user accounts and listings.
- Approve or reject contractor/seller applications.
- Remove or block users or listings as needed.
- Handle dispute resolutions.

---

## APIs and Integrations

- **Weather API:** Provides current weather conditions and forecasts.
- **Map API:** Displays nearby contractors within a 10km radius.
- **Government Mandi Price API:** Delivers up-to-date market prices for various agricultural products.

---

## Project Structure

The project follows a modular MVC architecture. Here’s an overview of the structure:

AgroGuide
├── controllers
│ ├── admin.js
│ ├── contract.js
│ ├── contractor.js
│ ├── product.js
│ ├── seller.js
│ └── user.js
├── model
│ ├── admin.js
│ ├── application.js
│ ├── contract.js
│ ├── contractor.js
│ ├── contractorReview.js
│ ├── product.js
│ ├── productReview.js
│ ├── seller.js
│ ├── user.js
│ └── workStatus.js
├── node_modules
├── public
│ └── ... (CSS, client-side JS, images, etc.)
├── routes
│ ├── admin.js
│ ├── contract.js
│ ├── contractor.js
│ ├── product.js
│ ├── seller.js
│ └── user.js
├── views
│ ├── adminPage
│ │ └── ... (EJS files for admin pages)
│ ├── contractorPage
│ │ └── ... (EJS files for contractor pages)
│ ├── layouts
│ ├── login-signup
│ ├── sellerPage
│ ├── analyzer.ejs
│ ├── applicationStatus.ejs
│ ├── chat.ejs
│ ├── CommodityPrice.ejs
│ ├── contract.ejs
│ ├── contractor_search.ejs
│ ├── contractsNearby.ejs
│ ├── edit.ejs
│ ├── index2.ejs
│ ├── messages.ejs
│ ├── profile.ejs
│ ├── requests.ejs
│ ├── searchResults.ejs
│ └── index.ejs
├── .env // Not included in the repository
├── authMiddleware.js
├── cloudConfig.js
└── index.js

**Key Files & Directories:**

- **controllers/**  
  Contains business logic for handling routes.

- **model/**  
  Contains MongoDB schemas and models.

- **routes/**  
  Houses Express routes corresponding to each controller.

- **views/**  
  Contains EJS templates organized by user roles and shared layouts.

- **authMiddleware.js:**  
  Custom middleware for user authentication and route protection.

- **cloudConfig.js:**  
  Configuration for any cloud services used in the project.

- **index.js:**  
  The main entry point that sets up Express, connects to MongoDB, and starts the server.

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/AgroGuide.git
   cd AgroGuide
   ```

Install Dependencies:

bash
Copy
Edit
npm install
Set Up Environment Variables:

Create a .env file in the root directory (this file is not included in the repository). Refer to the Environment Variables section below.

Run the Application:

bash
Copy
Edit
node index.js
The application will start on the defined port (default is 8080).

Environment Variables
This project uses a .env file to store sensitive information, including database credentials and API keys. For security reasons, the actual keys are not included in the repository. You must create your own .env file with your credentials.

Example .env file:

bash
Copy
Edit

# MongoDB connection string

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.r9vmv.mongodb.net/<your_db_name>?retryWrites=true&w=majority

# Application secret

SECRET="your_application_secret"

# Application port

PORT=8080

# Cloudinary configuration (or other cloud service)

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret

# API keys

PRICE_API_KEY=your_price_api_key
WEATHER_API_KEY=your_weather_api_key
Note: Replace the placeholders (e.g., <username>, <password>, <your_db_name>, etc.) with your actual credentials. Never commit your .env file to version control.

## Usage

User Interface:
Users can view product listings, check live weather data, and search for mandi prices and nearby contractors.
Contractors can manage work listings, review incoming requests, and communicate with users.
Sellers can manage their product listings.
Admins have full oversight to manage all users and listings.
Dashboard & Communication:
Each user role has a dedicated dashboard.
The integrated messaging system allows for real-time communication and dispute resolution.
Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the Repository.

Create a New Branch:

bash
Copy
Edit
git checkout -b feature/YourFeature
Commit Your Changes:

bash
Copy
Edit
git commit -m "Add some feature"
Push to Your Branch:

bash
Copy
Edit
git push origin feature/YourFeature
Open a Pull Request describing your changes.

Please adhere to the existing code style and project structure.

## Contact

For questions or further information, please contact:

Nitin Singh
Email: nitin0309singh@gmail.com
GitHub: Nitin-singh03
