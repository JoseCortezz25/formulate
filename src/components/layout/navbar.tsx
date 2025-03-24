import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="px-5 py-5 flex justify-between items-center">
        <Link className="cursor-pointer" href="/"><span className="font-bold text-lg">Formulate</span></Link>
      </div>
    </header>
  );
};

export default Navbar;