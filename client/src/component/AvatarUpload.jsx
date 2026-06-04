import { useState } from "react";
import axios from "axios";
import AvatarCropModal from "./AvatarCropModal";
import getCroppedImg from "../utils/cropImage";
import defaultAvatar from "../assets/icon.png"
import { FaCamera } from "react-icons/fa";

function AvatarUpload({ currentAvatar, onSuccess }) {
    const [showCrop, setShowCrop] = useState(false);
const [zoom, setZoom] = useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] =
  useState(null);
const [imageSrc, setImageSrc] = useState(null);

const [crop, setCrop] = useState({
  x: 0,
  y: 0,
});
const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {

    if (!file) return;

    try {

      setUploading(true);

      const formData = new FormData();

  formData.append(
  "avatar",
  file
);

      await axios.post(
        "http://localhost:5000/api/user/avatar",
        formData,
        {
          withCredentials: true,
        }
      );

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      console.log(err);

    } finally {

      setUploading(false);

    }

  };
const handleCropSave =
  async () => {

    const croppedFile =
      await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );

    setPreview(
      URL.createObjectURL(
        croppedFile
      )
    );

    setAvatar(
      croppedFile
    );
handleUpload(croppedFile);
    setShowCrop(false);

};
  return (

    <div className="flex flex-col items-center gap-3">

   <div className="relative">

<div className="relative">

  <div className="avatar">

    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
{
  uploading && (
    <div
      className="
        absolute
        inset-0
        z-10
        flex
        items-center
        justify-center
        bg-black/40
        rounded-full
      "
    >
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  )
}
      <img
        src={
          preview ||
          currentAvatar ||
          defaultAvatar
        }
        alt="avatar"
      />

    </div>

  </div>

<label
  htmlFor="avatar-upload"
  className="
    btn
    btn-circle
    btn-sm
    absolute
    bottom-0
    right-0
    bg-white
    text-gray-700
    border
    shadow-md
  "
>
  <FaCamera size={14} />
</label>

  <input
    type="file"
    id="avatar-upload"
    className="hidden"
 onChange={(e) => {

  const file = e.target.files[0];

  if (!file) return;

  const imageUrl =
    URL.createObjectURL(file);

  setAvatar(file);

  setImageSrc(imageUrl);

  setShowCrop(true);

}}
  />

</div>


</div>

{
  showCrop && (

<AvatarCropModal
  imageSrc={imageSrc}
  crop={crop}
  zoom={zoom}
  setCrop={setCrop}
  setZoom={setZoom}
  setCroppedAreaPixels={
    setCroppedAreaPixels
  }
  onClose={() => setShowCrop(false)}
  onSave={handleCropSave}
/>

  )
}


    </div>

 

);

}

export default AvatarUpload;