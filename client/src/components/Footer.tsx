import { logo, help } from "../constants/footer";

const Footer = () => {
  const date = new Date();
  return (
    <>
      <div className="flex justify-between">
        {/* Follow Section */}
        <div className="w-1/3 justify-center">
          <div className="font-contentTitle text-3xl mt-4 px-4">Follow Us</div>
          {/* Logo section */}
          <div>
            {logo.map((logo, index) => (
              <img key={index} src={logo.url} alt={logo.alt} />
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="w-1/3">
          <p className="font-footer font-bold">Help</p>
          <ul className="list-none font-footer">
            {help.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Email Section */}
        <div className="w-1/3">
          <img src="./src/assets/icons/email.svg" alt="Email Logo" />
          <p className="font-footer">mycontacts@gmail.com</p>
        </div>
      </div>

      {/* CopyRight Section */}
      <div className="font-title">
        &copy; {date.getFullYear()} - All Rights Reserved | MyContacts
      </div>
    </>
  );
};

export default Footer;
