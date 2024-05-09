import features from "../constants/features";

const Home = () => {
  return (
    <>
      {/* Top Section */}
      <div className="flex justify-center items-center px-4 py-2 select-none">
        {/* Content Section */}
        <div className="w-1/2">
          <div className="font-contentTitle text-4xl mt-4 px-4">
            Welcome to MyContacts!
          </div>
          <div className="font-content my-5 text-2xl px-4 text-justify">
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
        <div className="w-1/2 flex justify-end select-none pointer-events-none mr-4">
          <img src="./hero1.png" alt="Hero1" className="h-auto max-h-[500px]" />
        </div>
      </div>

      {/* Middle Section */}
      <hr className="border-separate border-black my-6" />
      <div className="flex justify-center items-center px-7 py-2 select-none">
        <p className="font-content text-2xl text-justify">
          With MyContacts, managing your contacts has never been simpler. Say
          goodbye to scattered address books and hello to streamlined contact
          management. Start organizing your contacts today with MyContacts!
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="font-contentTitle text-2xl">
          Sign up now to get started!
        </p>
        <button className="btn btn-neutral mx-4 w-36">Sign Up</button>
      </div>
      <hr className="border-separate border-black mt-6" />

      {/* Bottom Section */}
      <div className="flex justify-center items-center px-4 py-1 select-none">
        {/* Image Section */}
        <div className="w-1/2 flex justify-center select-none pointer-events-none mr-4">
          <img src="./hero2.png" alt="Hero1" className="h-auto max-h-[500px]" />
        </div>
        {/* Features Section */}
        <div className="w-1/2">
          <div className="font-contentTitle text-4xl mt-4 px-4">
            Key Features
          </div>
          <div className="font-content my-5 text-2xl px-4">
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
