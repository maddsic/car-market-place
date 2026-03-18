import Heading from "~/components/Heading/heading";
import ListingFeature from "~/components/listing/listingFeature";


const SelectListingFeature = ({ initialData }) => {
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
            <ListingFeature name="air_condition" feature="A/C: Front" defaultChecked={Boolean(initialData?.air_condition)} />
            <ListingFeature name="backup_camera" feature="backup camera"
              defaultChecked={Boolean(initialData?.backup_camera || "")}
            />
            <ListingFeature name="cruis_control" feature="cruise control"
              defaultChecked={Boolean(initialData?.cruis_control || "")}

            />
            <ListingFeature name="navigation" feature="navigation"
              defaultChecked={Boolean(initialData?.navigation || "")}

            />
          </div>
        </div>
        {/* SECOND COLUMN - ENTERTAINMENT */}
        <div className="">
          <p className="pb-2 font-bold capitalize md:pb-3">entertainment</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="bluetooth" feature="mp3 player"
              defaultChecked={Boolean(initialData?.bluetooth || "")}

            />
            <ListingFeature name="audio" feature="premium audio"
              defaultChecked={Boolean(initialData?.audio || "")}

            />
            <ListingFeature name="stereo" feature="am/fm stereo"
              defaultChecked={Boolean(initialData?.stereo || "")}

            />
            <ListingFeature name="dvd" feature="dvd systems"
              defaultChecked={Boolean(initialData?.dvd || "")}

            />
          </div>
        </div>
        {/* THIRD COLUMN - SAFETY */}
        <div className="" >
          <p className="pb-2 font-bold capitalize md:pb-3">safety</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="airbag_driver" feature="airbag: driver"
              defaultChecked={Boolean(initialData?.airbag_driver || "")}

            />
            <ListingFeature
              name="airbag_passenger"
              feature="airbag: passenger"
              defaultChecked={Boolean(initialData?.airbag_passenger || "")}

            />
            <ListingFeature name="security_system" feature="security systems"
              defaultChecked={Boolean(initialData?.security_system || "")}

            />
            <ListingFeature name="antilock" feature="antilock breaks"
              defaultChecked={Boolean(initialData?.antilock || "")}

            />
          </div>
        </div>
        {/* FORTH COLUMN  - SEATS*/}
        <div className="" >
          <p className="pb-2 font-bold capitalize md:pb-3">seat</p>
          <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 2xl:gap-4">
            <ListingFeature name="heated_seat" feature="heated seat"
              defaultChecked={Boolean(initialData?.heated_seat || "")}

            />
            <ListingFeature name="power_seat" feature="power seat"
              defaultChecked={Boolean(initialData?.power_seat || "")}

            />
            <ListingFeature name="bucket_seat" feature="bucket seat"
              defaultChecked={Boolean(initialData?.bucket_seat || "")}

            />
            <ListingFeature name="leather_seat" feature="leather seat"
              defaultChecked={Boolean(initialData?.leater_seat || "")}

            />
          </div>
        </div>
      </div >
    </div >
  );
};

export default SelectListingFeature;
