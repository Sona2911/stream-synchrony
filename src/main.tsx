
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

// Add comprehensive error handling for resource loading issues
window.addEventListener('error', (event) => {
  console.error('Resource loading error:', event);
  
  if (event.target && 'tagName' in event.target) {
    const element = event.target as HTMLElement;
    console.error(`Failed to load ${element.tagName} resource:`, {
      src: (element as any).src || 'unknown',
      href: (element as any).href || 'unknown',
      id: element.id || 'no-id',
      className: element.className || 'no-class'
    });
  }
}, true); // Capture phase to catch all errors

// Also monitor for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
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
