import { useState } from "react";
import useStore, { Contact } from "./store";

type ContactListProps = {
  contacts: Contact[];
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const deleteContact = useStore((state) => state.deleteContact);
  const updateContact = useStore((state) => state.updateContact);

  const [editingContact, setEditingContact] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleDelete = (id: number) => {
    deleteContact(id);
  };

  //  update contact
  const handleUpdate = (id: number, newContact: Contact) => {
    updateContact(id, newContact);
    setEditingContact(null);
    setEditName("");
    setEditEmail("");
  };

  return (
    <div>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className=" bg-purple-600 text-center my-4  rounded-md"
        >
          {editingContact === contact.id ? (
            <div className="py-4 flex flex-col items-center">
              <input
                className=" h-12 mx-3 rounded-md pl-4 font-medium w-[300px]"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                className=" h-12 rounded-md pl-4 font-medium w-[300px] my-4"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <button
                className=" bg-purple-950 px-4 py-2 hover:bg-purple-500 rounded-md my-2 text-white"
                onClick={() =>
                  handleUpdate(contact.id, {
                    id: contact.id,
                    name: editName,
                    email: editEmail,
                  })
                }
              >
                Update
              </button>
            </div>
          ) : (
            <div className=" py-4">
              <h3 className="text-white ">{contact.name}</h3>
              <p className=" py-2 text-white ">{contact.email}</p>
              <button
                className=" text-white mx-2  bg-purple-950 px-4 py-2 hover:bg-purple-500 rounded-md"
                onClick={() => {
                  setEditingContact(contact.id);
                  setEditName(contact.name);
                  setEditEmail(contact.email);
                }}
              >
                Edit
              </button>
              <button
                className="text-white bg-purple-950 px-4 py-2 hover:bg-purple-500 rounded-md"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
