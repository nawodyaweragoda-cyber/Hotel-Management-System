# hotel_booking_system
# Hotel Booking System API 🏨

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing hotel rooms, room details, and customer bookings.

---

## 🚀 Features

* **All Rooms Interface:** Fetch and display all hotel rooms with availability status.
* **Room Details Interface:** View detailed specifications of a selected room.
* **Booking Interface:** Create and manage room reservations.
* **Sample Data Included:** Pre-configured JSON dataset for rapid local testing.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Local / Cloud Atlas)
* **ORM:** Mongoose
* **Tools:** Nodemon, Dotenv, CORS

---

## ⚙️ Installation & Setup (For Evaluation)

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
bash
git clone [https://github.com/sathsaranikawindy/hotel_system.git](https://github.com/sathsaranikawindy/hotel_system.git)
cd hotel_system
2. Install Dependencies
Bash
npm install
##3. Environment Setup
Create a .env file in the root directory and add the following configuration:

Code snippet
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hotel_db
API_KEY=hotel_secret_key_123
##4. Database Setup & Data Population
Ensure your local MongoDB Server is running on 127.0.0.1:27017.

Open MongoDB Compass.

Create a database named hotel_db and a collection named rooms.

Import the included rooms.json file into the rooms collection to populate initial sample room data.

##5. Run the Server
Bash
npx nodemon server.js
🔗 Application Endpoints & Interfaces
Once the server is running on http://localhost:5000, open the following interfaces in your browser:

🔗 All Rooms: http://localhost:5000/rooms.html

🔗 Room Details: http://localhost:5000/room-details.html

🔗 Create Booking: http://localhost:5000/create-booking.html

##📁 Repository Structure
Plaintext
hotel-api/
├── public/              # Static HTML/CSS/JS interfaces
├── .env.example         # Template for environment variables
├── rooms.json           # Initial sample dataset for MongoDB
├── server.js            # Express server & API routes setup
├── package.json         # Project dependencies & scripts
└── README.md            # Documentation
