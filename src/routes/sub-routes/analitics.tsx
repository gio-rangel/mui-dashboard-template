import Dashboard from "../../layout/Dashboard"
import Analytics from "../../pages/Analytics"

export const dashboardRoutes = {
    path: '/dashboard',
    component: () => <Dashboard />,
    protected: true,
    children: [
        {
            path: 'analitics', 
            component: () => <Analytics />,
            protected: true,
           
        }
    ]
}