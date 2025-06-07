# 💼 Job Portal Web Application

A full-stack Job Portal web application that connects job seekers with recruiters. The platform allows recruiters to post jobs and manage applications, while applicants can browse jobs, apply, and track their application status.

---

## 🚀 Project Overview

This job portal was built on real-world job hiring workflow. It provides features for:

- Recruiters to manage job postings and applicant statuses.
- Job seekers to explore, apply for jobs.

The goal was to create a scalable, user-friendly system with authentication, role-based dashboards, and end-to-end CRUD operations.

---

## 🛠️ Tech Stack

| Technology        | Description                                     |
|-------------------|-------------------------------------------------|
| **Frontend**      | React.js, Redux Toolkit, Tailwind CSS,shadcn ui |
| **Backend**       | Node.js, Express.js                             |
| **Database**      | MongoDB, Mongoose ODM                           |
| **Authentication**| JWT-based Auth, bcrypt for password hashing     |
| **Cloud Services**| Cloudinary and multer                           |
| **Dev Tools**     | Postman, Git, VS Code                           |
| **Deployment**    | Render and vercel                               |

---

## 🧩 Key Features

### 👤 Job Seeker Dashboard:
- View all available job listings.
- Apply to jobs with a resume.
- application status change.
- Edit personal profile and upload resume/profile picture.

### 🧑‍💼 Recruiter Dashboard:
- Post new jobs (CRUD).
- View applicants per job posting.
- Update application status (Pending → Reviewed → Shortlisted → Hired).
- Manage profile and organization details.

### 🔐 Authentication:
- JWT-based login and signup system.
- Separate user roles: **Job Seeker** and **Recruiter**.
- Route protection and role-based access.

---

## 🔄 How It Works

1. **User Authentication:**
   - User signs up as recruiter or job seeker.
   - Passwords are securely hashed using bcrypt.
   - Upon login, a JWT token is issued and stored in local storage.

2. **Dashboard Access:**
   - Role-based access: recruiters access their dashboard to post/manage jobs, applicants access theirs to apply.

3. **Job Application Flow:**
   - Job seekers apply to open positions.
   - Recruiters see applications and update their statuses.
   - Applicants can view updated statuses in their profile.

4. **Cloud Upload :**
   - Resume or profile photo uploaded during signup or update.

---

## 🎯 Challenges Faced and Solved

| Challenge | Solution |
|----------|----------|
| Designing role-based dashboards | Used `React Router` + Redux state to differentiate views |
| Secure file uploads to cloud | Integrated cloudinary |
| Protecting sensitive routes | Implemented `express-jwt` middleware with role checks |
| Managing nested data (e.g. applicants per job) | Used MongoDB schema references and Mongoose `populate()` |
| status update | Handled via backend status field and optimistic frontend update |

---

## 📸 Screenshots

<!-- You can insert screenshots here if available -->
* Recruiter Dashboard  
* Applicant Job View  
* Application Status 

---

## 📦 Installation & Running Locally

```bash
git clone https://github.com/your-username/job-portal-app.git
cd job-portal-app

# Install dependencies
npm install

# Start backend
cd backend
npm install
npm start

# Start frontend
cd ../frontend
npm install
npm run dev
