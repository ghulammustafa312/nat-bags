import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useData } from "../../contexts/DataProvider";
import "./Dashboard.css";
export const Dashboard = () => {
  const { loading } = useData();
  const { dashboardPage, setDashboardPage } = useAuth();
  const dashboardNav = [
    // {
    //   name: "Dashboard",
    //   path: "/dashboard/",
    // },
    {
      name: "Orders",
      path: "/dashboard/orders",
    },
    {
      name: "Users",
      path: "/dashboard/users",
    },
    {
      name: "Products",
      path: "/dashboard/products",
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
    },
    // {
    //   name: "Complaints",
    //   path: "/dashboard/complaints",
    // },
  ];

  return (
    !loading && (
      <div>
        <div className="dashboard-container">
          <div className="dashboard-link-container">
            {dashboardNav.map((nav) => (
              <Link
                style={{
                  color: dashboardPage === nav.name.toLowerCase() ? "black" : "grey",
                }}
                onClick={() => setDashboardPage(nav.name.toLowerCase())}
                to={nav.path}
                key={nav.name}
              >
                {nav.name}
              </Link>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
    )
  );
};
