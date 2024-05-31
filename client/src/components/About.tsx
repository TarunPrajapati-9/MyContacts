export default function About() {
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const { alt } = event.currentTarget;

    if (alt === "github") {
      window.open("https://github.com/TarunPrajapati-9", "_blank");
    } else if (alt === "linkedin") {
      window.open(
        "https://www.linkedin.com/in/tarun-prajapati-82686024a",
        "_blank"
      );
    }
  };

  return (
    <div className="bg-[#FFFFFF] select-none">
      {/* logo section */}
      <div className="flex justify-center select-none pointer-events-none">
        <img src="/about.svg" alt="about" className="my-2" />
      </div>

      {/* our mission section */}
      <div className="mt-4">
        <p className="font-title text-[#456EFE] text-center text-3xl">
          Our Mission
        </p>
        <p className="font-aboutDesc text-justify font-semibold p-8 text-2xl mx-auto max-w-screen-md">
          Our mission is to help you organize your personal and professional
          contacts effortlessly. Whether it’s friends, family, colleagues, or
          business associates, MyContacts makes sure you have all their details
          at your fingertips.
        </p>
      </div>

      {/* meet the developer section */}
      <div className="mt-8">
        <p className="font-title text-[#456EFE] text-center text-3xl mb-6">
          Meet the Developer
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="w-full md:w-1/2 flex justify-center mb-6 pointer-events-none">
            <img
              src="/TarunPrajapati.png"
              alt="developer"
              className="w-3/4 md:w-[450px] max-w-xs md:max-w-full"
            />
          </div>
          <div className="w-full md:w-1/2 md:my-12">
            <p className="font-aboutDesc text-justify font-semibold p-10 text-2xl md:mr-20">
              Hello! I'm Tarun Prajapati, a passionate MERN Stack Web Developer
              currently pursuing a Bachelor of Engineering in Information
              Technology. Alongside my studies, I am diving deep into the world
              of Machine Learning. I am eager to take on new projects and
              challenges, combining my technical skills with innovative thinking
              to create impactful solutions. Whether it's building dynamic web
              applications or exploring data-driven insights, I am committed to
              delivering excellence in every endeavor. Let's collaborate and
              bring your ideas to life!
            </p>
            <div className="flex gap-6 justify-center mb-4 md:mr-20">
              <p className="font-aboutDesc font-semibold p-4 text-2xl">
                Connect :
              </p>
              <img
                src="/assets/icons/github.svg"
                alt="github"
                className="cursor-pointer"
                onClick={handleClick}
              />
              <img
                src="/assets/icons/linkedin1.svg"
                alt="linkedin"
                className="cursor-pointer"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
