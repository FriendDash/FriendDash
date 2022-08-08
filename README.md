# [FriendDash](https://frienddash.vercel.app) - Order Management & Delivery Platform

## 1. Project Description
#### FriendDash is a web app that enables users to save time, money, and get their food faster! We work to connect students with their communities across UBC. FriendDash offers a group order management and delivery platform which facilitates order sharing and group buys with minimal overhead.

Try it out at https://frienddash.vercel.app/

![image](https://user-images.githubusercontent.com/50121934/183317399-7b9b0e83-c727-4755-83d6-5f768c57f46b.png)

### Repos
- Front-end: https://github.com/EZWin-Clap/FriendDash
- Back-end: https://github.com/EZWin-Clap/FriendDash-DB

### Tech Stack
[React](https://reactjs.org/) | [ChakraUI](https://chakra-ui.com/) | [Node](https://nodejs.org/) | [Express](https://expressjs.com/) | [MongoDB](https://www.mongodb.com/) | [Stripe](https://stripe.com/docs/api) 

### Contents

-   [1. Project Description](#1-project-description)
-   [2. Requirements and Goals](#2-requirements-and-goals)
-   [3. Integration of Tech](#3-integration-of-tech)
-   [4. Above and Beyond](#4-above-and-beyond)
-   [5. Next Steps](#5-next-steps)
-   [6. Contributions](#6-contributions)

<br/>

---
## 2. Requirements and Goals

### Minimal Requirements

- ✅Account creation and authentication
- ✅Profiles
- ✅Group Creation
- ✅Selecting restaurant location
- ✅Selecting group pick-up location for food for group by the group leader
- ✅Notification system for when group order is ready for pickup
- ✅Food options / menu options for user joining order
- ✅Directory of current ongoing orders (for any user interested in joining an order)

### Standard Goals
- ✅Order and group history
- ✅Group leader admin panel and settings
- ✅Searchbar and sorting functionality
- ✅Confirmations on certain buttons

### Stretch Goals

- ✅Group advanced profiles (saved groups)
- ✅Reputation system
- ✅Payment system
- ✅Dark mode
- ⚠️Group leader can accept or deny members from joining
- ❌Public API
- ❌GPS tracking your order
- ❌Group chats
- ❌Push/SMS notifications

<br/>

---
## 3. Integration of Tech

### Unit 1 - HTML, CSS, JS
- Used Chakra-UI as a frontend React component Library
- Additionally customized styling using inline CSS (Chakra props)
- Built a Responsive UI that's friendly for all screen sizes (including mobile)

### Unit 2 - React & Redux
- Used React to Create the App and setup structure following best React practices:
  - Components, and pages folder.
  - Utility folder that contains commonly used functions
  - React Prevents DOM injection attacks, and virtual DOM structure reduces page load times by eliminating unnecessary updates
 - Build composable reusable React components
  - Used Chakra factory function to convert all components to chakra components which allow passing chakra props for us in inline styling
  - Minimized code repetition
- Used Redux to track state
  - Eliminates the need to pass state as props
- Used Local Storage to store user-specific data
  - Stores light/dark mode flags
  - Stores user session information 

### Unit 3 - Node & Express
- Set up Express server using NodeJS
- Setup APIs using Express for:
  - Getting, Adding, Updating, Removing user data
  - Getting, Adding, Updating, Removing order data
  - Getting, Adding, Updating, Removing payments information 
- How the server helps:
  - Facilitate communication between the front end and the database to store, change, and retrieve information from MongoDB 
  - Keeps implementation and data hidden from clients, therefore being more secure than not using a server

### Unit 4 - NoSQL with MongoDB
- Set up collections in MongoDB for storing Order and User information so that data is persisted
  - MongoDB’s NoSQL eliminates the need for relations between tables.
  - Lower latency for reading/writing to large databases.
  - Data stored as JSON.
  - Horizontal scaling rather than vertical scaling.
- Built a scalable schema design in MongoDB enabling the storage and lookup of:
  - Real-time orders
  - User data

### Unit 5 - Release Engineering
- Deployed frontend on Vercel
  - Better performance and faster compared to Heroku
  - No need to awaken Dyno (from Heroku) resulting in crashed applications, slower bootup, and slower user experience.
- Deployed backend on Heroku, making it accessible to anyone with a browser and an internet connection. 

<br/>

---

## 4. Above and Beyond
- Payments
  - Integrated Stripe API to allow users to make and receive payments since order leaders will be paying for the whole group’s orders and having them paid back by the members
  - Some buttons redirect to an external, one-time-use URL from Stripe to ensure security when entering sensitive information, and back to the app when the user is done
  - Our API calls the Stripe API to add, retrieve, edit, and delete a user’s saved information
  - Intuitive payment workflow, allowing users to save their cards and activate their Stripe accounts from the Payment page, and simply select a saved card at checkout
- Google OAuth
  - Implemented seamless Google OAuth to verify and authenticate users making use of Google’s OAuth API to be able to persist user data.
- Reverse Geocoding
  - Implemented seamless Google Reverse Geocoding taking the user’s longitude and latitude coordinates and converting them to a readable address for a user’s order pickup location.
- Order Management System
  - Robust, feature-packed order and admin management system enabling users to manage all their orders, remove users, set order statuses, and manage order details in a single management page.
  - Custom endpoints to separate orders where the user is the creator and orders where the user is a member.
- Dynamic Routing, Unique Orders, and Profile Pages
  - Profile pages have unique dynamic routes to enable profile sharing.
  - Orders also have unique routes for order sharing.
- Complex UI Elements
  - Implemented light/dark mode toggle using localStorage to maintain local client state.
  - Search, Sort, and Filtering

### Third-party Services
#### Stripe API: 
- Seamless processing for credit card payments (VISA, MasterCard. Amex)
- Reduces security concerns by using Stripe to store payment information, thus eliminating the need to store sensitive information locally
- Payment recipients can let their money accumulate in their Stripe account and have it deposited directly into their bank account at a frequency of their choosing

#### Google APIs
- Simple Google OAuth for seamless login and account registration experience. 
- Easy access to Google account information.
- Location APIs using Google’s powerful reverse geolocation API.
	
#### Chakra-UI
- Simple, modular, and accessible component library with building block components to simplify and speed up the development process.

#### User Acceptance Testing
- Performed User Acceptance Testing with 50+ potential users where we obtained feedback and made observations on the user’s workflow and user experience.
- Addressed UI/UX concerns involving accessibility, dark mode, responsiveness, mobile, etc.

<br/>

---

## 5. Next Steps
- Integrate a menu API that will automatically parse different restaurant menus and upload/onboard them to FriendDash
- Develop a notification system that will email/SMS users about their order updates
- Machine learning algorithms recommend restaurants to users in their dashboard based on their order history
- Integrate location tracking for the order leaders' current location
- Security features
  - Protected/Authenticated Endpoints
  - Encryption of LocalStorage Data
- Customer support section in the application to handle complaints/issues with orders etc.
- Promotions system that can be used to apply/advertise different deals/savings//promos to users
- Social features
  - Group chats

<br/>

---

## 6. Contributions

### [Benjamin Cheung](https://linkedin.com/in/mrbenc88)
- Developed a responsive front-end for Profile, Login, Help, and Account including interactive components for user accessibility and better user experience such as light/dark mode, toasts, Google OAuth, Google reverse geolocation,  and subtle styling. 
- Took leadership in setting up scalable MongoDB schema and directing data flow along with associated backend endpoints.
- Coordinated and scheduled meetings, weekly scrums, sprint retros, and sprint planning.

### [Steven Zhao](https://www.linkedin.com/in/thestevenzhao/)
- Led the overall UI/UX development. Designed the overall App flow and build major UI elements for all pages
- Build the dashboard, manage orders, and view group order pages, and the associated components.
- Create backend routes and integrated API to the frontend for managing group orders, removing users from orders, and deleting orders. 

### [Brenden Yee](https://www.linkedin.com/in/brendeny/)
- Led the development of the restaurant menu/ordering system, and a fully integrated rating system utilizing React, Redux, Node.JS, Express, and MongoDB.
- Setup/developed backend routes for handling logic for adding different individual orders to a greater group order as well as routes for sending ratings to group leaders once an order is closed
- Implemented mathematical logic for calculating and summarizing individual orders upon checkout from the ordering page
- Implemented menu parsing for different onboarded JSON menu files for rendering within a React frontend utilizing a Chakra-UI framework
- Collaborated on developing dynamic routing and parameter passing for restaurant menu pages and group leader rating pages

### [Maggie Wang](https://www.linkedin.com/in/maggie-wang-5549711a5/)
- Payments

