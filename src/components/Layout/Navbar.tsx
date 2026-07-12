import { InfoOctagon, ChartBarOne } from "@mynaui/icons-react";

export default function Header() {
  return (
    <header className="header w-full h-13 border-b px-8 md:px-20">
      <nav className="flex items-center justify-between h-full">
        <div>practice mode</div>
        <h1>
          <span className="text-accent font-extrabold text-3xl">Questle</span>
        </h1>
        <div className="flex items-center gap-3 md:gap-7">
          <a href="#" target="_blank" rel="noreferrer noopener">
            <InfoOctagon className="size-7 text-light-primary" />
          </a>
          <a href="#" target="_blank" rel="noreferrer noopener">
            <ChartBarOne className="size-7 text-light-primary dark:text-gray-200" />
          </a>
        </div>
      </nav>
    </header>
  );
}
