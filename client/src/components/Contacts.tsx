import ContactCard from "./ContactCard";

export default function Contacts() {
  // Define an array of contacts
  const contacts = [
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
      name: "John Doe",
      mobile: "123-456-7890",
      email: "john@example.com",
    },
    {
      name: "Jane Smith",
      mobile: "987-654-3210",
      email: "jane@example.com",
    },
  ];

  return (
    <>
      <div className="font-navItems text-4xl px-6 py-6">Your Contact List</div>
      {/* Iterate over the contacts array and render a ContactCard for each contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </div>
    </>
  );
}
