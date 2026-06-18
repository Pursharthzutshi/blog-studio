# AI Blog Website

Welcome to the AI Blog Website project! This is a modern, full-stack blog application built with Next.js that leverages Artificial Intelligence to enhance the blogging experience.

## What's Inside?

- **AI-Powered Features:** Integrates with OpenAI and Google Generative AI (Gemini) using Langchain to help you generate and manage blog content.
- **Secure Authentication:** Uses JSON Web Tokens (JWT) for secure user login.
- **Database Storage:** Uses MongoDB (via Mongoose) to safely store your blog posts and user data.
- **Beautiful Design:** Styled with Tailwind CSS for a modern, responsive, and fast user interface.

## How to Use This Project

Follow these simple steps to get the website running on your own computer:

### 1. Install Required Tools
First, make sure you are in the project folder in your terminal. Then, install all the necessary code packages by running:
```bash
npm install
```

### 2. Add Your Secret Keys
The app needs to connect to databases and AI services, which requires secret keys. 
Open the `.env` file in the project folder and make sure you fill in your specific credentials, such as:
- MongoDB Connection String (for your database)
- OpenAI / Google Gemini API Keys (for AI features)
- JWT Secret Key (for passwords/login)

### 3. Start the Website
Once everything is installed and your secrets are added, you can start up the website by running:
```bash
npm run dev
```

### 4. See It in Action!
Open your favorite web browser and go to:
[http://localhost:3000](http://localhost:3000)

You should now see the blog website up and running! You can start editing the code in the `app` folder, and the page will automatically update.
