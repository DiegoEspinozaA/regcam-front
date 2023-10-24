
import Scrollbar from 'smooth-scrollbar';
import { useEffect, useState } from 'react';
import { GoX } from 'react-icons/go';

export default function OverlayEdit({ id, onClose }) {

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const openOverlay = () => {
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        const scrollbarContainer = document.querySelector('.scrollbar-container');
        const scrollbar = Scrollbar.init(scrollbarContainer);

        return () => {
            scrollbar.destroy();
        };
    }, []);

    return (
        <>
            <div
                className={`p-10 text-black fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ backdropFilter: 'blur(40px)' }}
            >
                <div className="absolute inset-0 bg-black opacity-60 "></div>
                <div className="bg-background-color rounded-lg p-10 w-[80%] relative z-10 text-sm ">
                    <div className="relative mb-4">
                        <div className="mb-10 text-center justify-center">
                            <div>
                                <h2 className="text-xl font-bold mb-2"> Registro ID: {id}</h2>
                            </div>
                            <div className='flex align-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor" />
                                </svg>
                                <p className='ml-2'>{locacion}</p>

                            </div>
                        </div>
                        <div className="overflow-y-auto min-h-[600px] max-h-[600px] scrollbar-container bg-white ">

                        </div>
                    </div>
                </div>

                <button
                    onClick={handleOverlayClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
                >
                    <GoX size={25} />
                </button>
            </div>

        </>
    );
}