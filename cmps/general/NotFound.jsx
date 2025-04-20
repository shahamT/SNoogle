const { useNavigate } = ReactRouterDOM

export function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="not-found">
      <div className="not-found-content">
        <img src="assets/img/logo/sn-icon.png" alt="SNoogle logo" className="not-found-logo" />
        <h1>Page Not Found</h1>
        <p>Oops, the page you’re looking for doesn’t exist.</p>
        <button onClick={() => navigate('/home')}>Go Home</button>
      </div>
    </section>
  )
}

// export function NotFound() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
//             <div className="animate-bounce text-6xl mb-4">🚫</div>
//             <h1 className="text-4xl md:text-5xl font-bold mb-2">404 – Page Not Found</h1>
//             <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-md">
//                 Sorry, the page you’re looking for doesn’t exist or has been moved.
//             </p>
//             <a
//                 href="/"
//                 className="px-5 py-2.5 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition"
//             >
//                 Go Home
//             </a>
//         </div>
//     )
// }