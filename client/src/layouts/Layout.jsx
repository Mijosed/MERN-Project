import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-grow">
        {children} {/* Ceci est l'emplacement pour le contenu de la page */}
      </div>
    </div>
  );
};

export default Layout;
