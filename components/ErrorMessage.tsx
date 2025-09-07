import React from 'react';

interface ErrorMessageProps {
  message: string;
  title: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg relative my-4 rtl:border-r-4 rtl:border-l-0" role="alert">
      <strong className="font-bold">{title} </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;