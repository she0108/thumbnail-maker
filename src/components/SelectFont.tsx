import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { SelectPortal } from "@radix-ui/react-select";

interface SelectFontProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SelectFont({ value, onValueChange }: SelectFontProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectItem
            value="Pretendard-Regular"
            style={{ fontFamily: "Pretendard-Regular" }}
          >
            프리텐다드 Regular
          </SelectItem>
          <SelectItem
            value="Pretendard-Bold"
            style={{ fontFamily: "Pretendard-Bold" }}
          >
            프리텐다드 Bold
          </SelectItem>
          <SelectItem
            value="Pretendard-Black"
            style={{ fontFamily: "Pretendard-Black" }}
          >
            프리텐다드 Black
          </SelectItem>
          <SelectItem value="SBAggroB" style={{ fontFamily: "SBAggroB" }}>
            어그로체
          </SelectItem>
          <SelectItem value="yg-jalnan" style={{ fontFamily: "yg-jalnan" }}>
            여기어때 잘난체
          </SelectItem>
          <SelectItem
            value="JalnanGothic"
            style={{ fontFamily: "JalnanGothic" }}
          >
            여기어때 잘난체 고딕
          </SelectItem>
          <SelectItem
            value="GangwonEduPowerExtraBoldA"
            style={{ fontFamily: "GangwonEduPowerExtraBoldA" }}
          >
            강원교육튼튼체
          </SelectItem>
          <SelectItem
            value="Cafe24Ssurround"
            style={{ fontFamily: "Cafe24Ssurround" }}
          >
            카페24 써라운드
          </SelectItem>
          <SelectItem value="BMJUA" style={{ fontFamily: "BMJUA" }}>
            우아한형제들 주아체
          </SelectItem>
          <SelectItem value="BMDOHYEON" style={{ fontFamily: "BMDOHYEON" }}>
            우아한형제들 도현체
          </SelectItem>
          <SelectItem value="DNFBitBitv2" style={{ fontFamily: "DNFBitBitv2" }}>
            던파 비트비트체 v2
          </SelectItem>
          <SelectItem
            value="RixYeoljeongdo_Regular"
            style={{ fontFamily: "RixYeoljeongdo_Regular" }}
          >
            Rix열정도체
          </SelectItem>
          <SelectItem value="TTTogether" style={{ fontFamily: "TTTogether" }}>
            TT투게더
          </SelectItem>
          <SelectItem value="LeeSeoyun" style={{ fontFamily: "LeeSeoyun" }}>
            이서윤체
          </SelectItem>
          <SelectItem value="InkLipquid" style={{ fontFamily: "InkLipquid" }}>
            잉크립퀴드체
          </SelectItem>
          <SelectItem
            value="Ownglyph_meetme-Rg"
            style={{ fontFamily: "Ownglyph_meetme-Rg" }}
          >
            밑미 폰트
          </SelectItem>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
