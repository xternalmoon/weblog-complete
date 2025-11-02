import { useContext, useEffect, useState } from "react";
import heroVideo from "../imgs/hero.mp4";
import heroVideoDark from "../imgs/hero-dark.mp4"
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const HeroSection = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(
    () => sessionStorage.getItem("bannerClosed") !== "true" // Check sessionStorage on mount
  );

  useEffect(() => {
    const videoElement = document.getElementById("heroVideo");
    if (videoElement) {
      videoElement.play();
    }
  }, []);

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
    sessionStorage.setItem("bannerClosed", "true"); // Set the bannerClosed flag in sessionStorage
  };

  let { theme } = useContext(ThemeContext)

  return (
    <div className="w-full h-cover bg-white relative overflow-hidden">
      {/* Video background */}
      <video
        key={theme}
        id="heroVideo"
        autoPlay
        muted
        playsInline
        className="absolute hidden md:block top-0 left-0 w-full h-full object-cover"
      >
        <source src={theme == "light" ?  heroVideo : heroVideoDark } type="video/mp4" />

        Your browser does not support the video tag.
      </video>

      <section className="relative md:py-28 py-12 z-10 flex flex-col md:w-2/3 w-full">
        <h1 className="mb-6 text-4xl font-extralight font-inter leading-tight tracking-tighter text-black md:text-5xl">
          Discover and share your unique perspective with{" "}
          <Link to="/about-us">
          <span className="text-4xl md:text-5xl font-gelasio text-black underline decoration-logoGreen cursor-pointer">
            intelligent features
          </span>{" "}
          </Link>
          designed for modern storytellers.
        </h1>
        <p className="text-base leading-7 md:leading-9 text-black md:text-2xl">
        Capture your readers attention with AI-powered features and more.<br />
        Join us in unleashing the power of storytelling.
        </p>

        <div className="flex gap-4 mt-10">
          <Link to="/latest" className="">
            <button className="btn h-12 md:w-44 w-40 text-sm md:text-base">get started</button>
          </Link>

          <Link to="/about-us" className="">
            <button className="btn2 h-12 w-32 md:w-40 border border-black bg-black text-white text-sm md:text-base">know us</button>
          </Link>
        </div>
      </section>

      {isBannerVisible && (
        <div
          id="bottom-banner"
          tabIndex="-1"
          className="fixed bottom-0 start-0 z-50 flex justify-between w-full p-4 bg-logoGreen"
        >
          <div className="flex items-center mx-auto">
            <p className="flex items-center text-md font-normal text-gray-700">
              <span>
                <strong>New Feature Alert :</strong> AI-powered summaries and title suggestions—available now! 
                &nbsp;<Link to="/editor" className="text-gray-700 font-semibold underline">Explore</Link>
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleCloseBanner}
              className="flex-shrink-0 inline-flex justify-center w-6 h-6 items-center text-gray-700 rounded-full text-sm p-1.5"
            >
              <i className="fi fi-rr-cross-circle text-2xl hover:text-gray-700 hover:animate-bounce"></i>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
