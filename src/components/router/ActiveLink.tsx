import { Link, useRouteMatch } from 'react-router-dom';

function ActiveLink({ children, to, exact = false }: {
  children: React.ReactNode,
  to: string,
  exact?: boolean
}) {
  const match = useRouteMatch({
    path: to,
    exact: exact
  });

  return (
    <Link to={to}>
      <div className={`hover:text-chartreuse500 ${match ? "text-chartreuse500" : "text-offWhite"}`}>{children}</div>
    </Link>
  );
}

export default ActiveLink;
