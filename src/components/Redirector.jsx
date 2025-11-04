import { useLocation } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import redirectorService from '../services/redirector-service'; // Assuming you have a service for redirects
import { useEffect, useState } from 'react';

function Redirector() {
  const location = useLocation();
  const path = location.pathname;
  const [toPath, setToPath] = useState(null);
  
  useEffect(() => {
    redirectorService.getRedirectUrl(path).then(setToPath);
  }, [path]);
  
//   const urlMap = {
//     "/get/manas": "https://amazon.in/manas",
//     "/resume": "https://tiny.cc/vdm-doc",
//     "/youtube": "https://youtube.com/@vivek-epic-echoes",
//     "/instagram": "https://instagram.com/vivekduttamishra"
//   };

  if(toPath===null) 
    return "";

  if (toPath) {
    window.location.href = toPath;
    return null;
  }

  return <NotFoundPage />;
}

export default Redirector;