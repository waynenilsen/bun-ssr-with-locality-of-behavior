import { serve } from "bun";
import { renderToString } from "react-dom/server";
import React from "react";

// Interface for Script component props
interface ScriptProps {
  func: () => void;
  execute?: boolean;
}

// Script component
const Script: React.FC<ScriptProps> = ({ func = () => {}, execute = true }) => {
  const serializedFunction = func.toString();
  const scriptContent = execute
    ? `(${serializedFunction})();`
    : serializedFunction;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
};

// GlowingButton component
const GlowingButton: React.FC = () => {
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease'
  };

  return (
    <div>
      <button id="glowButton" style={buttonStyle}>Glow Me</button>
      <Script
        func={() => {
          const button = document.getElementById('glowButton');
          if (!button) return;
          button.addEventListener('mouseover', () => {
            button.style.boxShadow = '0 0 10px #00ff00';
          });
          button.addEventListener('mouseout', () => {
            button.style.boxShadow = 'none';
          });
        }}
      />
    </div>
  );
};

// AnimatedElement component
const AnimatedElement: React.FC = () => {
  const elementStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    display: 'inline-block'
  };

  return (
    <div>
      <div id="animatedElement" style={elementStyle}>Click to Animate</div>
      <Script
        func={() => {
          const element = document.getElementById('animatedElement');
          if (!element) return;
          element.addEventListener('click', () => {
            element.animate([
              { transform: 'scale(1)' },
              { transform: 'scale(1.1)' },
              { transform: 'scale(1)' }
            ], {
              duration: 300,
              iterations: 1
            });
          });
        }}
      />
    </div>
  );
};

// Popover component
const Popover: React.FC = () => {
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  const popoverStyle = {
    display: 'none',
    position: 'absolute' as const,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    padding: '10px',
    zIndex: 1000
  };

  return (
    <div style={{ position: 'relative' }}>
      <button id="popoverTrigger" style={buttonStyle}>Show Popover</button>
      <div id="popover" style={popoverStyle}>This is a popover!</div>
      <Script
        func={() => {
          const trigger = document.getElementById('popoverTrigger');
          const popover = document.getElementById('popover');
          if (!trigger || !popover) return;
          trigger.addEventListener('click', () => {
            const isVisible = popover.style.display === 'block';
            popover.style.display = isVisible ? 'none' : 'block';
          });
        }}
      />
    </div>
  );
};

// ExampleComponent
const ExampleComponent: React.FC = () => {
  return (
    <div id="exampleComponent" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>My Component</h1>
      <button id="myButton" style={{ marginBottom: '20px' }}>Click me</button>

      <Script
        func={() => {
          const button = document.getElementById("myButton");
          const container = document.getElementById("exampleComponent");
          if (!button || !container) {
            console.error("Button or container not found!");
            return;
          }
          button.addEventListener("click", () => {
            console.log("Button clicked!");
            const newElement = document.createElement("p");
            newElement.textContent = "Button was clicked!";
            newElement.style.color = '#007bff';
            container.appendChild(newElement);
          });
        }}
      />

      <GlowingButton />
      <AnimatedElement />
      <Popover />

      <Script
        func={function myHelperFunction() {
          console.log("Helper function called");
        }}
        execute={false}
      />
    </div>
  );
};

// App component that includes ExampleComponent
const App: React.FC = () => {
  return (
    <html>
    <head>
      <title>Bun SSR Demo</title>
    </head>
    <body style={{ margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
    <ExampleComponent />
    </body>
    </html>
  );
};

// Server
const server = serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      const html = renderToString(<App />);
      return new Response("<!DOCTYPE html>" + html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
