import { Link } from "react-router-dom";

type SidebarProps = {
  title: string;
};
type SidebarLink = {
  label: string;
  path: string;
  icon: string;
};

const links: SidebarLink[] = [
  { label: "DashBoard", path: "/", icon: "📊" },
  { label: "Upload", path: "/upload", icon: "📁" },
  { label: "History", path: "/history", icon: "🕘" },
];

function Sidebar({ title }: SidebarProps) {
  return (
    <section className="main-board">
      <div>
        <h1 className="h1-pattern-sidebar">{title}</h1>
      </div>
      <div className="main-link">
        {links.map((link) => (
          <Link to={link.path} key={link.path}>
            {link.icon} {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Sidebar;
