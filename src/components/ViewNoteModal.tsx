function ViewNoteModal({
  note,
  closeViewNote,
  getPriorityColor,
}: {
  note: any;
  closeViewNote: any;
  getPriorityColor: Function;
}) {
  return (
    <div className="modal-overlay top-0 left-0 fixed w-full h-full flex items-center justify-center">
      <div
        style={{
          backgroundColor: getPriorityColor(),
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
        className="flex flex-wrap text-center items-start justify-between modal-content p-11 rounded-lg min-w-[400px] max-w-[600px] overflow-y-auto max-h-[700px] relative"
      >
        <div className="w-full mr-5 flex flex-col justify-between items-start">
          <h2 className="text-2xl font-bold my-3">{note.title}</h2>
          <h2 className="font-bold">Category: {note.category}</h2>
          <h2 className="font-bold">Priority: {note.priority}</h2>
        </div>

        <p className="mt-5">{note.text}</p>
        <button
          className="absolute bg-green-500 cursor-pointer rounded p-1 top-4 right-4"
          onClick={closeViewNote}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ViewNoteModal;
