# 📊 Frejun's Sheet - Frontend Assignment

A Google Sheets-inspired interactive comment sheet, built using **React.js** and **Tailwind CSS** (with DaisyUI).  
This project fulfills all 5 sub-tasks mentioned in Frejun's frontend intern assignment — with polished UI/UX, animations, and added enhancements.

---

## 🚀 Live Preview

> [🔗 View Live Project](https://frejun-assignment.vercel.app/)  


---

## ✅ Completed Assignment Tasks

### 🔢 Task 1: Fetch Comments
- Pulled comments from: `https://jsonplaceholder.typicode.com/comments`
- Displayed in a paginated, responsive table

### 🔍 Task 2: Search by Name, Email, or Body
- Instant, debounced search box
- Filters comments based on partial or full match

### 📩 Task 3: Display Associated Post Title
- Fetched post titles from: `https://jsonplaceholder.typicode.com/posts`
- Mapped `comment.postId` → `post.title`

### 📝 Task 4: Inline Edit Name & Body
- Toggle edit mode using "✏️ Edit" / ✅ Done button
- Input and textarea seamlessly replace text fields
- Changes are saved to **localStorage**

### 📤 Task 5: Download Edited Comments as CSV
- CSV includes: `Email, Name, Body, Post Title`
- Click 💾 Save button to download current edits

---

## ✨ Extra Features

### 💡 Theme Toggle & Selector
- Switch between multiple **DaisyUI themes**
- Persistent dark/light mode with toggle + dropdown

### 📐 Zoom In / Zoom Out
- Zoom the entire table view for better readability

### ♻️ Reset Button
- Clear all local edits and reload fresh data

### 📈 Sortable Columns
- Sort by **Name** and **Email**
- Up/down arrow icons on hover
- Remembers direction (ascending/descending)

### 🎨 Responsive Design
- Fully responsive layout using Tailwind
- Works across mobile, tablet, desktop

### 🧠 Smart UX
- Table looks like a Google Sheet: alternating row shades, pop-out shadow, compact controls
- Editable fields don’t shrink, they match layout perfectly

### 🎞 Subtle Animations
- Logo and title slide in and scale smoothly
- UI feels modern and professional
 
---

## 🛠 Tech Stack

- ⚛️ **React.js**
- 💨 **Tailwind CSS**
- 🎨 **DaisyUI**
- 🔁 **React Hooks** (`useEffect`, `useState`, custom `useLocalStorage`)
- 📦 **JSONPlaceholder API** for mock data

---

 