# Plum_Ass - Employee Benefits Assistant

A React-based web application that helps employees understand and access their health benefits using AI-powered classification and personalized action plans.

## Features

- **Health Need Classification**: Uses Google Gemini AI to classify employee health needs into categories:
  - Dental
  - OPD (Out-Patient Department)
  - Vision
  - Mental Health

- **Benefit Information**: Displays relevant benefits based on classification
- **Personalized Action Plans**: Generates step-by-step action plans to avail benefits
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API (gemini-1.5-flash)
- **Package Manager**: npm
- **Routing**: React Router v6

## Project Structure

```
src/
├── components/
│   ├── Screen1Input.tsx          # User input screen
│   ├── Screen2Classification.tsx # Health need classification
│   ├── Screen3Benefits.tsx       # Benefits display
│   └── Screen4ActionPlan.tsx     # Action plan generation
├── services/
│   └── aiService.ts             # Google Gemini API integration
├── data/
│   └── benefits.json            # Benefits data
├── App.tsx                       # Main app component
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

## Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Google Gemini API Key

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/falak-n/Plum_Ass.git
   cd Plum_Ass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   To get an API key:
   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Click "Create API Key"
   - Copy and paste it into `.env`

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build

## Usage

1. **Screen 1**: Enter your health concern/question
2. **Screen 2**: The app classifies your need using AI
3. **Screen 3**: View relevant benefits for your category
4. **Screen 4**: Get a personalized action plan to access the benefit

## API Integration

The app uses the **Google Generative AI (Gemini) API** for:
- Classifying health needs into benefit categories
- Generating personalized 3-step action plans

### API Configuration

- **Base URL**: `https://generativelanguage.googleapis.com/v1/models/`
- **Model**: `gemini-1.5-flash` (optimized for speed)
- **Authentication**: API key in header and query parameter

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for authentication |

## Important Security Notes

⚠️ **Never commit your `.env` file to version control!**

The `.gitignore` file already excludes:
- `.env`
- `.env.local`
- `node_modules/`
- `dist/`

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## How It Works

### Classification Process
1. User enters their health concern
2. AI analyzes the text and classifies it into one of four categories
3. If classification fails, defaults to OPD

### Benefit Display
1. Based on the category, relevant benefits are displayed
2. Each benefit shows title, description, and eligibility

### Action Plan Generation
1. User selects a benefit
2. AI generates a personalized 3-step action plan
3. Steps are specific to the benefit and category

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and screenshots if applicable

---

**Made with ❤️ for better employee benefits access**
- Provides regenerate option for users

## Architecture & Code Structure

- **`App.tsx`**: Main navigation and state management
- **`Screen1Input.tsx`**: Free-text input screen
- **`Screen2Classification.tsx`**: AI classification with loading indicator
- **`Screen3Benefits.tsx`**: Benefit cards display
- **`Screen4ActionPlan.tsx`**: AI-generated action plan screen
- **`services/aiService.ts`**: Gemini API integration with error handling
- **`data/benefits.json`**: Mock benefits data

## Features

- ✅ Multi-screen flow with smooth navigation
- ✅ AI-powered classification using Google Gemini
- ✅ Loading indicators during AI processing
- ✅ Benefit cards with coverage and descriptions
- ✅ AI-generated 3-step action plans
- ✅ Regenerate option for action plans
- ✅ Error handling and fallback responses
- ✅ Clean, formal UI with Tailwind CSS

## Known Issues / Improvements

- Occasionally misclassifies when input is vague
- Next improvement: Add clarifying question fallback for ambiguous inputs

## Tech Stack

- **Vite**: Build tool and dev server
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Google Gemini API**: AI classification and action plan generation

