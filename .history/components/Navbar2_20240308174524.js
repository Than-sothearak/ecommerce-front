import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const categories = [
    {
      name: 'Category 1',
      subCategories: ['Subcategory 1A', 'Subcategory 1B', 'Subcategory 1C'],
    },
    {
      name: 'Category 2',
      subCategories: ['Subcategory 2A', 'Subcategory 2B', 'Subcategory 2C'],
    },
    // Add more categories here if needed
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const selectSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <button className="text-white" onClick={toggleDropdown}>
            Categories
          </button>
          {isOpen && (
            <div className="absolute bg-white shadow-lg rounded-md p-2 mt-1">
              {categories.map((category, index) => (
                <div key={index} className="py-2">
                  <button
                    className="block text-gray-800 hover:bg-gray-200 p-2 w-full text-left"
                    onClick={() => selectCategory(category.name)}
                  >
                    {category.name}
                  </button>
                  {selectedCategory === category.name && (
                    <div className="ml-4">
                      {category.subCategories.map((subCategory, index) => (
                        <button
                          key={index}
                          className="block text-gray-800 hover:bg-gray-200 p-2 w-full text-left"
                          onClick={() => selectSubCategory(subCategory)}
                        >
                          {subCategory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {selectedCategory && selectedSubCategory && (
            <span className="text-white">
              Selected: {selectedCategory} - {selectedSubCategory}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
