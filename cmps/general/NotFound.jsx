const { Link } = ReactRouterDOM

// export function NotFound() {

//     return (
//         <section className="not-found-container">
//             <section className="not-found">
//                 <h2>Ooops... Error <span>404</span></h2>
//             </section>
//             <p>Sorry but the page you are looking for does not exist.</p>
//             <Link to="/home">Go back home</Link>
//         </section>
//     )
// }

export function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
            <div className="animate-bounce text-6xl mb-4">🚫</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">404 – Page Not Found</h1>
            <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-md">
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>
            <a
                href="/"
                className="px-5 py-2.5 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition"
            >
                Go Home
            </a>
        </div>
    )
}