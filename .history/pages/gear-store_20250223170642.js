import Center from '@/components/Center';
import FeaturedSlider from '@/components/FeaturedSlider';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { useEffect, useState } from 'react';

const GearStore = ({mainCategories}) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch('/api/components')
      .then((res) => res.json())
      .then((data) => setComponents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <Center>
        <div>
            <FeaturedSlider />
            <div>
                <div className='border border-black bg-red-600 p-10 rounded-2xl'>
                     sddsd
                </div>
                
            </div>
        </div>
    </Center>
  )
}

export default GearStore;

export async function getServerSideProps(context) {
await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);

  return {
    props: {
      categories:JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories))
    },
  };
}