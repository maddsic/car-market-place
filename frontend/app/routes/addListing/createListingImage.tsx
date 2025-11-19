import { useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import Heading from "~/components/Heading/heading";

const UploadListingImage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    setSelectedFiles(files);
    console.log("Selected File", files);
  };

  return (
    <div className="upload relative flex flex-col gap-5 pt-5 md:py-10">
      {/* <Heading title="upload photo" classNames="lg:text-md uppercase" /> */}
      <div className="flex flex-col gap-3">
        <Heading
          title="UPLOAD IMAGE"
          classNames="uppercase text-base font-extrabold lg:text-md"
        />
        <Heading
          title="recommendation and guides"
          classNames="lg:text-base xl:text-sm text-xs uppercase"
        />
        <span className="space-y-2">
          <p className="gray__text-soft font-body block">
            Recommended image resolution: 800 x 470 px or higher.
          </p>
          <p className="gray__text-soft font-body">
            User can upload upto 5 photos, but dealer can upload up to 10.
          </p>
        </span>
      </div>

      <div className="group flex items-center justify-center pt-5 md:w-1/3 lg:w-1/4">
        <label htmlFor="imageUrl" className="upload_label">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <MdOutlineCameraAlt size={50} className="gray__text-soft" />
            {selectedFiles.length > 0 ? (
              <ul>
                {selectedFiles.map((file, i) => (
                  <li key={i} className="text-sm font-bold">
                    {file.name}
                  </li>
                ))}
              </ul>
            ) : (
              <span className={"block text-center"}>
                <p className="gray__text-soft py-2 text-sm font-extrabold group-hover:text-yellow">
                  Upload image
                </p>
                <p className="gray__text-soft text-xs dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </span>
            )}
            <input
              type="file"
              name="imageUrl"
              id="imageUrl"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadListingImage;
