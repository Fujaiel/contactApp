import React, { useState } from "react";
import useStore, { Contact } from "./components/store";
import Form from "./components/Form";
import ContactList from "./components/ContactList";

const App: React.FC = () => {
  const addContact = useStore((state) => state.addContact);
  const contacts = useStore((state) => state.contacts);
  const handleAddContact = (contact: Contact) => {
    addContact(contact);
  };

  // search
  const [searchTerm, setSearchTerm] = useState("");
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" max-w-lg mx-auto p-4">
      <h1 className=" text-white font-bold text-2xl my-4 text-center">Contact App</h1>
      <div className=" flex flex-col items-center">
        <input className=" h-12 rounded-md pl-4 font-medium mb-4 w-[300px]"
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Form onSubmit={handleAddContact} />
      </div>
      <div>
        <ContactList contacts={filteredContacts} />
      </div>
    </div>
  );
};

export default App;
