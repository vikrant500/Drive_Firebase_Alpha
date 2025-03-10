# About The Project
This project was developed to demonstrate the integration of Google Firebase with MongoDB Compass. It serves as a practical implementation of backend fundamentals using Firebase, while also providing an opportunity to review and reinforce core backend development concepts.

## Prerequisites

Before running this application, you need to have:

1. Node.js installed on your system
2. MongoDB server running locally
3. A Firebase project set up

## Requirements

### Environment Variables
Create a `.env` file in the root directory with the following variables:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret

### Firebase Configuration
1. Download your Firebase Admin SDK private key file from the Firebase Console
2. Place it in the project root directory
3. ⚠️ **IMPORTANT**: Do not commit the Firebase private key file to GitHub. Make sure it's included in your `.gitignore` file.

## Installation

1. Clone the repository
```bash
git clone https://github.com/vikrant500/Drive_Firebase_Alpha.git
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm start
```

## Security Precautions

- Never commit sensitive credentials to version control
- Always add your `.env` file to `.gitignore`
- Ensure your Firebase Admin SDK private key file is listed in `.gitignore`