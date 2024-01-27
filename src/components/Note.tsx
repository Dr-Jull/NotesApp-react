import ViewNoteModal from "./ViewNoteModal";
import { useState } from "react";

function Note({
  note,
  deleteNote,
  editNote,
}: // viewNote,
{
  note: any;
  deleteNote: Function;
  editNote: Function;
  // viewNote: Function;
}) {
  // const viewNote = () => {
  //   const noteInfo = `Title: ${note.title}\nText: ${note.text}\nCategory: ${note.category}\nPriority: ${note.priority}`;

  //   // Display an alert with the note information
  //   alert(noteInfo);
  // };

  const getPriorityColor = () => {
    if (note.priority === 1 || note.priority === 2) {
      return "rgb(187 247 208)";
    } else if (note.priority === 5) {
      return "rgb(252 165 165)";
    } else {
      return "rgb(254,240,138)";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewNote = () => {
    setIsModalOpen(true);
  };

  const closeViewNote = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="border-2 p-4 rounded-xl h-24 flex flex-row gap-2 text-left overflow-hidden"
      style={{
        backgroundColor: getPriorityColor(),
        boxShadow: `0px 10px 15px -3px rgba(0,0,0,0.2)`,
      }}
    >
      <div className="w-[50px] h-[50px] overflow-hidden rounded-full mb-2">
        <img className="w-full" src={note.author.profile} alt="profile" />
      </div>
      <span className="w-1/2">
        <p className="text-lg font-bold mb-2 leading-none">{note.title}</p>
        <p className="text-gray-600 mb-2 ">{note.text}</p>
      </span>
      <span>
        <p className="mb-2">
          {note.category} : ({note.priority})
        </p>
        <div className="flex gap-1 self-end justify-self-end">
          <span
            className="bg-red-500 cursor-pointer rounded p-1"
            onClick={() => deleteNote(note.id)}
          >
            <img src="./src/assets/trash.png" alt="" className="m h-5" />
          </span>
          <span
            className="bg-blue-200 cursor-pointer rounded p-1"
            onClick={() => editNote(note.id)}
          >
            <img src="./src/assets/edit.png" alt="" className="m h-5" />
          </span>
          <span
            className="bg-green-500 cursor-pointer rounded p-1"
            onClick={viewNote}
          >
            <img src="./src/assets/eye.png" alt="" className="m h-5" />
          </span>
          {isModalOpen && (
            <ViewNoteModal
              note={note}
              closeViewNote={closeViewNote}
              getPriorityColor={getPriorityColor}
            />
          )}
        </div>
      </span>
    </div>
  );
}

export default Note;
