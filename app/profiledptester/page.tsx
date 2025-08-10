'use client';
import { Button } from "@/components/ui/button";
import React, { useState, useCallback, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";

type CropArea = { x: number; y: number; width: number; height: number };

export default function ProfileDPTester() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [croppedImage, setCroppedImage] = useState<{ blob: Blob; url: string } | null>(null);
  const [borderRadius, setBorderRadius] = useState(50);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setCroppedImage(null);
  };

  const onCropComplete = useCallback((_: Area|null, areaPixels: CropArea) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CropArea,
    rotation = 0
  ): Promise<{ blob: Blob; url: string }> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    const size = Math.max(pixelCrop.width, pixelCrop.height);
    canvas.width = size;
    canvas.height = size;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      size,
      size
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Failed to create blob"));
        resolve({ blob, url: URL.createObjectURL(blob) });
      }, "image/png");
    });
  };

  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const { blob, url } = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      setCroppedImage({ blob, url });
    } catch (e) {
      console.error(e);
      alert("Could not crop the image.");
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const downloadCropped = () => {
    if (!croppedImage) return;
    const a = document.createElement("a");
    a.href = croppedImage.url;
    a.download = "profile-dp.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const clearAll = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setBorderRadius(50);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
    <main className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Profile DP Tester</h1>
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Left Side */}
        <div className="space-y-4">
          <input
            id="uploadbtn"
            className="hidden"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <Button
            className="w-full sm:w-auto"
            size="lg"
            onClick={() => inputRef.current?.click()}
            variant="outline"
          >
            Upload an Image
          </Button>

          {imageSrc ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="relative h-72 bg-muted">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="p-4 flex flex-col gap-4">
                <Slider label="Zoom" min={1} max={3} step={0.01} value={zoom} setValue={setZoom} />
                <Slider label="Rotate" min={0} max={360} step={1} value={rotation} setValue={setRotation} />
                <Slider label="Border Radius" min={0} max={50} step={1} value={borderRadius} setValue={setBorderRadius} />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={showCroppedImage} variant="default" size="sm">Generate Preview</Button>
                  <Button onClick={clearAll} variant="secondary" size="sm">Clear</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border p-6 text-sm text-center">
              Upload an image to start cropping.
            </div>
          )}
        </div>

        {/* Right Side */}
        <aside className="space-y-4">
          <h2 className="text-lg font-medium">Live previews</h2>
          <div className="flex flex-wrap gap-4 ">
            <PreviewImage src={croppedImage?.url ?? imageSrc} size={40} label="Small (40×40)" borderRadius={borderRadius} />
            <PreviewImage src={croppedImage?.url ?? imageSrc} size={96} label="Medium (96×96)" borderRadius={borderRadius} />
            <PreviewImage src={croppedImage?.url ?? imageSrc} size={200} label="Large (200×200)" borderRadius={borderRadius} />
          </div>
          {croppedImage && (
            <div>
                <hr className="my-5" />
              <img
                src={croppedImage.url}
                alt="Final cropped"
                style={{ borderRadius: `${borderRadius}%` }}
                className="w-40 h-40 object-cover"
              />
              <Button onClick={downloadCropped} className="mt-2 w-full sm:w-auto" size="sm">
                Download PNG
              </Button>
            </div>
          )}
        </aside>
      </section>
    </main>

    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        📸 Profile DP Tester Tool – Preview Your Perfect Profile Picture Online
      </h1>
      <p className="text-lg mb-6">
        Welcome to the <strong>Profile DP Tester Tool</strong> 🎯 – the easiest
        way to test, preview, and perfect your profile pictures before uploading
        them to your favorite platforms like Instagram, Facebook, LinkedIn,
        WhatsApp, Twitter (X), and more. Whether you want to see how your display
        picture (DP) will look in a circle, square, or custom radius, this tool
        is here to make your life easier.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        🌟 Why Use a Profile Picture Tester?
      </h2>
      <p className="mb-4">
        Your profile picture is the first impression people get of you online.
        On social media, job platforms, and messaging apps, your DP speaks
        volumes before you even say a word 💬. Using our{" "}
        <strong>profile DP preview tool</strong> ensures that your image is
        perfectly centered, cropped, and visually appealing no matter where you
        upload it.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        🖼 How to Use the DP Preview Tool
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Click on the &quot;Upload Image&quot; button 📤.</li>
        <li>Select the photo you want to test.</li>
        <li>
          Adjust the <strong>custom radius slider</strong> to preview different
          shapes – from sharp squares to smooth circles.
        </li>
        <li>Zoom and position the image as needed 🔍.</li>
        <li>
          Save your perfect DP or simply note the adjustments for your target
          platform.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        💡 Pro Tips for a Perfect Profile Photo
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Choose a high-resolution image 📷.</li>
        <li>Make sure your face is well-lit and clearly visible 🌞.</li>
        <li>Use a simple background to avoid distractions 🎯.</li>
        <li>
          Smile naturally or maintain a confident, professional expression 🙂
        </li>
        <li>
          Avoid heavy filters that distort colors or make the image unrealistic.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">🔍 SEO Keywords</h2>
      <p className="mb-4">
        profile picture tester, DP preview tool, display picture crop tool,
        social media DP viewer, WhatsApp profile photo preview, Instagram DP
        test, LinkedIn profile picture crop, Facebook DP size preview, Twitter X
        profile image tester, online profile picture tool, round DP preview
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">
        ❓ Frequently Asked Questions
      </h2>

      <h3 className="text-xl font-semibold mt-4">
        1️⃣ Can I use this tool for free?
      </h3>
      <p>
        Yes ✅ – the Profile DP Tester Tool is completely free to use without any
        signup required.
      </p>

      <h3 className="text-xl font-semibold mt-4">
        2️⃣ Will my images be saved?
      </h3>
      <p>
        No ❌ – all previews happen in your browser. We respect your privacy and
        do not store or upload your images to any server.
      </p>

      <h3 className="text-xl font-semibold mt-4">
        3️⃣ Can I set a custom radius for my DP?
      </h3>
      <p>
        Absolutely 🎯 – our tool lets you set any radius you like, from sharp
        corners to a full circle.
      </p>

      <h3 className="text-xl font-semibold mt-4">
        4️⃣ Which platforms does this tool support?
      </h3>
      <p>
        You can use it to preview DPs for Instagram, Facebook, WhatsApp,
        LinkedIn, Twitter (X), Telegram, and almost any platform with profile
        pictures.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">📢 Final Words</h2>
      <p className="mb-10">
        Whether you’re updating your professional headshot for LinkedIn, trying
        a fun new selfie for Instagram, or setting a fresh WhatsApp DP, our{" "}
        <strong>Profile DP Tester Tool</strong> ensures you always look your
        best online 🌍. Give it a try today and make your profile picture
        perfect!
      </p>
    </main>
    </>

  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  setValue,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
      <span className="shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="flex-1"
      />
    </label>
  );
}

function PreviewImage({
  src,
  size,
  label,
  borderRadius,
}: {
  src?: string | null;
  size: number;
  label?: string;
  borderRadius: number;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${borderRadius}%` }}
        className="overflow-hidden flex items-center justify-center border"
      >
        {src ? (
          <img src={src} alt={label || "Preview"} className="w-full h-full object-cover" />
        ) : (
          <div className="text-xs">No image</div>
        )}
      </div>
      {label && <div className="text-xs mt-1">{label}</div>}
    </div>
  );
}
