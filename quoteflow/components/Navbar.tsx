import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <p className="italic font-bold">QuoteFlow</p>
        </Link>
        <p>Login</p>
      </nav>
    </header>
  );
};

export default Navbar;
