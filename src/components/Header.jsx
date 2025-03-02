import Navbar from "./Navbar";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-row items-center md:w-1/3s">
        <img
          src="/building-svgrepo-com.svg"
          alt="Real Estate Logo"
          className="w-10 h-10 md:w-15 md:h-15 ml-4 z-10"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-white p-5 z-10">
          Real Estate Calculator
        </h1>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
