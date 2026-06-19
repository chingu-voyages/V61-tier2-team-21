const today = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="p-4 text-center flex text-sm flex-col">
      <ul className="flex justify-center">
        <li className="border-r px-2">&copy; {today} Questle</li>
        <li>
          <a href="https://github.com/chingu-voyages/V61-tier2-team-21" target="_blank" className="border-r px-2">
            GitHub
          </a>
        </li>
        <li>
          {/* add a valid email later! */}
          <a className="pl-2" href="" target="_blank">
            Feedback
          </a>
        </li>
      </ul>
      <div className="mt-1 text-[12px]">Built with ❤️ for puzzle lovers using React, TypeScript & Vite</div>
    </footer>
  );
}
