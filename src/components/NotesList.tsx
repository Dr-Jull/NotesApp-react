import Note from "./Note";
import { useState } from "react";

function NotesList({
  notes,
  setNotes,
  deleteNote,
  editNote,
}: {
  notes: any;
  setNotes: Function;
  deleteNote: Function;
  editNote: Function;
}) {
  const [clearAllConfirmation, setClearAllConfirmation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const clearAllMessage = () => {
    setClearAllConfirmation(true);
  };

  const filteredNotes =
    selectedCategory === "all"
      ? notes
      : notes.filter((note: any) => note.category === selectedCategory);

  const sortingCallbacks = {
    desc: (a: any, b: any) => b.priority - a.priority,
    asc: (a: any, b: any) => a.priority - b.priority,
  };

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedNotes = [...filteredNotes].sort(sortingCallbacks[sortOrder]);

  return (
    <div className="flex flex-col w-[400px] container px-4 py-4 bg-white rounded-lg h-full overflow-hidden m-0 text-black relative">
      <img
        className="absolute bg-red-500 p-5 rounded-xl bottom-2 right-2 cursor-pointer"
        src="./src/assets/trash.png"
        alt="clearAll"
        onClick={clearAllMessage}
      />
      {clearAllConfirmation && (
        <div className="absolute flex bg-black/20 w-full h-full top-0 left-0 justify-center items-center">
          <div className="flex flex-col bg-white rounded-lg shadow-xl w-[300px] h-[200px] justify-around p-3">
            <h2 className="font-bold text-black size-6 w-full">
              Are you sure? This will remove all your notes!
            </h2>
            <span>
              <button
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px cursor-pointer mr-1"
                onClick={() => {
                  localStorage.clear();
                  setClearAllConfirmation(false);
                  setNotes([]);
                }}
              >
                Yes
              </button>
              <button
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px cursor-pointer ml-1"
                onClick={() => setClearAllConfirmation(false)}
              >
                No
              </button>
            </span>
          </div>
        </div>
      )}
      <span className="flex flex-row items-center justify-between ">
        <h1 className="px-4 text-3xl font-bold">Notes</h1>
        <div className="flex items-center gap-3">
          <select
            onChange={handleFilterChange}
            value={selectedCategory}
            id="filterCategory"
            className=" w-24 h-8 bg-gray-100 rounded-lg px-1 border border-gray-300 "
          >
            <option value="all">All</option>
            <option value="family">Family</option>
            <option value="work">Work</option>
            <option value="hobbies">Hobbies</option>
          </select>
          <span
            className="bg-gray-200 p-2 rounded-lg"
            onClick={handleSortOrder}
          >
            <img className="h-5" src="./src/assets/sort.png" alt="" />
          </span>
        </div>
      </span>
      <hr className="m-3"></hr>
      <div className="grid gap-4 overflow-y-auto" id="noteContainer" style={{ scrollbarWidth:'none'}}>
        {sortedNotes.map((note: any) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ))}
      </div>
    </div>
  );
}
export default NotesList;
