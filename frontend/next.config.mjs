/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: false,
            },
        ];
    },
    reactStrictMode: false,
};

export default nextConfig;
