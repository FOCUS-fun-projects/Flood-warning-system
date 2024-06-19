# Flood Monitoring System

The Flood Monitoring System is designed to provide real-time monitoring and alerts for the Mathara district. It gathers data from various environmental sensors to monitor humidity, rainfall, water levels in lakes, and temperature. This system uses these inputs to predict potential flood conditions for the next two days and sends email warnings to registered users.

## Features

- **Real-time Data Collection:** Continuously monitors environmental conditions.
- **Flood Prediction:** Analyzes data to predict potential flooding.
- **Alert System:** Sends email notifications to users who might be affected by flooding.
- **User Interface:** Web-based dashboard for users to view current and historical data.
- **Data Logging:** Stores sensor data in a database for analysis and reporting.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP, SQL
- **Sensors and Microcontroller:** Arduino
- **Database:** MySQL
- **Email Service:** PHP Mailer for sending emails
  
## System Architecture

- **Sensors:** Arduino reads real-time data from humidity, rainfall, water level, and temperature sensors.
- **Data Transmission:** Data from Arduino is sent to a web server.
- **Backend Processing:** PHP scripts process the incoming data and store it in a MySQL database.
- **Flood Prediction Algorithm:** PHP scripts analyze the data and determine flood risks.
- **Notification System:** Emails are sent to users if a flood risk is detected.
- **User Interface:** A web dashboard allows users to view current conditions and receive notifications.

## Installation

### Prerequisites
- Arduino and compatible sensors (humidity, rainfall, water level, temperature)
- Web server with PHP and MySQL support (e.g., Apache, xampp)
- Internet connection for email notifications

## Usage
- **Monitoring Dashboard:** The homepage displays real-time data from the sensors.
- **User Management:** Admins can add, remove, and manage users who will receive alerts.
- **Alerts:** The system automatically sends email alerts when a potential flood is detected.

### Screen shots

*CLient side*
![Screenshot 2024-06-19 185108](https://github.com/FOCUS-fun-projects/Foold-warning-system/assets/146844863/f1b1edfc-f1b4-4d27-a6fc-c6faf8ddb74a)
![Screenshot 2024-06-19 185535](https://github.com/FOCUS-fun-projects/Foold-warning-system/assets/146844863/4ed5d858-9615-4726-a9e0-9f0f1fb7794a)


*Admin side*
![Screenshot 2024-06-19 185517](https://github.com/FOCUS-fun-projects/Foold-warning-system/assets/146844863/4578f151-0f82-4b9b-a6d6-706c5148c1e8)
![Screenshot 2024-06-19 185428](https://github.com/FOCUS-fun-projects/Foold-warning-system/assets/146844863/1ed5bacf-f46e-4c5f-9edb-5464ec321e41)
![Screenshot 2024-06-19 185409](https://github.com/FOCUS-fun-projects/Foold-warning-system/assets/146844863/1e35ffce-cf58-4e3f-aa07-af4b1371bedf)



