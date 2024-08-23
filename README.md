# Bun SSR with Locality of Behavior: A High-Performance Approach to HTMX Applications

This project leverages the speed of Bun, the familiarity of React, and the principle of "locality of behavior" championed by Carson Gross, the creator of HTMX.

### Key Features:

1. **Locality of Behavior**: Each component encapsulates its own behavior, making the codebase easier to understand and maintain.
2. **JSX Simplicity**: Familiar syntax for those coming from React or Next.js backgrounds.
3. **High Performance**: Bun's runtime provides exceptional speed for server-side rendering.
4. **Minimal JavaScript**: Most components can be entirely server-rendered, reducing client-side bloat.
5. **Easy Deployment**: Perfect for VPS setups, especially when paired with SQLite for data storage.
6. **Great Tooling**: Leverage the vast JS/TS backend ecosystem while keeping your application lean.

## How It Works

The core of this setup is a `Script` component that allows you to inline JavaScript directly within your JSX:

```jsx
const Script: React.FC<ScriptProps> = ({ func = () => {}, execute = true }) => {
  const serializedFunction = func.toString();
  const scriptContent = execute
    ? `(${serializedFunction})();`
    : serializedFunction;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
};
```

This component enables you to define behavior right next to the HTML it affects, adhering to the principle of locality of behavior.

Here's an example of how you might use it:

```jsx
const ExampleComponent: React.FC = () => {
  return (
    <div id="exampleComponent">
      <h1>My Component</h1>
      <button id="myButton">Click me</button>

      <Script
        func={() => {
          const button = document.getElementById("myButton");
          // ... (event listener logic)
        }}
      />
    </div>
  );
};
```

## Use Cases for Localized Scripts

While this approach encourages minimal JavaScript usage, there are scenarios where small, localized scripts can greatly enhance the user experience without compromising performance. Here are some examples:

1. **Fancy Glowing Buttons with CSS Effects**:
   Implement interactive button effects that respond to user actions, like hover or click.

   ```jsx
   <button id="glowButton">Glow Me</button>
   <Script
     func={() => {
       const button = document.getElementById('glowButton');
       button.addEventListener('mouseover', () => {
         button.style.boxShadow = '0 0 10px #00ff00';
       });
       button.addEventListener('mouseout', () => {
         button.style.boxShadow = 'none';
       });
     }}
   />
   ```

2. **Animations**:
   Add subtle animations to enhance user interaction and provide visual feedback.

   ```jsx
   <div id="animatedElement">Animate Me</div>
   <Script
     func={() => {
       const element = document.getElementById('animatedElement');
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
   ```

3. **UI Enhancements Beyond CSS**:
   Implement complex UI behaviors that can't be achieved with CSS alone, such as custom popovers or tooltips.

   ```jsx
   <button id="popoverTrigger">Show Popover</button>
   <div id="popover" style={{ display: 'none' }}>Popover Content</div>
   <Script
     func={() => {
       const trigger = document.getElementById('popoverTrigger');
       const popover = document.getElementById('popover');
       trigger.addEventListener('click', () => {
         const isVisible = popover.style.display === 'block';
         popover.style.display = isVisible ? 'none' : 'block';
       });
     }}
   />
   ```

These localized scripts allow you to add rich interactivity precisely where needed, without the overhead of a full client-side JavaScript framework. They maintain the principle of locality of behavior, keeping the logic close to the elements they affect and making the code easier to understand and maintain.

## Why This Matters

1. **Simplified Mental Model**: By keeping behavior close to the HTML it affects, developers can more easily reason about their code.
2. **Performance**: Bun's speed combined with minimal client-side JavaScript results in snappy applications.
3. **Scalability**: This approach works well for both small projects and large applications.
4. **Flexibility**: Add interactivity only where needed, keeping most of your app as static HTML.

## Limitations and Considerations

The main issue with this approach is the repetition of scripts across components. Ideally there would be a way to
deduplicate these things. That said, it should be small enough to not really matter in practice compared to loading
heavy JS frameworks. If things get too heavy, locality of behavior can be sacrificed for performance.


## Getting Started

1. Clone this repository
2. Run `bun install`
3. Start the development server with `bun run dev`

## Conclusion

This project represents an exciting direction for web development, combining the best aspects of modern frameworks with the principles of simplicity and locality. It's particularly well-suited for developers who appreciate the philosophy behind tools like HTMX but want to leverage the React ecosystem.

By embracing server-side rendering with Bun and the concept of locality of behavior, we can build applications that are fast, maintainable, and a joy to develop.

Give it a try, and let me know what you think!

---

*Note: This is an experimental project meant to demonstrate concepts. Always evaluate new approaches carefully before using them in production environments.*
