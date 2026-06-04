import Cropper from "react-easy-crop";

function AvatarCropModal({
  imageSrc,
  crop,
  zoom,
  setCrop,
  setZoom,
  setCroppedAreaPixels,
  onClose,
  onSave
}) {

  return (

    <div className="fixed inset-0 bg-black/70 z-50">

      <div className="relative w-full h-full">

   <Cropper
  image={imageSrc}
  crop={crop}
  zoom={zoom}
  aspect={1}
  cropShape="round"
  showGrid={false}
  onCropChange={setCrop}
  onZoomChange={setZoom}
  onCropComplete={(
    croppedArea,
    croppedAreaPixels
  ) => {
    setCroppedAreaPixels(
      croppedAreaPixels
    );
  }}
/>
<div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-80 z-50">

  <input
    type="range"
    min={1}
    max={3}
    step={0.1}
    value={zoom}
    onChange={(e) =>
      setZoom(Number(e.target.value))
    }
    className="range"
  />

</div>
<button
  className="
    btn
    btn-primary
    absolute
    bottom-8
    right-8
    z-50
  "
  onClick={onSave}
>
  Save
</button>
<button
  className="btn btn-error absolute bottom-8 left-8 z-50"
  onClick={onClose}
>
  Cancel
</button>
      </div>

    </div>

  );

}

export default AvatarCropModal;