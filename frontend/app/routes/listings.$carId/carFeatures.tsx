import SubHeading from "~/components/Heading/subheading";
import { ListingFeatures } from "~/components/listing";

export const ViewListingCarFeatures = ({}) => {
  return (
    <div className="relative my-4">
      <SubHeading title="features" />
      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">
        <div className="">
          <h4 className="font-bold capitalize">Comfort</h4>

          <ListingFeatures text="A/C: Front" />
          <ListingFeatures text="backup camera" />
          <ListingFeatures text="cruise control" />
          <ListingFeatures text="navigation" />
        </div>
        <div className="">
          <h2 className="font-bold capitalize">entertainment</h2>
          <ListingFeatures text="MP3 player" />
          <ListingFeatures text="premium audio" />
          <ListingFeatures text="am/fm stereo" />
          <ListingFeatures text="DVD systems" />
        </div>
        <div className="">
          <h2 className="font-bold capitalize">safety</h2>
          <ListingFeatures text="Airbag: Driver" />
          <ListingFeatures text="Airbag: passenger" />
          <ListingFeatures text="security system" />
          <ListingFeatures text="antilock breaks" />
        </div>
        <div className="">
          <h2 className="font-bold capitalize">seats</h2>
          <ListingFeatures text="Heated seats" />
          <ListingFeatures text="power seats" />
          <ListingFeatures text="bucket seats" />
          <ListingFeatures text="leather seats" />
        </div>
      </div>
    </div>
  );
};
