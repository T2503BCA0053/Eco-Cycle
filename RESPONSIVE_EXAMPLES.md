# Responsive Component Examples

## 🎯 How to Make Your Components Responsive

This guide shows practical examples of converting fixed-size components to responsive layouts.

---

## Example 1: Card Component

### ❌ Before (Fixed)
```javascript
function Card({ title, content }) {
  return (
    <div style={{
      padding: "20px",                    // Fixed
      fontSize: "16px",                   // Fixed
      borderRadius: "16px",               // Fixed
      marginBottom: "16px",               // Fixed
      background: "#0F2535",
    }}>
      <h3 style={{ fontSize: "18px" }}>{title}</h3>
      <p style={{ fontSize: "14px" }}>{content}</p>
    </div>
  );
}
```

### ✅ After (Responsive)
```javascript
import { useResponsive } from "./useResponsive";

function Card({ title, content }) {
  const screen = useResponsive();
  
  return (
    <div style={{
      padding: `${screen.padding}px`,     // Responsive: 12-32px
      fontSize: `${screen.fontSize.body}px`,
      borderRadius: screen.isMobile ? "12px" : "16px",
      marginBottom: `${screen.spacing}px`,
      background: "#0F2535",
    }}>
      <h3 style={{ fontSize: `${screen.fontSize.title}px` }}>
        {title}
      </h3>
      <p style={{ fontSize: `${screen.fontSize.body}px` }}>
        {content}
      </p>
    </div>
  );
}
```

---

## Example 2: Form Input Group

### ❌ Before (Fixed)
```javascript
function InputField({ label, placeholder }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{
        fontSize: "14px",
        marginBottom: "8px",
        display: "block",
      }}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 16px",
          fontSize: "15px",
          borderRadius: "12px",
          border: "1.5px solid rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}
```

### ✅ After (Responsive)
```javascript
import { useResponsive } from "./useResponsive";

function InputField({ label, placeholder }) {
  const screen = useResponsive();
  
  return (
    <div style={{ marginBottom: `${screen.spacing}px` }}>
      <label style={{
        fontSize: `${screen.fontSize.label}px`,
        marginBottom: `${screen.spacing / 2}px`,
        display: "block",
      }}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="input-field"
        style={{
          width: "100%",
          padding: `${screen.padding * 0.9}px ${screen.padding}px`,
          fontSize: `${screen.fontSize.body}px`,
          borderRadius: screen.isMobile ? "10px" : "12px",
          border: "1.5px solid rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}
```

---

## Example 3: Grid Layout

### ❌ Before (Fixed 4 columns)
```javascript
function ProductGrid({ items }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",  // Fixed 4 columns
      gap: "20px",
      padding: "24px",
    }}>
      {items.map(item => (
        <div key={item.id} style={{
          padding: "16px",
          borderRadius: "16px",
          background: "#0F2535",
        }}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### ✅ After (Adaptive columns)
```javascript
import { useResponsive } from "./useResponsive";

function ProductGrid({ items }) {
  const screen = useResponsive();
  
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${screen.gridColumns}, 1fr)`,
      gap: `${screen.spacing}px`,
      padding: `${screen.padding}px`,
    }}>
      {items.map(item => (
        <div key={item.id} style={{
          padding: `${screen.padding}px`,
          borderRadius: screen.isMobile ? "12px" : "16px",
          background: "#0F2535",
          fontSize: `${screen.fontSize.body}px`,
        }}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

---

## Example 4: Header Component

### ❌ Before (Fixed)
```javascript
function Header({ title, subtitle }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0A2E14, #1A5E30)",
      padding: "28px 20px",
      borderRadius: "0 0 28px 28px",
    }}>
      <h1 style={{
        fontSize: "32px",
        fontWeight: "900",
        marginBottom: "8px",
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: "14px",
        color: "rgba(255,255,255,0.65)",
        marginBottom: "4px",
      }}>
        {subtitle}
      </p>
    </div>
  );
}
```

### ✅ After (Responsive)
```javascript
import { useResponsive } from "./useResponsive";

function Header({ title, subtitle }) {
  const screen = useResponsive();
  
  return (
    <div style={{
      background: "linear-gradient(135deg, #0A2E14, #1A5E30)",
      padding: `${screen.padding * 1.2}px ${screen.padding}px`,
      borderRadius: screen.isMobile ? "0 0 20px 20px" : "0 0 28px 28px",
    }}>
      <h1 style={{
        fontSize: `${screen.fontSize.header}px`,
        fontWeight: "900",
        marginBottom: `${screen.spacing / 2}px`,
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: `${screen.fontSize.small}px`,
        color: "rgba(255,255,255,0.65)",
        marginBottom: `${screen.spacing / 3}px`,
      }}>
        {subtitle}
      </p>
    </div>
  );
}
```

---

## Example 5: Button Component

### ❌ Before (Fixed)
```javascript
function Button({ label, onClick, variant = "primary" }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "16px",
        fontSize: "16px",
        borderRadius: "16px",
        background: variant === "primary" 
          ? "linear-gradient(135deg, #2DC653, #1A9E3F)"
          : "transparent",
        color: variant === "primary" ? "#0B1E2D" : "#2DC653",
        border: variant === "primary" 
          ? "none"
          : "1.5px solid rgba(45,198,83,0.6)",
      }}
    >
      {label}
    </button>
  );
}
```

### ✅ After (Responsive)
```javascript
import { useResponsive } from "./useResponsive";

function Button({ label, onClick, variant = "primary" }) {
  const screen = useResponsive();
  
  const padding = screen.isMobile 
    ? "14px" 
    : screen.isTablet 
      ? "15px"
      : "16px";
  
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: padding,
        fontSize: `${screen.fontSize.body}px`,
        borderRadius: screen.isMobile ? "12px" : "16px",
        background: variant === "primary" 
          ? "linear-gradient(135deg, #2DC653, #1A9E3F)"
          : "transparent",
        color: variant === "primary" ? "#0B1E2D" : "#2DC653",
        border: variant === "primary" 
          ? "none"
          : `1.5px solid rgba(45,198,83,0.6)`,
        transition: "all 0.2s",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
```

---

## Example 6: List with Icons

### ❌ Before (Fixed)
```javascript
function ListItem({ icon, title, subtitle }) {
  return (
    <div style={{
      display: "flex",
      gap: "14px",
      padding: "16px",
      background: "#0F2535",
      borderRadius: "14px",
      marginBottom: "10px",
    }}>
      <div style={{ fontSize: "24px" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "14px", fontWeight: "600" }}>
          {title}
        </div>
        <div style={{ fontSize: "12px", color: "#7A9BAE" }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
```

### ✅ After (Responsive)
```javascript
import { useResponsive } from "./useResponsive";

function ListItem({ icon, title, subtitle }) {
  const screen = useResponsive();
  
  return (
    <div style={{
      display: "flex",
      gap: `${screen.spacing}px`,
      padding: `${screen.padding * 0.8}px`,
      background: "#0F2535",
      borderRadius: screen.isMobile ? "12px" : "14px",
      marginBottom: screen.isMobile ? "8px" : "10px",
    }}>
      <div style={{ 
        fontSize: screen.isMobile ? "22px" : "24px" 
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontSize: `${screen.fontSize.body}px`, 
          fontWeight: "600" 
        }}>
          {title}
        </div>
        <div style={{ 
          fontSize: `${screen.fontSize.small}px`, 
          color: "#7A9BAE" 
        }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
```

---

## Example 7: Modal Dialog

### ❌ Before (Fixed)
```javascript
function Modal({ title, children, onClose }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#0F2535",
        borderRadius: "20px",
        padding: "24px",
        width: "90%",
        maxWidth: "500px",
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
```

### ✅ After (Responsive)
```javascript
import { useResponsive } from "./useResponsive";

function Modal({ title, children, onClose }) {
  const screen = useResponsive();
  
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: screen.isMobile ? "flex-end" : "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#0F2535",
        borderRadius: screen.isMobile ? "20px 20px 0 0" : "20px",
        padding: `${screen.padding}px`,
        width: screen.isMobile ? "100%" : "90%",
        maxWidth: "500px",
        maxHeight: screen.isMobile ? "90vh" : "80vh",
        overflowY: "auto",
      }}>
        <h2 style={{ 
          fontSize: `${screen.fontSize.title}px`, 
          marginBottom: `${screen.spacing}px` 
        }}>
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
```

---

## Example 8: Dashboard with 2-Column Layout

### ❌ Before (Fixed 2 columns)
```javascript
function Dashboard() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      padding: "20px",
    }}>
      <div>Left Column</div>
      <div>Right Column</div>
    </div>
  );
}
```

### ✅ After (Responsive layout)
```javascript
import { useResponsive } from "./useResponsive";

function Dashboard() {
  const screen = useResponsive();
  
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: screen.isDesktop ? "1fr 1fr" : "1fr",
      gap: `${screen.spacing}px`,
      padding: `${screen.padding}px`,
    }}>
      <div>Left Column</div>
      {screen.isDesktop && <div>Right Column</div>}
    </div>
  );
}
```

---

## 🎯 Quick Refactoring Checklist

When making a component responsive, use this checklist:

- [ ] Import `useResponsive` hook
- [ ] Call `useResponsive()` at component top
- [ ] Replace fixed `padding` with `screen.padding`
- [ ] Replace fixed `gap`/`margin` with `screen.spacing`
- [ ] Replace fixed `fontSize` with `screen.fontSize.*`
- [ ] Replace fixed `borderRadius` with responsive values
- [ ] Replace fixed grid columns with `screen.gridColumns`
- [ ] Add conditional layouts: `if (screen.isMobile) {...}`
- [ ] Test on all breakpoints (375px, 768px, 1024px, 1440px)
- [ ] Check touch target sizes on mobile (≥44px)

---

## 💡 Pro Tips

### 1. **Use Semantic Screen Properties**
```javascript
// ❌ Don't use magic numbers
if (screen.width < 768) { ... }

// ✅ Use semantic properties
if (screen.isMobile) { ... }
if (screen.isTablet) { ... }
if (screen.isDesktop) { ... }
```

### 2. **Scale with Multipliers**
```javascript
// Use multipliers for proportional spacing
const smallPadding = screen.padding * 0.75;
const largePadding = screen.padding * 1.5;
```

### 3. **Consistent Gap Sizing**
```javascript
// Always use screen.spacing for gaps
gap: `${screen.spacing}px`,          // Standard gap
marginBottom: `${screen.spacing / 2}px`,  // Half gap
paddingTop: `${screen.spacing * 1.5}px`,  // 1.5x gap
```

### 4. **Cache Responsive Values**
```javascript
// Cache values for performance
const screen = useResponsive();
const padding = screen.padding;
const spacing = screen.spacing;
const isMobile = screen.isMobile;

// Use cached values throughout component
return (
  <div style={{ padding: `${padding}px` }}>
    <div style={{ gap: `${spacing}px` }} />
  </div>
);
```

### 5. **Test on Real Devices**
```javascript
// Use browser console to check
console.log(useResponsive());

// Output example:
// {
//   width: 375,
//   isMobile: true,
//   isTablet: false,
//   isDesktop: false,
//   gridColumns: 1,
//   fontSize: { header: 28, title: 18, body: 14, small: 12 },
//   padding: 16,
//   spacing: 12
// }
```

---

## 🚀 Common Patterns

### Pattern 1: Mobile-First Conditional
```javascript
<div style={{
  display: "flex",
  flexDirection: screen.isMobile ? "column" : "row",
  gap: `${screen.spacing}px`,
}}>
  {/* Stacks vertically on mobile */}
  <Section1 />
  <Section2 />
</div>
```

### Pattern 2: Responsive Grid
```javascript
<div style={{
  display: "grid",
  gridTemplateColumns: `repeat(${screen.gridColumns}, 1fr)`,
  gap: `${screen.spacing}px`,
}}>
  {/* Automatically adjusts columns */}
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Pattern 3: Hide/Show on Breakpoint
```javascript
{screen.isDesktop && <Sidebar />}
{screen.isMobile && <BottomNav />}
```

### Pattern 4: Responsive Typography Hierarchy
```javascript
<h1 style={{ fontSize: `${screen.fontSize.header}px` }}>
  Main Title
</h1>
<h2 style={{ fontSize: `${screen.fontSize.title}px` }}>
  Section Title
</h2>
<p style={{ fontSize: `${screen.fontSize.body}px` }}>
  Body Text
</p>
```

---

**Version:** 1.0  
**Last Updated:** April 18, 2026
