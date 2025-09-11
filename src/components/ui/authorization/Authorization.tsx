import Link from "next/link"

export const Authorization = () => {
  return (<div className="flex items-center space-x-4">
    <Link
      href="/login"
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
    >
      Login
    </Link>
    <Link
      href="/signup"
      className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Sign Up
    </Link>
  </div>)
}