import React, { useState } from 'react';

const Navbar2 = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      name: 'Category 1',
      subcategories: ['Subcategory 1.1', 'Subcategory 1.2', 'Subcategory 1.3'],
    },
    {
      name: 'Category 2',
      subcategories: ['Subcategory 2.1', 'Subcategory 2.2', 'Subcategory 2.3'],
    },
    {
      name: 'Category 3',
      subcategories: ['Subcategory 3.1', 'Subcategory 3.2', 'Subcategory 3.3'],
    },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white font-bold uppercase">Logo</h1>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {categories.map((category, index) => (
                  <div key={index} className="relative">
                    <button
                      onMouseEnter={() => setOpenCategory(index)}
                      onMouseLeave={() => setOpenCategory(null)}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {category.name}
                    </button>
                    {openCategory === index && (
                      <div className="absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md">
                        <ul className="py-1">
                          {category.subcategories.map((subcategory, subIndex) => (
                            <li key={subIndex} className="hover:bg-gray-100">
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                                {subcategory}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
