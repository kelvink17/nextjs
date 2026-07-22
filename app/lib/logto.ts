const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const logtoConfig = {
  endpoint: 'https://4nqp9e.logto.app/',
  appId: 'c0nulsfx09dqwup96f1yu',
  appSecret: 'dRFtVw2BiYn7oOb4cwZSIOXssyh4xkit',
  baseUrl: baseUrl, // Change to your own base URL
  cookieSecret: 'GGppRDLqwvfZBYWVB5oUbDElbIHLUHsY', // Auto-generated 32 digit secret
  cookieSecure: process.env.NODE_ENV === 'production',
};