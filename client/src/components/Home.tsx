import { useNavigate } from "react-router-dom";
import features from "../constants/features";

const Home = () => {
  const navigate = useNavigate();

  const toSignUp = () => {
    navigate("/register");
  };

  return (
    <>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-center items-center px-4 py-2 select-none">
        {/* Content Section */}
        <div className="w-full md:w-1/2">
          <div className="font-contentTitle text-4xl mt-4 md:mt-0 px-4 text-center md:text-left animate-pulse">
            Welcome to MyContacts!
          </div>
          <div className="font-content my-5 md:text-2xl text-xl px-4 md:text-left text-justify">
            <p className="mt-8">
              Your Personal Contact Manager Stay organized and connected with
              MyContacts, your ultimate solution for managing your personal
              contacts.
            </p>
            <p className="mt-12">
              Whether you're looking to keep track of friends, family, or
              business contacts, MyContacts makes it easy to maintain your
              contact diary in one convenient location.
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end select-none pointer-events-none mt-4 md:mt-0">
          <img src="./hero1.png" alt="Hero1" className="h-auto max-h-[500px]" />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex justify-center items-center px-4 md:px-7 py-2 mt-4 select-none">
        <p className="font-content md:text-2xl text-xl text-justify md:text-left">
          With MyContacts, managing your contacts has never been simpler. Say
          goodbye to scattered address books and hello to streamlined contact
          management. Start organizing your contacts today with MyContacts!
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="font-contentTitle md:text-2xl text-xl text-center md:text-left">
          Sign up now to get started!
        </p>
        <button
          className="btn btn-outline btn-info mx-4 w-36 animate-bounce"
          onClick={toSignUp}
        >
          Sign Up
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-center items-center px-4 py-1 select-none">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end select-none pointer-events-none mt-4 md:mt-0 md:mr-10">
          <img src="./hero2.png" alt="Hero1" className="h-auto max-h-[500px]" />
        </div>
        {/* Features Section */}
        <div className="w-full md:w-1/2">
          <div className="font-contentTitle text-4xl mt-4 md:mt-0 px-4 text-justify md:text-left animate-pulse">
            Key Features
          </div>
          <div className="font-content my-5 md:text-2xl text-xl px-4 text-justify">
            <ul className="list-disc ml-8">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
