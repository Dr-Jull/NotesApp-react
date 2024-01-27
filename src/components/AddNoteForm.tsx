import React, { useState, useEffect } from "react";

function AddNoteForm({ noteBeingEdited, updateNote }: any) {
  const [sliderValue, setSliderValue] = useState(3);
  const [noteText, setNoteText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [noteError, setNoteError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priorityValue, setPriorityValue] = useState(3);
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    // Set initial values when noteBeingEdited is provided
    if (noteBeingEdited.id) {
      setSliderValue(noteBeingEdited.priority);
      setNoteText(noteBeingEdited.text);
      setSelectedCategory(noteBeingEdited.category);
      setPriorityValue(noteBeingEdited.priority);
      setNoteTitle(noteBeingEdited.title);
    }
  }, [noteBeingEdited]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setSliderValue(newValue);
    setPriorityValue(newValue);
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteText(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setNoteTitle(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const getSliderColor = () => {
    if (sliderValue === 1 || sliderValue === 2) {
      return "rgb(187 247 208)";
    } else if (sliderValue === 5) {
      return "rgb(252 165 165)";
    } else {
      return "rgb(254,240,138)";
    }
  };

  const handleAddNote = () => {
    // Reset error messages
    setNoteError(false);
    setCategoryError(false);

    // Validate note text
    if (!noteText) {
      setNoteError(true);
    }

    // Validate category
    if (!selectedCategory) {
      setCategoryError(true);
    }

    // If no errors, proceed with adding the note
    if (
      noteText.trim() !== "" &&
      selectedCategory !== "" &&
      selectedCategory !== undefined
    ) {
      // Add your logic to save the note
      const updatedNote = {
        id: noteBeingEdited.id ? noteBeingEdited.id : Date.now(),
        title: ` ${
          noteBeingEdited.id
            ? noteBeingEdited.title
            : noteTitle !== ""
            ? noteTitle
            : Date.now()
        }`,
        text: noteText,
        priority: priorityValue,
        category: selectedCategory,
        author: {
          profile: "./src/assets/womanProfile.png", // You might want to replace this with the actual author profile
        },
      };

      // Update the note in the list directly
      updateNote(updatedNote);
      console.log(updatedNote);
      // Reset form values
      clearForm();
    }
  };

  function clearForm() {
    // Reset form values
    setSliderValue(3);
    setNoteText("");
    setSelectedCategory("");
    setNoteTitle("");
    setPriorityValue(3);
  }

  return (
    <div className=" w-80 h-full flex flex-col p-4 text-left rounded-lg bg-white text-black">
      <div className="flex flex-row w-full gap-1">
        <label className="font-bold">Title: </label>
        <input
          value={noteTitle}
          onChange={handleTitleChange}
          className="w-full bg-yellow-200 rounded px-1 mb-2 h-6 text-black"
          style={{ backgroundColor: getSliderColor() }}
          type="text"
          name="noteTitle"
          id=""
        />
      </div>
      <textarea
        style={{ backgroundColor: getSliderColor() }}
        className="w-full p-4 bg-yellow-200 rounded mb-4 text-black"
        name="note"
        id="noteInput"
        /*@ts-ignore */
        cols="30"
        /*@ts-ignore */
        rows="10"
        value={noteText}
        onChange={handleTextAreaChange}
      ></textarea>
      {noteError && <p className="text-red-500">please enter a text</p>}
      <p className="text-xl my-2" style={{ color: "black" }}>
        Priority: {priorityValue}
      </p>
      <input
        className="mb-4 mx-4"
        type="range"
        min={1}
        max={5}
        step={1}
        value={sliderValue}
        onChange={handleChange}
      />
      <p className="text-xl my-2" style={{ color: "black" }}>
        Category:
      </p>
      <select
        name="category"
        className="my-2 w-36 h-12 bg-gray-100 rounded-lg border border-gray-300 text-black"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select category
        </option>
        <option value="family">Family</option>
        <option value="work">Work</option>
        <option value="hobbies">Hobbies</option>
      </select>
      {categoryError && <p className="text-red-500">Category can't be empty</p>}
      <button
        type="button"
        onClick={handleAddNote}
        className="my-2 px-4 py-2 w-28 flex justify-center self-end bg-blue-500 text-white rounded"
      >
        {noteBeingEdited.id ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
}

export default AddNoteForm;
