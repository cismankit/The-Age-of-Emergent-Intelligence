import { Outlet } from 'react-router-dom';

export function ReaderLayout() {
  return (
    <div className="reader-shell texture-paper">
      <Outlet />
    </div>
  );
}
