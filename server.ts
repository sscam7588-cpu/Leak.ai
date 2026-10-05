import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Route: Ask LEAK (Personal Intelligence Assistant)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    const systemPrompt = `You are LEAK, an ultra-premium, modern personal life-management AI operating system.
Your philosophy: "Find what you're losing. Fix it."
You monitor and detect leaks across:
- 💰 Money (forgotten subscriptions, duplicate payments, price hikes, missing refunds, unusual charges)
- ⏰ Time (repetitive manual tasks, long email threads, unneeded meetings)
- 📅 Deadlines (bills, renewals, check-ins, documents)
- 📧 Communication (unanswered important messages, neglected follow-ups)
- ✈️ Travel (flight check-ins, passport expiry, hotel cancellation windows)

Tone & Style:
- Apple-grade elegance, executive clarity, concise, empathetic, high agency.
- Never write huge walls of text or conversational fluff.
- Be direct, specific, and actionable.
- Always cite the user's specific dollar amounts, hours, or names when relevant.
- Emphasize safety: consequential actions require user confirmation.

User's current system state:
${JSON.stringify(context || {}, null, 2)}
`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser query: ${message}` }] },
        ],
      });

      const reply = response.text || "I've reviewed your active leaks. Let's resolve the highest impact items first.";
      return res.json({ reply });
    } else {
      // High-quality contextual fallback if API key is not present in local test
      const q = (message || '').toLowerCase();
      let reply = '';
      if (q.includes('money') || q.includes('waste') || q.includes('recover')) {
        reply = `You currently have **$184.49** in potentially recoverable money across 4 leaks:\n\n1. **Adobe Creative Cloud** ($59.99/mo) — Renews tomorrow, unused for 28 days.\n2. **Missing Amazon Refund** ($43.00) — Return delivered 11 days ago, refund overdue.\n3. **Doordash Duplicate Charge** ($32.00) — Double billed on Oct 03.\n4. **Netflix Price Increase** ($30.00/yr) — Plan jumped from $15.49 to $17.99.\n\nWould you like me to draft the refund claim or cancel Adobe now?`;
      } else if (q.includes('subscription')) {
        reply = `You have **8 active subscriptions** totaling **$247.43/month** ($2,969.16/yr).\n\nI flagged **3 subscriptions you might not need** (totaling $184.98/mo):\n• **Adobe Creative Cloud** ($59.99/mo) — 28 days since last opening\n• **Gym Pass** ($85.00/mo) — 21 days since check-in\n• **Wall Street Journal** ($39.99/mo) — 42 days since last article read\n\nI can queue cancellations for any of these with one click.`;
      } else if (q.includes('time') || q.includes('hour')) {
        reply = `You are losing approximately **7h 24m per week** to routine friction:\n\n• **14 repetitive emails** (~3h 10m)\n• **3 unnecessary status meetings** (~2h 30m)\n• **Manual expense spreadsheet sync** (~1h 44m)\n\nI can set up auto-replies for the 3 most frequent queries and draft meeting-decline templates.`;
      } else if (q.includes('deadline') || q.includes('do this week') || q.includes('flight')) {
        reply = `Here are your 3 critical deadlines before Friday:\n\n1. **United Airlines Flight UA 442 Check-in** — Opens in 6 hours (8:00 AM tomorrow).\n2. **Quarterly Estimated Tax Filing** — Due in 4 days (Oct 09).\n3. **Passport Expiration** — 5 months left (many countries require 6 months validity for entry).`;
      } else if (q.includes('email') || q.includes('message')) {
        reply = `You have **1 high-priority email waiting for 4 days** from *Sarah Lin (Partner at Apex Ventures)* regarding term sheet feedback. Would you like me to draft a concise response based on your last calendar notes?`;
      } else {
        reply = `I am continuously scanning your 6 connected accounts (Gmail, Calendar, Chase, PayPal, United, Slack). Currently tracking **$184 recoverable** and **7h 24m time saved**. What specific leak would you like me to tackle right now?`;
      }
      return res.json({ reply });
    }
  } catch (err: any) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Failed to process AI request', details: err.message });
  }
});

// API Route: AI Action Generator (Generates dispute letters, cancellation emails, draft replies)
app.post('/api/generate-action', async (req, res) => {
  try {
    const { actionType, leakTitle, cost, details } = req.body;

    const prompt = `As the LEAK AI personal life operating system, generate a concise, professional, ready-to-send action text for:
Action: ${actionType}
Title: ${leakTitle}
Cost/Impact: ${cost || 'N/A'}
Details: ${details || ''}

Return a clean, ready-to-use message/draft that gets the user their money back or resolves the problem immediately. No unnecessary conversational filler.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });
      return res.json({ result: response.text });
    } else {
      let draft = '';
      if (actionType === 'track_refund') {
        draft = `Subject: Inquiry Regarding Pending Refund - Order #882941\n\nDear Customer Support,\n\nI am following up on return #882941 delivered to your warehouse facility on Sept 24. The tracking confirmed delivery 11 days ago, however the credit of $43.00 has not yet appeared on my statement.\n\nPlease process this refund promptly to the original payment method.\n\nThank you,\nArno`;
      } else if (actionType === 'cancel_subscription') {
        draft = `Subject: Immediate Cancellation Request - Account #AC-99214\n\nHello Support Team,\n\nPlease immediately cancel my subscription for ${leakTitle} effective prior to the next billing cycle tomorrow. Ensure no further recurring charges are billed to my card on file, and send written confirmation.\n\nBest regards,\nArno`;
      } else if (actionType === 'draft_reply') {
        draft = `Hi Sarah,\n\nThanks for following up on the term sheet details. I've reviewed the updated clauses—everything aligns with our discussion. Let's schedule 15 minutes Thursday afternoon to finalize the sign-off.\n\nBest,\nArno`;
      } else {
        draft = `LEAK Action Item: ${leakTitle}\nStatus: Scheduled for priority resolution. Auto-reminder set for 2 hours prior to deadline.`;
      }
      return res.json({ result: draft });
    }
  } catch (err: any) {
    console.error('Action generation error:', err);
    return res.status(500).json({ error: 'Failed to generate action' });
  }
});

async function startServer() {
  // Mount Vite middlewares in development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LEAK OS running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
