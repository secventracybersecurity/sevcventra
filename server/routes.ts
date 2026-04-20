import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'secventra@gmail.com',
    pass: process.env.EMAIL_PASS || '', // Provide App Password in .env
  }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send auto-responder email to user
      try {
        await transporter.sendMail({
          from: '"Secventra Team" <secventra@gmail.com>',
          to: validatedData.email,
          subject: "Security Assessment Request Received",
          text: `Hi ${validatedData.name},\n\nThank you for requesting a security assessment with Secventra. Our team will connect with you shortly.\n\nBest regards,\nSecventra Team`,
          html: `<p>Hi ${validatedData.name},</p><p>Thank you for requesting a security assessment with Secventra. Our team will connect with you shortly.</p><br><p>Best regards,<br>Secventra Team</p>`
        });
      } catch (emailError) {
        console.error("Failed to send email. Check EMAIL_USER and EMAIL_PASS.", emailError);
      }

      res.status(201).json({ success: true, id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  return httpServer;
}
