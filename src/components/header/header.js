import Link from 'next/link';
import Image from 'next/image';
import AddButton from "../addbutton/addbutton.js";

const Header = () => (
  <header className="text-white w-full my-header">
    <div className="max-w-[1670px] mx-auto pb-8 pt-12 flex justify-between items-center">
        <Link href="/" className="ml-8">
          <Image src="/ICON.svg" alt="Logo" width={70} height={72} />
        </Link>
      <nav className="mr-36">
        <AddButton />
      </nav>
    </div>
  </header>
);

export default Header;