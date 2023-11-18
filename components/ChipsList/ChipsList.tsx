import "./ChipsList.css";

export default function ChipsList({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="chips-list-wrap">
      <div className="chips-overflow-left"></div>
      <div className="chips-list">{children}</div>
      <div className="chips-overflow-right"></div>
    </div>
  );
}
