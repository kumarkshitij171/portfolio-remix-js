# Kshitij Kumar's Portfolio

Welcome to my personal portfolio website! I’m **Kshitij Kumar**, a passionate Software Engineer and Web Developer with a keen interest in building scalable and efficient applications. This website showcases my technical skills, education, experience, and some of the projects I've worked on.

---

## Setup Guide

This guide provides a quick overview of the setup process for this Remix v3 project.

## Steps to Set Up

1. **Configure Routes:**
   - Rename `_signup.tsx` to `signup.tsx` in the `app/routes` directory for Remix to recognize the route.
   - Set up your admin after the environment variables and database are configured.

2. **Create `.env` File:**
   Create a `.env` file in the root directory and add the following variables:

   ```bash
   COOKIE_SECRET1=test1
   COOKIE_SECRET2=test2
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>" # use any database you want also change db provider to the schema.prisma file
   NODE_ENV=development
   JWT_SECRET=secret
   CLOUDINARY_CLOUD_NAME=cloud_name
   CLOUDINARY_API_KEY=api_key
   CLOUDINARY_API_SECRET=api_secret
   ```

3. **Install Prisma and Generate Client:**
   Install Prisma dependencies:

   ```bash
   npm install @prisma/client
   npm install prisma --save-dev
   ```

   Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

4. **Run Database Migration:**
   Set up your database schema and apply migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Revert Route Change:**
   After successfully creating the admin user, rename `signup.tsx` back to `_signup.tsx`.

   ```bash
   mv app/routes/signup.tsx app/routes/_signup.tsx
   ```
6. **Login Account**
    Go to `/login` route to login to the dashboard and do the modifications.