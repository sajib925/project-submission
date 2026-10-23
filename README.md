# 🚀 Project Submission & Review API (SubmitHub)

A robust backend API for a Project Submission and Review Dashboard. It allows students to submit their projects and mentors/admins to review, approve, or reject them. Built with modern web technologies focusing on security, role-based access control, and performance.

## ✨ Features

- **Role-Based Access Control (RBAC):** Distinct roles for `STUDENT`, `MENTOR`, and `ADMIN`.
- **Authentication & Security:** JWT-based authentication, password hashing with bcrypt, and Helmet for HTTP header security.
- **Robust Validation:** Strict payload validation using Zod.
- **Spam Prevention:** Rate limiting implemented for project submissions (max 5 submissions/hour per IP).
- **Duplicate Prevention:** Prevents students from submitting the same GitHub repository twice.
- **Mentor Dashboard API:** Server-side pagination, status-based filtering (Pending, Approved, Rejected), and aggregated dashboard statistics.
- **Database ORM:** PostgreSQL managed via Prisma ORM for type-safe database queries.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Auth:** JSON Web Tokens (JWT) & bcrypt
- **Package Manager:** pnpm

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or via cloud like Neon)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

## 🚀 Installation & Setup

**1. Clone the repository**
```bash
git clone <your-repository-url>
cd submit-hub-backend