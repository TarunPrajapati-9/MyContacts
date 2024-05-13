import { Tooltip } from "react-tooltip";
import { contactSvg } from "../constants/contactsvg";

interface Contact {
  name: string;
  mobile: string;
  email: string;
}

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="w-[425px] h-[125px] p-6 flex justify-center items-center">
      <div className="w-[30%] p-5 mb-6">
        <img
          src="./assets/icons/profile.svg"
          alt="img"
          className="w-86 h-86 rounded hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="w-[70%]">
        <div>{contact.name}</div>
        <div className="flex gap-2">
          {contact.mobile}
          <img
            src="./assets/icons/copy.svg"
            alt="copy"
            className="hover:opacity-70 cursor-pointer"
            data-tooltip-id="copy"
            data-tooltip-content="Copy"
          />
          <Tooltip className="tooltip" id="copy" />
        </div>
        <div>{contact.email}</div>
        <div className="flex gap-2 mt-2 justify-end mr-10">
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
              />
              <Tooltip className="tooltip" id={item.altText} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
