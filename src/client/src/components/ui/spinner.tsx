import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
    );
};

export { Spinner };
