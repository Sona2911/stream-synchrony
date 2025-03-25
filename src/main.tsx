
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

// Add global error handler for script loading issues
window.addEventListener('error', (event) => {
  if (event.target && (event.target as HTMLElement).tagName === 'SCRIPT') {
    console.error('Script loading error:', event);
  }
});

// Wrap in try-catch to handle rendering errors
try {
  console.log("Attempting to render application...");
  root.render(<App />);
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Failed to render application:", error);
  // Render a fallback UI for critical errors
  root.render(
    <div className="p-4 bg-red-50 text-red-800 rounded-md">
      <h1 className="text-xl font-bold mb-2">Application Error</h1>
      <p>We're sorry, but something went wrong. Please try refreshing the page.</p>
      <p className="mt-2 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  );
}
