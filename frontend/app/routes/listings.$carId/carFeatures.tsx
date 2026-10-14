import SubHeading from "~/components/Heading/subheading";
import { ListingFeatures } from "~/components/listing";
import { Car } from "~/interfaces";

export const ViewListingCarFeatures = ({ car }: { car: Car }) => {
  return (
    <div className="relative my-4">
      <SubHeading title="features" />
      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">
        <div className="">
          <h4 className="font-bold capitalize">Comfort</h4>

          <ListingFeatures text="A/C: Front" value={car?.air_condition || false} />
          <ListingFeatures text="backup camera" value={car?.backup_camera || false} />
          <ListingFeatures text="cruise control" value={car?.cruis_control || false} />
          <ListingFeatures text="navigation" value={car?.navigation || false} />
        </div>
        <div className="">
          <h2 className="font-bold capitalize">entertainment</h2>
          <ListingFeatures text="MP3 player" value={car?.bluetooth || false} />
          <ListingFeatures text="premium audio" value={car?.audio || false} />
          <ListingFeatures text="am/fm stereo" value={car?.stereo || false} />
          <ListingFeatures text="DVD systems" value={car?.dvd || false} />
        </div>
        <div className="">
          <h2 className="font-bold capitalize">safety</h2>
          <ListingFeatures text="Airbag: Driver" value={car?.airbag_driver || false} />
          <ListingFeatures text="Airbag: passenger" value={car?.airbag_passenger || false} />
          <ListingFeatures text="security system" value={car?.security_system || false} />
          <ListingFeatures text="antilock breaks" value={car?.antilock || false} />
        </div>
        <div className="">
          <h2 className="font-bold capitalize">seats</h2>
          <ListingFeatures text="Heated seats" value={car?.heated_seat || false} />
          <ListingFeatures text="power seats" value={car?.power_seat || false} />
          <ListingFeatures text="bucket seats" value={car?.bucket_seat || false} />
          <ListingFeatures text="leather seats" value={car?.leather_seat || false} />
        </div>
      </div>
    </div>
  );
};
