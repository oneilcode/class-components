import { Link, Outlet } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import Flyout from './Flyout';

export default function Layout() {
  return (
    <div className="layout-nav">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <ThemeButton />
      </nav>
      <main className="layout-main">
        <Outlet />
      </main>
      <Flyout />
    </div>
  );
}
