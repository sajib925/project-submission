import http, { Server } from "http"
import dotenv from "dotenv"
import { Server as SocketServer } from "socket.io" // 👈 স্ট্যাটিক ইমপোর্ট
import { db } from "./config/db.js"
import app from "./app.js"
import { registerSocketHandlers } from "./socket.js"

dotenv.config()

const PORT = process.env.PORT || 5000 // 📌 ফ্রন্টএন্ড থেকে ৫০০০ এ কল করা হলে এখানে ৫০০০ বা process.env.PORT মিল রাখুন
let server: Server | null = null

async function startServer() {
  try {
    await db.$connect()
    console.log("Database connection successful")

    // 1. HTTP Server তৈরি
    server = http.createServer(app)

    // 2. Socket.io সরাসরি ইনিশিয়ালাইজেশন (কোনো ডাইনামিক ইমপোর্ট ছাড়াই)
    const io = new SocketServer(server, {
      cors: {
        origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
        credentials: true,
      },
    })

    // 3. সকেট ইভেন্ট রেজিস্টার করা
    registerSocketHandlers(io)

    // 4. Server Listen
    server.listen(PORT, () => {
      console.log(`🚀 BugzFlow Server is running on http://localhost:${PORT}`)
    })

    handleProcessEvents()
  } catch (error) {
    console.error("Error during server startup:", error)
    process.exit(1)
  }
}

function handleProcessEvents() {
  const shutdown = (signal: string) => {
    console.warn(`Received ${signal}, shutting down...`)
    if (server) {
      server.close(async () => {
        await db.$disconnect()
        console.log("Database disconnected and server closed")
        process.exit(0)
      })
    } else {
      process.exit(0)
    }
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"))
  process.on("SIGINT", () => shutdown("SIGINT"))
}

startServer()