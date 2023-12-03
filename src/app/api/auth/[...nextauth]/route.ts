import { handlers } from '@/auth';

const { GET, POST } = handlers;

export { GET, POST };

// Showcasing advanced initialization in Route Handlers
// export async function GET(request: NextRequest) {
//     // Do something with request
//     const response = await AuthGET(request);
//     // Do something with response
//     return response;
// }
