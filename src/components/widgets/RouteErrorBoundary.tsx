import { useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
    const error = useRouteError();
    console.error('Route error caught by RouteErrorBoundary:', error);

    return (
        <div style={{ padding: '2rem', color: 'crimson',display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center", height:"100vh" }}>
            <h2>Opps! Something went wrong</h2>
            <p>{(error as Error)?.message || 'Unknown error occurred'}</p>
            <button onClick={() => window.location.reload()}>Reload</button>
        </div>
    );
}
