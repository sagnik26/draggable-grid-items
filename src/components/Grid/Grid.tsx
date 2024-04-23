import React, { useState } from "react";

// Sample data to populate the grid
const initialItems = [
  { id: "item-0", content: "Item 1" },
  { id: "item-1", content: "Item 2" },
  { id: "item-2", content: "Item 3" },
  { id: "item-3", content: "Item 4" },
  { id: "item-4", content: "Item 5" },
  { id: "item-5", content: "Item 6" },
  { id: "item-6", content: "Item 7" },
  { id: "item-7", content: "Item 8" },
  { id: "item-8", content: "Item 9" },
];

function Grid() {
  const [items, setItems] = useState(initialItems);
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (id === draggingId) return;

    // Rearrange items
    const dragIndex = items.findIndex((item) => item.id === draggingId);
    const hoverIndex = items.findIndex((item) => item.id === id);

    console.log("D-INDEX", dragIndex);
    console.log("H-INDEX", hoverIndex);

    const updatedItems = [...items];
    const draggedItem = updatedItems[dragIndex];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);

    setItems(updatedItems);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "400px" }}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDragEnd={handleDragEnd}
          style={{
            width: "100px",
            height: "100px",
            margin: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            backgroundColor: draggingId === item.id ? "lightblue" : "white",
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

export default Grid;
