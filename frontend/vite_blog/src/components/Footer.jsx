const Footer = ({ className = "", children }) => {
  return (
    <div
      className={`w-full p-8 box-border flex flex-col md:flex-row bg-darkBg text-lightAccent dark:bg-darkText/85 dark:text-darkBg ${className}`}
    >
      {children}
    </div>
  );
};

export default Footer;
