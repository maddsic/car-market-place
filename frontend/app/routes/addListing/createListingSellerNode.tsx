import React, { useEffect, useMemo, useRef, useState } from "react";
import Heading from "~/components/Heading/heading";
import "react-quill/dist/quill.snow.css";
import { LinksFunction } from "@remix-run/node";

let ReactQuill: any = null;

const CreateListingSellerNote = () => {
  const [editorLoaded, setEditorLoaded] = useState<Boolean>(false);
  const [content, setContent] = useState<any>("");
  const quillRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const { default: RQ } = await import("react-quill");
        ReactQuill = RQ;
        setEditorLoaded(true);
      }
    })();
  }, []);

  // Rich text Editor style options.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [],
  );

  // Rich text editor formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];
  return (
    <div className="mb-10 flex w-full flex-col gap-5 pt-5 md:py-10 lg:w-2/3">
      <Heading
        title="ENTER SELLER'S NOTE"
        classNames="uppercase text-base font-extrabold lg:text-md"
      />

      <div className="">
        {editorLoaded && (
          <ReactQuill
            ref={quillRef}
            name="seller_note"
            theme="snow"
            value={quillRef.current}
            modules={modules}
            formats={formats}
            // onChange={() => setContent(content)}
            className="h-48 border-gray-300 md:h-60"
          />
        )}
      </div>
    </div>
  );
};

export default CreateListingSellerNote;

export const lisks: LinksFunction = () => [
  { rel: "stylesheet", href: "react-quill/dist/quill.snow.css" },
];
