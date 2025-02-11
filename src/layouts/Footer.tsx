const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex w-full justify-center bg-[#FFFFFFB2] ~py-[2.625rem]/[4.5rem]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm/6 font-semibold text-gray-900">Company Name</p>
        </div>
        <p className="text-xs/6 text-gray-500">© {currentYear} Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
