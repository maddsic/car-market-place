interface IconFieldProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  label: string;
}

const IconField: React.FC<IconFieldProps> = ({ icon, children, label }) => {
  return (
    <div className="group relative grid grid-cols-12">
      <div className="relative col-span-4 flex items-center gap-2">
        <span>{icon}</span>
        <span className="gray__text-medium font-body capitalize">{label}</span>
      </div>
      <div className="input__bg col-span-8 capitalize">{children}</div>
    </div>
  );
};

export default IconField;
