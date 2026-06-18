import { Puzzle, ChartColumnBig, CogOne, InfoOctagon } from "@mynaui/icons-react";

export default function Header() {
  return (
    <header className="header w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <h1 className="text-2xl font-extrabold font-title">Questle</h1>
        <div className="flex items-center gap-2 text-blue-600 md:gap-3">
          <a href="#" target="_blank" rel="noreferrer noopener">
            <Puzzle className="size-7 text-gray-600 dark:text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer noopener">
            <ChartColumnBig className="size-7 text-gray-600 dark:text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer noopener">
            <InfoOctagon className="size-7 text-amber-500" />
          </a>
          <a href="#" target="_blank" rel="noreferrer noopener">
            <CogOne className="size-7 text-gray-600 dark:text-gray-200" />
          </a>
        </div>
      </div>
    </header>
  );
}
