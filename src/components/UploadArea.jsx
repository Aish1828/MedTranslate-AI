import { useDropzone } from "react-dropzone";

export default function UploadArea({ onFileUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (files) => {
      onFileUpload(files[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-300 p-8 rounded-xl text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drop PDF or Image Here</p>
    </div>
  );
}