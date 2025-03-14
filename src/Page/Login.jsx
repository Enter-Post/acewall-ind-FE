import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import acewallshort from '../assets/acewallshort.png';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/student');
  };

  return (
    <section className="bg-gray-50 bg-cover bg-center min-h-screen bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] dark:bg-gray-900">
      <div className="flex flex-col bg-black/50 backdrop-blur-md items-center justify-center px-6 py-8 mx-auto min-h-screen">
        <div className="w-full flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow dark:border sm:max-w-md md:max-w-2xl xl:max-w-4xl p-6 md:p-8 xl:p-10 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full md:w-1/2 p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-4">
            <Link className="flex title-font items-center justify-center text-gray-900">
              <img src={acewallshort} alt="Acewall Logo" className="w-1/2" />
            </Link>
            <div className="text-center mt-4">
              <h4 className='text-md font-bold'>“Our Clients Love Acewall Scholars”</h4>
              <p className='text-xs'>“Acewall scholars is an amazing program. They have helped me with numerous subjects, including Biology, Algebra, and Spanish.... I not only aced the midterm but I got the highest score out of all of Spanish 1, thank you.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
