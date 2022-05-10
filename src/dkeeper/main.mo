import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  public type Note = {
    title: Text;
    content: Text;
    id: Text;
  };

  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(title: Text, content: Text, id: Text) {
    var newNote : Note = {
      title = title;
      content = content;
      id = id;
    };
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func getNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func delNote(id: Text) {
    notes := List.filter(notes, func (note : Note) : Bool {
      note.id != id;
    });
  };
}