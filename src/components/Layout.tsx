import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout-nav">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
