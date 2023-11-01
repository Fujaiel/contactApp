import { useState, useEffect } from "react";
import { Contact } from "./store";

type FormProps = {
  onSubmit: (contact: Contact) => void;
  initialContact?: Contact;
};
const Form: React.FC<FormProps> = ({ onSubmit, initialContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialContact) {
      setName(initialContact.name);
      setEmail(initialContact.email);
    }
  }, [initialContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact: Contact = {
      id: Date.now(),
      name,
      email,
    };
    onSubmit(newContact);
    setName("");
    setEmail("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex flex-col items-center">
        <input
          className="h-12 rounded-md pl-4 font-medium w-[300px]"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className=" my-4 h-12 rounded-md pl-4 font-medium w-[300px]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className=" mx-2 text-white bg-purple-950 px-4 py-2 hover:bg-purple-500 rounded-md w-[90px]  "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
