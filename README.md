# VaaniAccess - Voice-First Welfare Scheme Navigator

VaaniAccess is a voice-first application designed to help citizens navigate complex government welfare schemes with ease. By utilizing modern web technologies and AI, the platform transforms bureaucratic processes into an intuitive digital experience. Users can simply speak their requirements, and the AI api will extract their profile and match them to the most suitable welfare schemes.

## Features

- **Voice Interaction:** Speak directly to the app (e.g., "I am a college student looking for a scholarship") to get matched with schemes.
- **AI-Powered Profile Extraction:** Uses Google's Generative AI to understand the user's context (occupation, education, intent) from natural speech.
- **Automated Scheme Matching:** Matches the extracted profile against a database of government schemes.
- **Modern & Accessible UI:** Designed following the *VaaniAccess Design System*, featuring a "Government Blue" palette, high-contrast typography, and a mobile-friendly fluid grid to reduce cognitive load and enhance accessibility.
- **Vercel Deployment Ready:** Configured for seamless deployment on Vercel with both the Vite frontend and Python FastAPI api.

## Tech Stack

- **Frontend:** React, Vite
- **api:** Python, FastAPI, SQLite
- **AI Integration:** Google Generative AI (`google-generativeai`)
- **Deployment:** Vercel (using Vercel's multiple services setup)

## Running Locally

### Prerequisites
- Node.js
- Python 3.9+
- A Google Gemini API Key (for AI extraction)

### api Setup
1. Navigate to the `api` folder.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set your Gemini API key (ensure it is accessible by `google-generativeai`).
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *(The api runs on `http://localhost:8000`)*

### Frontend Setup
1. In the root directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend will automatically proxy `/api` requests to the local Python api)*

## Design System

The application adheres to a **Modern Corporate** aesthetic with a focus on minimalism, engineered to facilitate trust and clarity. 
- **Colors:** Professional "Government Blue" (#1a73e8) with high-contrast neutrals.
- **Typography:** Inter, ensuring exceptional legibility on digital screens.
- **Shapes:** Highly rounded components (`16px` to `24px` radius) to create a friendly, approachable interface.

For full design specifications, see [DESIGN.md](./DESIGN.md).
