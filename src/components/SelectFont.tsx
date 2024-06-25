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
        <SelectValue placeholder="어그로체" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
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
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
