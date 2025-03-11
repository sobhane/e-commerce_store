import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 border-t text-center">
      <div className="p-5 flex-center">
        {APP_NAME} &copy; {currentYear}. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
