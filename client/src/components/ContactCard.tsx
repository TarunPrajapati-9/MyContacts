import { Tooltip } from "react-tooltip";
import { contactSvg } from "../constants/contactsvg";
import { useState } from "react";
import EditModel from "./Models/EditModel";
import DeleteModel from "./Models/DeleteModel";

export interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  imageUrl: string;
}

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const [tooltipText, setTooltipText] = useState("Copy");

  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const openModal = (index: number) => {
    setOpenModalIndex(index);
    if (index === 0) {
      setSelectedContact(contact);
    }
  };

  const closeModal = () => {
    setOpenModalIndex(null);
    setSelectedContact(null);
  };

  const copyToClipboard = (phoneNumber: string) => {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        setTooltipText("Copied!");
        setTimeout(() => setTooltipText("Copy"), 3000);
      })
      .catch((err) => console.error("Could not copy phone number: ", err));
  };

  const shareContact = (contactDetails: string) => {
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      contactDetails
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="w-[425px] h-[125px] p-6 flex justify-center items-center">
      <div className="w-[30%] p-5 mb-6">
        <img
          src={contact.imageUrl}
          alt="img"
          className="rounded-full w-20 h-20 object-cover hover:transform hover:scale-110 transition-transform duration-300 ease-in-out select-none pointer-events-none"
        />
      </div>

      <div className="w-[70%]">
        <div>{contact.name}</div>
        <div className="flex gap-2">
          {contact.phone}
          <img
            src="./assets/icons/copy.svg"
            alt="copy"
            onClick={() => copyToClipboard(contact.phone)}
            className="hover:opacity-70 cursor-pointer"
            data-tooltip-id="copy"
            data-tooltip-content={tooltipText}
          />
          <Tooltip className="tooltip" id="copy" />
        </div>
        <div>{contact.email}</div>
        <div className="flex gap-2 mt-2 justify-end md:mr-10 mr-20">
          {contactSvg.map((item, index) => (
            <div key={index}>
              <img
                src={item.svgUrl}
                alt={item.altText}
                className="hover:opacity-70 cursor-pointer"
                data-tooltip-id={item.altText}
                data-tooltip-content={
                  item.altText.charAt(0).toUpperCase() + item.altText.slice(1)
                }
                onClick={() => {
                  if (item.altText === "share") {
                    shareContact(
                      `Name: ${contact.name}, Mobile: ${contact.phone}, Email: ${contact.email}`
                    );
                  } else {
                    openModal(index);
                  }
                }}
              />
              <Tooltip className="tooltip" id={item.altText} />
            </div>
          ))}
        </div>
      </div>
      {openModalIndex !== null && openModalIndex === 0 && (
        <EditModel
          isOpen={true}
          onClose={closeModal}
          contact={selectedContact}
          contactID={contact._id}
          imageUrl={contact.imageUrl}
        />
      )}
      {openModalIndex !== null && openModalIndex === 1 && (
        <DeleteModel
          isOpen={true}
          onClose={closeModal}
          contactID={contact._id}
          imageUrl={contact.imageUrl}
        />
      )}
    </div>
  );
};

export default ContactCard;
