import { useRef, useState } from "react";
import "./font.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Checkbox } from "./components/ui/checkbox";
import * as htmlToImage from "html-to-image";
import { SelectPortal } from "@radix-ui/react-select";
import { Button } from "./components/ui/button";
import Draggable from "./components/Draggable";
import { Input } from "./components/ui/input";
import SelectFont from "./components/SelectFont";
import TitleInput from "./components/TitleInput";
import Thumbnail from "./components/Thumbnail";

function App() {
  const imageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLAnchorElement>(null);

  const [isSubtitle, setIsSubtitle] = useState<boolean | "indeterminate">(true);

  const [titleSize, setTitleSize] = useState<number>(64);
  const [titleFont, setTitleFont] = useState<string>("SBAggroB");
  const [titleColor, setTitleColor] = useState<string>("#000000");

  const [subtitleSize, setSubtitleSize] = useState<number>(32);
  const [subtitleFont, setSubtitleFont] = useState<string>("SBAggroB");
  const [subtitleColor, setSubtitleColor] = useState<string>("#000000");

  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [images, setImages] = useState<
    { id: number; element: React.ReactElement }[]
  >([]);

  const [imageType, setImageType] = useState<string>("png");
  const [imageRatio, setImageRatio] = useState<string>("16/9");

  const handleClickExport = async () => {
    console.log(imageType);
    if (imageRef.current && exportRef.current) {
      let imageUrl;
      switch (imageType) {
        case "jpeg":
          imageUrl = await htmlToImage.toJpeg(imageRef.current);
          break;
        case "svg":
          imageUrl = await htmlToImage.toSvg(imageRef.current);
          break;
        case "png":
        default:
          imageUrl = await htmlToImage.toPng(imageRef.current);
      }
      exportRef.current.href = imageUrl;
      exportRef.current.download = `thumbnail${Date.now()}.${imageType}`;
      exportRef.current.click();
    }
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFile = e.target.files[0];
    const id = Date.now();
    const newImages = [
      ...images,
      {
        id,
        element: (
          <Draggable
            key={id}
            image={newFile}
            onDelete={() => handleDeleteImage(id)}
          />
        ),
      },
    ];
    setImages(newImages);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteImage = (id: number) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div className="grid grid-cols-3 grid-rows-1 divide-x-2 w-dvw h-dvh bg-neutral-100">
      <Thumbnail ref={imageRef} bgColor={bgColor} ratio={imageRatio}>
        <TitleInput
          placeholder="Title"
          size={titleSize}
          font={titleFont}
          color={titleColor}
        />
        {isSubtitle && (
          <TitleInput
            placeholder="Subtitle"
            size={subtitleSize}
            font={subtitleFont}
            color={subtitleColor}
          />
        )}
        {images.map((image) => image.element)}
      </Thumbnail>
      <div className="p-10 bg-white flex flex-col">
        <div className="flex flex-col gap-2 mb-8">
          <h3 className="text-xl font-semibold">제목</h3>
          <div className="flex flex-row items-center">
            <label className="text-base font-medium w-16">크기</label>
            <Slider
              value={[titleSize]}
              onValueChange={(value) => setTitleSize(value[0])}
              max={128}
              min={16}
              step={1}
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="text-base font-medium w-16">글꼴</label>
            <SelectFont value={titleFont} onValueChange={setTitleFont} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex flex-row gap-2 items-center">
            <h3 className="text-xl font-semibold">소제목</h3>
            <Checkbox
              defaultChecked={true}
              checked={isSubtitle}
              onCheckedChange={(value) => setIsSubtitle(value)}
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="text-base font-medium w-16">크기</label>
            <Slider
              value={[subtitleSize]}
              onValueChange={(value) => setSubtitleSize(value[0])}
              max={128}
              min={16}
              step={1}
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="text-base font-medium w-16">글꼴</label>
            <SelectFont value={subtitleFont} onValueChange={setSubtitleFont} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <h3 className="text-xl font-semibold">색상</h3>
          <div className="grid grid-cols-3 p-2 rounded bg-neutral-100">
            <input
              type="color"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="block w-full h-8 p-0 bg-inherit"
            />
            <input
              type="color"
              value={subtitleColor}
              onChange={(e) => setSubtitleColor(e.target.value)}
              className="block w-full h-8 p-0 bg-inherit"
            />
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="block w-full h-8 p-0 bg-inherit"
            />
            <div className="text-center text-sm font-medium">제목</div>
            <div className="text-center text-sm font-medium">소제목</div>
            <div className="text-center text-sm font-medium">배경</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <label className="text-xl font-semibold">이미지</label>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onInput={handleSelectImage}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-row gap-2 mt-auto">
          <Select value={imageType} onValueChange={setImageType}>
            <SelectTrigger>
              <SelectValue placeholder="select image type" />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
              </SelectContent>
            </SelectPortal>
          </Select>
          <Select value={imageRatio} onValueChange={setImageRatio}>
            <SelectTrigger>
              <SelectValue placeholder="16 : 9" />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent>
                <SelectItem value="16/9">16 : 9</SelectItem>
                <SelectItem value="1/1">1 : 1</SelectItem>
              </SelectContent>
            </SelectPortal>
          </Select>
          <Button onClick={handleClickExport} className="ml-2">
            저장
          </Button>
          <a ref={exportRef} hidden></a>
        </div>
      </div>
    </div>
  );
}

export default App;
