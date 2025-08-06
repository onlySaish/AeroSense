import { useEffect } from 'react';
import { hidePopup, selectPopup } from './auth/authSlice.js';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import type { PopupState } from './auth/authTypes.js';
import type { Popup } from './dashboard/dashboardTypes.js';
import { hidePopup2, selectPopup2 } from './dashboard/components/Profile/profileSlice.js';

const PopupBar = () => {
  const dispatch = useAppDispatch();
  const authPopup = useAppSelector(selectPopup);
  const profilePopup = useAppSelector(selectPopup2);

  const popup: PopupState | Popup | null = authPopup.visible ? authPopup : profilePopup.visible ? profilePopup : null;

  useEffect(() => {
    if (popup && popup.visible) {
      const timer = setTimeout(() => {
        popup === authPopup ? dispatch(hidePopup()) : dispatch(hidePopup2());
      }, popup.duration);

      return () => clearTimeout(timer);
    }
  }, [popup, dispatch]);

  if (!popup || !popup.visible) return null;

  type PopupType = {
    success: string;
    error: string;
  };

  const popupStyles: PopupType = {
    success: 'bg-gray-900 border-blue-300 text-white',
    error: 'bg-gray-900 border-blue-300 text-white',
  };

  return (
    <div
      className={`fixed top-10 z-50 right-10 w-80 p-4 border rounded-lg shadow-lg flex items-center ${
        popupStyles[popup.type]
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`text-xl ${popup.type === 'success' ? 'text-green-500' : 'text-red-600'}`}>
          {popup.type === 'success' ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <i className="fas fa-exclamation-circle"></i>
          )}
        </div>
        <div className="flex-grow">
          <p className="font-semibold">{popup.message}</p>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 ${
          popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{
          animation: `popupBar ${popup.duration}ms linear`,
        }}
      ></div>
      <style>{`   
        @keyframes popupBar {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
      {/* there was jsx written after style opening */}
    </div>
  );
};

export default PopupBar;
