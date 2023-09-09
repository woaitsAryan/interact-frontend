import React from 'react';
import Link from 'next/link';

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown = ({ setShow }: Props) => {
  const handleLogout = () => {};
  return (
    <>
      <div className="w-72 text-white font-primary max-md:w-full max-h-[480px] max-md:max-h-none overflow-y-auto fixed top-[72px] max-md:top-navbar right-4 max-md:right-0 rounded-2xl max-md:rounded-none backdrop-blur-lg backdrop p-2 z-50 animate-fade_third">
        <Link
          href={'/profile'}
          className="w-full flex-center py-4 rounded-lg cursor-pointer transition-ease-200 hover:bg-[#52525246]"
        >
          Profile
        </Link>
        <Link
          href={'/settings'}
          className="w-full flex-center py-4 rounded-lg cursor-pointer transition-ease-200 hover:bg-[#52525246]"
        >
          Settings
        </Link>
        <div
          onClick={handleLogout}
          className="w-full flex-center py-4 rounded-lg cursor-pointer transition-ease-200 hover:bg-[#52525246]"
        >
          Log Out
        </div>
      </div>
      <div
        onClick={() => setShow(false)}
        className="backdrop-brightness-75 w-screen h-screen fixed top-0 left-0 z-30 animate-fade_third"
      ></div>
    </>
  );
};

export default ProfileDropdown;
