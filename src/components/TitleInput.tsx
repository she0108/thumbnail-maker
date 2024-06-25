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
      className="w-full font-bold text-center focus:outline-none mb-2 bg-transparent"
      placeholder={placeholder}
      style={{
        fontSize: `${size}px`,
        fontFamily: font,
        color: color,
      }}
    />
  );
}
