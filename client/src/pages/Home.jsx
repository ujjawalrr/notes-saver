import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='min-h-[calc(100vh-60px)] bg-gradient-to-tr from-[#d3baa9] to-[#ffc9aa]'>
      <div className="flex items-center justify-center py-8">
        <div className="max-w-lg mx-auto p-8 bg-white rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to Note Saver</h1>
          <p className="text-lg text-gray-700 mb-8">A simple and efficient way to manage your notes!</p>
          <div className="grid grid-cols-1 gap-4">
            <Link to='/add' className="bg-blue-500 text-white rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">Add a Note</h2>
              <p>Create and save your notes easily.</p>
            </Link>
            <Link to='/notes' className="bg-green-500 text-white rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">View Your Notes</h2>
              <p>Access and view all your saved notes at any time.</p>
            </Link>
            <Link to='/notes' className="bg-yellow-500 text-white rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">Update or Delete</h2>
              <p>Edit or remove your notes effortlessly.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
