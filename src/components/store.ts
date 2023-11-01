import { create } from "zustand";

import axios from "axios";

export type Contact = {
  id: number;
  name: string;
  email: string;
};

type State = {
  contacts: Contact[];

  addContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
  updateContact: (id: number, newContact: Contact) => void;
  fetchContacts: () => void;
};

const useStore = create<State>((set) => ({
  contacts: [],
 addContact: (contact)=> set((state)=>({contacts:[...state.contacts,contact]})),

  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
  updateContact: (id, newContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? newContact : contact
      ),
    })),
  fetchContacts: async () => {
    try {
      const response = await axios.get<Contact[]>(
        "http://localhost:3030/contacts"
      );
      set(() => ({ contacts: response.data }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useStore;
