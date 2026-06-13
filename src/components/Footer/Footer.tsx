type FooterProps = {
  projectName?: string;
};

export default function Footer({
  projectName = "Chingu Voyage V61 Tier 2 Team 21",
}: FooterProps) {
  return (
    <footer className="footer">
      <p className="footer__text">
        <a
          href="https://github.com/chingu-voyages/v61-tier2-team-21"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          {projectName}
        </a>
      </p>
    </footer>
  );
}
