import { Link } from "react-router-dom";
import { logo, help } from "../constants/footer";

const Footer = () => {
  const date = new Date();

  const navigateUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between select-none">
        <div className="flex flex-row md:gap-48">
          {/* Follow Section */}
          <div className="w-1/2 md:w-1/3 flex flex-col items-center justify-center p-7">
            <p className="font-contentTitle text-3xl mt-4 px-4 text-nowrap">
              Follow Us
            </p>
            {/* Logo section */}
            <div className="flex my-4">
              {logo.map((logo, index) => (
                <img
                  key={index}
                  src={logo.url}
                  alt={logo.alt}
                  className="px-1 w-[50px] h-[50px] cursor-pointer hover:opacity-85"
                  onClick={() => {
                    navigateUrl(logo.navigateUrl);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="w-1/2 md:w-1/3 p-16">
            <p className="font-footer font-bold text-2xl">Help</p>
            <ul className="list-none font-footer text-xl">
              {help.map((item) => (
                <li
                  key={item}
                  className="my-1.5 hover:opacity-80 cursor-pointer"
                >
                  <Link to={item.toLowerCase()} key={item}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email Section */}
        <div className="w-full md:w-1/3 p-16 flex flex-col items-center justify-center">
          <a href="mailto:mycontactsapp.team@gmail.com">
            <img
              src="./assets/icons/email.svg"
              alt="Email Logo"
              className="px-1 w-[50px] h-[50px] cursor-pointer hover:opacity-85"
            />
          </a>
          <p className="font-footer text-center text-2xl">
            mycontactsapp.team@gmail.com
          </p>
        </div>
      </div>

      {/* CopyRight Section */}
      <div className="font-title text-center p-8">
        &copy; {date.getFullYear()} - All Rights Reserved | MyContacts
      </div>
    </>
  );
};

export default Footer;
