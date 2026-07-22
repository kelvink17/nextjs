import { getLogtoContext, signIn, signOut } from '@logto/next/server-actions';
import SignIn from './sign-in';
import SignOut from './sign-out';
import { logtoConfig } from '../app/lib/logto';

const Home = async () => {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  console.log(claims)

  return (
    <nav className='min-h-screen  flex item-center justify-center bg-gray-100'>
      {isAuthenticated ? (
        <div className='bg-white p-10 rounded-lg shadow-lg text-center max-w-lg w-full'>
          <h1 className='text-4xl font-bold mb-4'>Welcome Back 😊{claims!.email}</h1>
          <a href='/dashboard'> <p className='text-gray-600 mb-6'>Go to Dashboard </p></a>
          <SignOut
            onSignOut={async () => {
              'use server';

              await signOut(logtoConfig);
            }}
          />
        </div>
      ) : (
         <div className='bg-white p-10 rounded-lg shadow-lg text-center max-w-lg w-full'>
        <h1 className='text-4xl font-bold mb-4'>Ticket Management System</h1>
        <p className='text-gray-600 mb-6'>Organize, ticket and manage tickets</p>
          <SignIn
            onSignIn={async () => {
              'use server';

              await signIn(logtoConfig);
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Home;