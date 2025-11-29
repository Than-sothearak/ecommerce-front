import Center from "@/components/Center";
import FeaturedSlider from "@/components/FeaturedSlider";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { useEffect, useState } from "react";

const GearStore = ({ mainCategories }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch("/api/components")
      .then((res) => res.json())
      .then((data) => setComponents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(components)
  return (
    <Center>
      <div>
        <FeaturedSlider />
        <div className="p-6">
          <h1 className="text-2xl font-bold">PC Component Selector</h1>
          {/* <ul className="mt-4">
            {components.map((component, index) => (
              <li key={index} className="p-2 border rounded-lg my-2">
                <p className="text-lg font-semibold">{component.name}</p>
                <p className="text-sm text-gray-600">
                  Category: {component.category}
                </p>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </Center>
  );
};

export default GearStore;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
    },
  };
}
