import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function AdminHome() {
    return (
    <div>
        <Link to="/admin/lisa">
        <Button className="btn btn-secondary">LISA TOODE</Button>
        </Link>
        <Link to="/admin/tooted">
        <Button className="btn btn-secondary">HALDA TOOTEID</Button>
        </Link>
        <Link to="/admin/kategooriad">
        <Button className="btn btn-secondary">KATEGOORIAD</Button>
        </Link>
        <Link to="/admin/karusellgalerii">
        <Button className="btn btn-secondary">KARUSELL GALERII</Button>
        </Link>
        <Link to="/admin/lisa-kasutaja">
        <Button className="btn btn-secondary">LISA KASUTAJA</Button>
        </Link>
    </div>)
    
    
    }
    export default AdminHome;