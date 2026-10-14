import { ReactNode } from "react";

interface ContactProps {
  text: string;
  icon?: ReactNode;
  className?: string;
  href?: string;
}

export const Contact = ({ text, icon, className = "", href }: ContactProps) => {
  const content = (
    <>
      {icon && (
        <span className="flex items-center justify-center rounded-full bg-primary/10 p-2">
          {icon}
        </span>
      )}
      <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">
        {text}
      </span>
    </>
  );

  const baseStyle = `flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow transition hover:bg-gray-100 ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseStyle}>
        {content}
      </a>
    );
  }

  return <div className={baseStyle}>{content}</div>;
};

export default Contact;
