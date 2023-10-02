// pages/index.tsx
import Navbar from '@/components/navbar/navbar';


const HomePage: React.FC = () => {

  return (

    <div className="dark:bg-gray-900 min-h-screen">
      < Navbar />
      {/* Main Content */}
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content (Left Side) */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-yellow-600 mb-2">Delivery to Your Door</h2>
            <p className="text-gray-600 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo.
              Integer euismod libero id mauris malesuada tincidunt.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo.
              Integer euismod libero id mauris malesuada tincidunt
            </p>
            <button className='my-6 hover:text-gray-300 bg-yellow-600 py-2 px-4 rounded-full'>Order now</button>
          </div>

          {/* Image (Right Side) */}
          <div className="md:w-1/2">
            <img
              className=""
              src="/images/undraw_on_the_way_re_swjt.svg"
              alt="Delicious Pizza"
            />
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Welcome to My Next.js App</h1>
    //   <p>Click below to navigate:</p>
    //   <ul>
    //     <li>
    //       <Link href="/auth/register">
    //         Registration
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/auth/login">
    //         Login
    //       </Link>
    //     </li>

    //        <li>
    //       <Link href="/pizza/pizzas">
    //         pizzas
    //       </Link>
    //     </li>

    //     <li>
    //       <Link href="/pizza/createPizza">
    //         createPizzas
    //       </Link>
    //     </li>

    //     {/* <li>
    //       <Link href="/ingredients/createIngredient">
    //         createingredient
    //       </Link> */}
    //     {/* </li> */}
    //   </ul>
    // </div>
  );
};

export default HomePage;
