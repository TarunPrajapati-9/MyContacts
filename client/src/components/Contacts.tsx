import { useState } from "react";
import { Tooltip } from "react-tooltip";
import ContactCard from "./ContactCard";
import CreateContact from "./Models/CreateContact";

interface ContactProps {
  searchQuery: string;
}

const Contacts: React.FC<ContactProps> = ({ searchQuery }) => {
  const contacts = [
    {
      name: "Tarun Prajapati",
      mobile: "9724396439",
      email: "tarun.prajapati912@gmail.com",
    },
    {
      name: "John Doe",
      mobile: "123-456-7890",
      email: "john@example.com",
    },
    {
      name: "Jane Smith",
      mobile: "987-654-3210",
      email: "jane@example.com",
    },
    {
      name: "Michael Johnson",
      mobile: "456-789-0123",
      email: "michael@example.com",
    },
    {
      name: "Emily Brown",
      mobile: "789-012-3456",
      email: "emily@example.com",
    },
    {
      name: "David Lee",
      mobile: "210-345-6789",
      email: "david@example.com",
    },
    {
      name: "Sarah Taylor",
      mobile: "543-210-9876",
      email: "sarah@example.com",
    },
    {
      name: "Alex Rodriguez",
      mobile: "876-543-2109",
      email: "alex@example.com",
    },
    {
      name: "Rachel Martinez",
      mobile: "321-654-0987",
      email: "rachel@example.com",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModel = () => {
    setIsOpen(true);
  };

  const closeModel = () => {
    setIsOpen(false);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-navItems text-4xl px-6 py-6">
          Your Contact List
        </div>
        <div role="button" className="btn btn-ghost btn-circle avatar mr-8">
          <div className="rounded-lg">
            <img
              alt="add"
              src="./assets/icons/add.svg"
              data-tooltip-id="add"
              data-tooltip-content="Add Contact"
              onClick={openModel}
            />
            <Tooltip className="tooltip" id="add" />
          </div>
        </div>
      </div>
      {/* Iterate over the contacts array and render a ContactCard for each contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden select-none">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No Contact Found!
          </div>
        )}
      </div>

      {isOpen && <CreateContact isOpen={isOpen} onClose={closeModel} />}
    </>
  );
};

export default Contacts;
