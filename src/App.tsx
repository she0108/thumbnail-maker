import { useState } from "react";
import "./App.css";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Checkbox } from "./components/ui/checkbox";

function App() {
  const [isSubtitle, setIsSubtitle] = useState<boolean | "indeterminate">(true);
  const [titleSize, setTitleSize] = useState<number>(32);
  const [subtitleSize, setSubtitleSize] = useState<number>(24);
  const [titleColor, setTitleColor] = useState<string>("#000000");
  const [subtitleColor, setSubtitleColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");

  return (
    <div className="grid grid-cols-3 grid-rows-1 w-dvw h-screen border">
      <div
        className="col-span-2 w-[640px] h-[360px] m-auto border flex flex-col justify-center items-center"
        style={{ backgroundColor: bgColor }}
      >
        <input
          className="w-full font-bold text-center focus:outline-none mb-2 bg-transparent"
          placeholder="Title"
          style={{ fontSize: `${titleSize}px`, color: titleColor }}
        />
        {isSubtitle && (
          <input
            className="w-full font-normal text-center focus:outline-none bg-transparent"
            placeholder="Subtitle"
            style={{ fontSize: `${subtitleSize}px`, color: subtitleColor }}
          />
        )}
      </div>
      <div className="m-16 p-10 border-2 border-neutral-200 rounded-xl bg-neutral-200/40">
        <h3 className="text-lg font-semibold">Title</h3>
        <div className="flex">
          <Label>size</Label>
          <Slider
            value={[titleSize]}
            onValueChange={(value) => setTitleSize(value[0])}
            defaultValue={[24]}
            max={64}
            min={16}
            step={1}
          />
        </div>
        <div>
          <Label>font</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="sans serif" />
            </SelectTrigger>
          </Select>
        </div>
        <div className="flex">
          <h3 className="text-lg font-semibold">Subtitle</h3>
          <Checkbox
            defaultChecked={true}
            checked={isSubtitle}
            onCheckedChange={(value) => setIsSubtitle(value)}
          />
        </div>
        <div className="flex">
          <Label>size</Label>
          <Slider
            value={[subtitleSize]}
            onValueChange={(value) => setSubtitleSize(value[0])}
            defaultValue={[32]}
            max={64}
            min={16}
            step={1}
          />
        </div>
        <h3 className="text-lg font-semibold">Color</h3>
        <div>
          <Label>Title</Label>
          <input
            type="color"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <input
            type="color"
            value={subtitleColor}
            onChange={(e) => setSubtitleColor(e.target.value)}
          />
        </div>
        <div>
          <Label>Background</Label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

// 색상팔레트, 제목 글꼴, 소제목 글꼴, 소제목 유무, 글씨 크기, 이미지 삽입
