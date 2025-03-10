# Reboot-Lab-Tracker-backend

This project is the backend for automating the process of tracking and managing labs. It complements the Reboot-Lab-Tracker project by handling data processing, API interactions, and automation.

## Overview
This backend system is designed to work alongside the frontend components of the Reboot-Lab-Tracker project. It captures submission details, manages student progress, and interacts with the database and APIs, ensuring smooth tracking and automation for lab management.

## Prerequisites

Ensure the following dependencies are installed:
	•	Node.js (v14 or higher)
	•	NPM (for package management)
	•	MySQL (for the database)
 
## Installation
1. Install dependencies
```
npm install
```
2. Set up the .env file.
```
APP_ID= // Your app id
ORG= // the organization or username
SPREADSHEET_ID= //your spreadsheet id
INSTALLATION_ID= //the id of the app instalation
PRIVATE_KEY= // your generated private key
```
3. Start the server
```
node config.js
```

## License
This project is licensed under the GPL-2.0 License - see the LICENSE file for details.
