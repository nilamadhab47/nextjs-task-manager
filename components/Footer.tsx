import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className='flex justify-center items-center gap-5 py-3'>
      <a href='#'>
        <i className='fa-brands fa-instagram duration-300 hover:opacity-30 cursor-pointer'></i>
      </a>
      <i className='fa-brands fa-linkedin duration-300 hover:opacity-30 cursor-pointer'></i>
      <i className='fa-brands fa-github-alt duration-300 hover:opacity-30 cursor-pointer'></i>
    </div>
  );
};

export default Footer;
