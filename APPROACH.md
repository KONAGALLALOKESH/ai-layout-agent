# Approach

## Architecture

The project uses:

- React frontend for chat UI and layout preview
- Express backend for layout transformations
- JSON-based layout system

---

## Layout Handling

The layout contains:

- Absolute coordinates
- Normalized coordinates

Normalized coordinates are used to recompute layout positions during aspect ratio changes.

---

## Transformation Logic

The backend handles:

- Aspect ratio conversion
- Headline movement
- Font resizing
- Badge movement
- Product scaling

---

## Conversation Flow

The frontend sends:

- User message
- Current layout JSON

The backend processes instructions and returns:

- Updated layout
- Assistant explanation

---

## Future Improvements

- Full OpenAI integration
- Smarter semantic detection
- Better drag-and-drop preview
- Persistent conversation memory