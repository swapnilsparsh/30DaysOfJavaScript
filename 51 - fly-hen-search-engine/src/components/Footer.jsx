import React from 'react';

const year = new Date();
export const Footer = () => (
  <div className="text-center p-10 mt-10 border-t dark:border-gray-700 border-gray-200 ">
    © {year.getFullYear()} Goggl Inc.
  </div>
);
