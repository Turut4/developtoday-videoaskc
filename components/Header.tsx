export const Header = () => {
  return (
    <header className="fixed w-screen bg-cyan-950 flex items-center justify-between p-5">
      <h1 className="text-white text-5xl">Cool Cars</h1>
      <nav className="flex space-x-5">
        {[
          ["Home", "/#"],
          ["About", "/#"],
          ["Contacts", "/#"],
        ].map(([title, url]) => (
          <a
            href={url}
            key={title}
            className="text-white font-mono text-3xl hover:underline"
          >
            {title}
          </a>
        ))}
      </nav>
    </header>
  );
};
