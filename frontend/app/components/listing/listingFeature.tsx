interface ListingFeatureProps {
  feature: string;
  name: string;
}

const ListingFeature: React.FC<ListingFeatureProps> = ({ feature, name }) => {
  return (
    <span className="flex items-center gap-1">
      <input type="checkbox" className="text-xs" name={name} id={name} />
      <label
        htmlFor={name}
        id={name}
        className="font-body gray__text-soft cursor-pointer capitalize tracking-wide"
      >
        {feature}
      </label>
    </span>
  );
};

export default ListingFeature;
