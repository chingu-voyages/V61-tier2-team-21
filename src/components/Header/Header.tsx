type HeaderProps = {
  title?: string;
};

export default function Header({
  title = "Wordsy",
}: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
    </header>
  );
}
