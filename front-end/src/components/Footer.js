const Footer = () => {
    return (
        <div className="d-flex justify-content-around">
            <a href="/">
                <button className="btn btn-primary">Liste des voitures</button>
            </a>
            <a href="/client-list">
                <button className="btn btn-secondary">Liste des clients</button>
            </a>
            <a href="/add-car">
                <button className="btn btn-success">Ajouter une voiture</button>
            </a>
            <a href="/add-client">
                <button className="btn btn-danger">Ajouter un client</button>
            </a>
        </div>
    );
}

export default Footer;
