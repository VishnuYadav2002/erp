import "./style.css";
import Sidebar from "./Sidebar";
import Performance from "./Performace";
import TableData from './Table'
import { useNavigate } from 'react-router-dom';
import { useSession } from '../SessionContext';
function Dashboard() {
  
const { isAuthenticated } = useSession();
const navigate = useNavigate();
// Redirect to login if not authenticated
if (!isAuthenticated) {
navigate('/login');
return null;
}

const style = {
  marginLeft: "20%",
  width: "79%"
};

return (
<>
<Sidebar/>
<Performance/>
<div style={style}><TableData/></div>

</>
);
}
export default Dashboard;