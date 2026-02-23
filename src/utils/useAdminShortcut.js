import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminShortcut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let keys = [];
    
    const handleKeyPress = (e) => {
      keys.push(e.key);
      
      // Keep only last 5 keys
      if (keys.length > 5) {
        keys.shift();
      }
      
      // Secret code: "admin" (type a-d-m-i-n)
      if (keys.join('') === 'admin') {
        navigate('/admin/login');
        keys = []; // Reset
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);
};