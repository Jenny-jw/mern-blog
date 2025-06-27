import CommentBoard from "./CommentBoard";

const Footer = ({ className = "", children }) => {
  return (
    <div
      className={`w-full px-4 box-border flex flex-col md:flex-row bg-darkBg text-lightFooter dark:bg-darkText dark:text-darkBg ${className}`}
    >
      {children}
    </div>
  );
};

export default Footer;
