
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a container for error boundary
const container = document.getElementById("root");

// Check if container exists to prevent null reference errors
if (!container) {
  console.error("Failed to find root element");
  throw new Error("Could not find root element");
}

const root = createRoot(container);

// Wrap in try-catch to handle rendering errors
try {
  root.render(<App />);
} catch (error) {
  console.error("Failed to render application:", error);
  // Render a fallback UI for critical errors
  root.render(
    <div className="p-4 bg-red-50 text-red-800 rounded-md">
      <h1 className="text-xl font-bold mb-2">Application Error</h1>
      <p>We're sorry, but something went wrong. Please try refreshing the page.</p>
    </div>
  );
}
