# PROJECT_OVERVIEW.md — Session Starter / Continuation Brief

This document is the high-level, always-up-to-date summary of the project.

The human will copy/paste this file at the beginning of new sessions with
ChatGPT, Gemini, Cursor, Bolt, or DeepSeek to provide immediate context.

All agents must keep this file accurate and current.

## 1. Project Name
VisionaryDirector Bot

## 2. Current Vision / Purpose
An interactive AI chat experience embedded on the VisionaryDirector.com waitlist page. Its primary goal is to convert visitors into waitlist signups by explaining the unique concepts of the platform (Shopping Town, M-Forms, BYO-Key economics) using a transparent "Waitlist Concierge" persona.

## 3. Key Features / Modules
- **Chat Interface**: Floating/Sticky UI with streaming responses powered by Google Gemini 3.
- **Waitlist Form**: Lead capture system (currently mock/local logging).
- **Persona Logic**: Specific system instructions to explain "M-Forms" (API aggregators) and cost savings.
- **Share Functionality**: Native share API integration to invite friends.
- **Interactive Suggestions**: Clickable prompt suggestions for user engagement.

## 4. Current Status
Frontend prototype active. Chat logic connected to Gemini API. Waitlist form mocks success state.

## 5. Active Branches / Environments
- main: Primary development branch.

## 6. Most Recent Work
- Updated Bot Persona to "Visionary Director Waitlist Concierge".
- Added "Share" button to Chat Interface.
- Implemented specific pricing explanations ($20 lifetime / $5 yr developer tier).
- Added logic to explain "Bring Your Own Key" cost savings.
- Converted chat suggestions into clickable interactive elements.

## 7. Known Issues / Risks
- Waitlist data is currently `console.log` only (needs backend integration).
- Chat session resets on page refresh (no local storage persistence yet).

## 8. Next Intended Actions
- Integrate real backend for Waitlist form (Google Sheets or Database).
- Add persistence to chat history.
- Refine mobile responsiveness for the chat widget.

## 9. User Feedback Highlights
(Awaiting initial user testing feedback)

## 10. Last Updated
- Date: 2024-05-22
- By: Gemini
- Summary of change: Implementation of Multi-Agent Continuity System documentation.