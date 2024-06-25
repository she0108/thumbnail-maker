interface TitleInputProps {
  placeholder: string;
  size: number;
  font: string;
  color: string;
}

export default function TitleInput({
  placeholder,
  size,
  font,
  color,
}: TitleInputProps) {
  return (
    <input
      className="w-full h-auto font-bold text-center focus:outline-none bg-transparent overflow-visible"
      placeholder={placeholder}
      style={{
        fontSize: `${size}px`,
        fontFamily: font,
        color: color,
      }}
    />
  );
}
