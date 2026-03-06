# KGISL Hackathon
## AI Meeting Intelligence & Productivity Platform

## Overview
AI Meeting Intelligence & Productivity Platform is a modern web application designed to transform normal meetings into structured and actionable insights using Artificial Intelligence.

The system automatically records meeting conversations, generates summaries, extracts action items, tracks tasks, and provides analytics to improve productivity.

This project was developed for the KGISL Hackathon and demonstrates the use of modern web technologies, AI models, and automation workflows to improve meeting efficiency.

---

## Problem Statement

In most meetings:

- Important discussions are forgotten
- Tasks are not clearly assigned
- Meeting notes are not documented
- Productivity of meetings cannot be measured

This platform solves these problems by converting meeting conversations into structured knowledge using AI.

---

## Key Features

### 1. User Authentication
Users can create accounts and securely log into the platform.

Features:
- Register new account
- Login with credentials
- Secure session management

---

### 2. Meeting Management

Users can:

- Create meetings
- Join meetings using meeting ID
- Invite participants
- Track meeting history

Each meeting includes:

- Title
- Description
- Scheduled time
- Participants
- Recording permission

---

### 3. Host Controlled Recording

The meeting host has full control over recording permissions.

Two layers of control exist.

#### Layer 1: Host Control
Host can enable or disable recording.

If disabled:
- Participants cannot start recording
- Backend blocks recording requests
- Active recording stops immediately

#### Layer 2: User Mode
Participants can choose:

- Manual recording
- Automatic recording

Automatic recording only works if the host allows recording.

---

## AI Processing Pipeline

After a meeting ends, the system processes the recording using AI.

Steps:

1. Audio Transcription  
Meeting audio is converted into text using speech recognition.

2. Meeting Summarization  
AI generates a structured meeting summary.

3. Task Extraction  
Natural Language Processing identifies:

- Tasks
- Responsible person
- Deadlines

4. Sentiment Analysis  
Meeting tone and engagement are analyzed.

5. Productivity Scoring  
A productivity score is generated based on engagement, clarity, and action items.

All results are stored in the database.

---

## Dashboard Features

The dashboard provides an overview of meeting activity.

Users can view:

- Meetings hosted
- Meetings attended
- Pending tasks
- Overdue tasks
- Productivity statistics

---

## Recorded Meetings

Users can access previous meetings.

Each meeting record includes:

- Meeting title
- Date
- Duration
- Host
- Productivity score
- Task count

Detailed view provides:

- Summary
- Action items
- Analytics
- Attendance

---

## Task Management

The platform converts meeting discussions into actionable tasks.

Task features:

- Assigned user
- Deadline tracking
- Completion status
- Priority tags

Filters available:

- Pending
- Completed
- Overdue

---

## Analytics Dashboard

Analytics help evaluate meeting effectiveness.

Metrics include:

- Meeting duration trends
- Participation levels
- Task completion rate
- Engagement distribution

---

## Technology Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js API routes
- FastAPI (for AI processing services)

### Database
- Supabase (PostgreSQL)

### AI Models
- Whisper (Speech-to-text)
- Transformer Models (Meeting Summarization)
- spaCy (Task Extraction)

### Automation
- n8n workflows for sending meeting invitations

---

## Project Structure


KGISL-Hackathon
│
├── app
│ ├── page.tsx
│ ├── dashboard
│ ├── meetings
│ ├── tasks
│ └── analytics
│
├── components
│ ├── Navbar
│ ├── Sidebar
│ ├── MeetingCard
│ └── TaskCard
│
├── services
│ ├── api
│ └── ai-processing
│
├── database
│ └── supabase-config
│
├── public
│
└── styles


---

## Database Schema

### Users

id
name
email
password
created_at


### Meetings

id
title
description
created_by
start_time
end_time
recording_allowed
productivity_score


### Participants

meeting_id
user_id
join_time
leave_time
duration
role


### Tasks

id
meeting_id
assigned_to
task
deadline
status


### Meeting Summaries

id
meeting_id
summary
key_points
productivity_score


---

## Installation

Clone the repository


git clone https://github.com/your-repository/KGISL-Hackathon.git


Navigate to the project folder


cd KGISL-Hackathon


Install dependencies


npm install


Run the development server


npm run dev


Open the application in your browser


http://localhost:3000


---

## Environment Variables

Create a `.env.local` file and add the following variables:


NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=


---

## Deployment

The application can be deployed using **Vercel**.

Steps:

1. Push the project to GitHub
2. Import the repository into Vercel
3. Add environment variables
4. Deploy the application

---

## Future Improvements

Possible enhancements include:

- Real-time meeting transcription
- AI chatbot for meeting queries
- Calendar integration
- Smart task reminders
- Voice emotion detection
- Mobile application

---

## Hackathon Impact

This project demonstrates how Artificial Intelligence can improve meeting productivity by transforming conversations into actionable insights.

Benefits:

- Reduces manual note-taking
- Improves task accountability
- Enhances meeting efficiency
- Provides measurable productivity insights

---

## Contributors

Team Members:

- Vinishraghav
- Hackathon Team
