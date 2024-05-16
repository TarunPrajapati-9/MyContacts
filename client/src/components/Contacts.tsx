import { Key, useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import ContactCard, { Contact } from "./ContactCard";
import CreateContact from "./Models/CreateContact";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getContacts } from "../utils/dataGetter";
import ContactSkeleton from "./Loaders/ContactSkeleton";

interface ContactProps {
  searchQuery: string;
}

const Contacts: React.FC<ContactProps> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Contacts"],
    queryFn: getContacts,
  });

  useEffect(() => {
    if (isError) {
      toast.error(`Error in Fetching User Data, Login First! ${error.message}`);
      // console.log(error.message);
      navigate("/login");
    }
  }, [isError, error, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  const openModel = () => {
    setIsOpen(true);
  };

  const closeModel = () => {
    setIsOpen(false);
  };

  const filteredContacts = data?.filter((contact: Contact) =>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden select-none">
        {isLoading ? (
          <>
            <ContactSkeleton key={1} />
            <ContactSkeleton key={2} />
            <ContactSkeleton key={3} />
          </>
        ) : filteredContacts?.length > 0 ? (
          filteredContacts.map(
            (contact: Contact, index: Key | null | undefined) => (
              <ContactCard key={index} contact={contact} />
            )
          )
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
