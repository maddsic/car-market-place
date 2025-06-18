import Heading from "~/components/Heading/heading";
import ListingFeature from "~/components/listing/listingFeature";

const SelectListingFeature = () => {
  return (
    <div className="listing__features relative w-full pt-5 md:py-10 lg:w-3/4">
      <Heading
        title="SELECT LISTING FEATURES"
        classNames="uppercase text-base font-extrabold lg:text-md"
      />
      <div className="grid grid-cols-2 gap-5 pt-3 lg:grid-cols-4">
        {/* FIRST COLUMN - COMFORT */}
        <div className="">
          <p className="pb-2 font-bold capitalize md:pb-3 lg:pb-4">Comfort</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="air_condition" feature="A/C: Front" />
            <ListingFeature name="backup_camera" feature="backup camera" />
            <ListingFeature name="cruis_control" feature="cruise control" />
            <ListingFeature name="navigation" feature="navigation" />
          </div>
        </div>
        {/* SECOND COLUMN - ENTERTAINMENT */}
        <div className="">
          <p className="pb-2 font-bold capitalize md:pb-3">entertainment</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="bluetooth" feature="mp3 player" />
            <ListingFeature name="audio" feature="premium audio" />
            <ListingFeature name="stereo" feature="am/fm stereo" />
            <ListingFeature name="dvd" feature="dvd systems" />
          </div>
        </div>
        {/* THIRD COLUMN - SAFETY */}
        <div className="">
          <p className="pb-2 font-bold capitalize md:pb-3">safety</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="airbag_driver" feature="airbag: driver" />
            <ListingFeature
              name="airbag_passenger"
              feature="airbag: passenger"
            />
            <ListingFeature name="security_system" feature="security systems" />
            <ListingFeature name="antilock" feature="antilock breaks" />
          </div>
        </div>
        {/* FORTH COLUMN  - SEATS*/}
        <div className="">
          <p className="pb-2 font-bold capitalize md:pb-3">seat</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="heated_seat" feature="heated seat" />
            <ListingFeature name="power_seat" feature="power seat" />
            <ListingFeature name="bucket_seat" feature="bucket seat" />
            <ListingFeature name="leater_seat" feature="leather seat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectListingFeature;
