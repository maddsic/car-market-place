import { useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import Heading from "~/components/Heading/heading";

interface UploadListingImageProps {
  initialImages: { imageUrl: string }[]
}

const UploadListingImage = ({ initialImages }: UploadListingImageProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    setSelectedFiles(files);
    console.log("Selected File", files);
  };

  // Get Original File Name
  const getFileName = (url: string) => {
    return url.split("/").pop() || "Existing Image"
  }

  const hasNewFiles = selectedFiles.length > 0;
  const hasExistingData = initialImages && initialImages.length > 0;

  console.log("hasExistingData", hasExistingData)
  console.log("hasNewFiles", hasNewFiles)

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
            You can upload upto 5 photos.
          </p>
        </span>
      </div>

      <div className="group flex items-center justify-center pt-5 md:w-1/3 lg:w-1/4">
        <label htmlFor="imageUrl" className="upload_label">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <MdOutlineCameraAlt size={50} className="gray__text-soft" />
            {hasNewFiles ? (
              <ul>
                {selectedFiles.map((file, i) => (
                  <li key={i} className="text-sm font-bold">
                    {file.name}
                  </li>
                ))}
              </ul>
            ) : hasExistingData ? (
              /* 2. Show existing filenames from your DB object */
              <ul className="space-y-1">
                {initialImages.map((img, i) => (
                  <li key={i} className="text-xs font-medium text-gray-500 truncate max-w-[150px]">
                    {getFileName(img.imageUrl)}
                  </li>
                ))}
                <p className="text-[10px] text-yellow-600 mt-2 uppercase font-bold">
                  Click to replace current photos
                </p>
              </ul>
            ) : (
              /* 3. Default empty state */
              <>
                <p className="text-gray-500 py-2 text-sm font-extrabold group-hover:text-yellow-500">
                  Upload image
                </p>
                <p className="text-gray-400 text-xs">
                  SVG, PNG, JPG or GIF
                </p>
              </>
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

