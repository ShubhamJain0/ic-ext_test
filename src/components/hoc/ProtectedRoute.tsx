// import { Navigate, Route } from 'react-router-dom';

// import { useAuth } from '../../utils/hooks/useAuth';

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useAuth();

//   if (!isAuthenticated) {
//     return <Route></Route>;
//   } else {
//     return (
//       <Route
//         Component={children}
//         /* path="teams/:teamId"
//         loader={async ({ params }) => {
//           return fetch(`/fake/api/teams/${params.teamId}.json`);
//         }}
//         action={async ({ request }) => {
//           return updateFakeTeam(await request.formData());
//         }}
//         errorElement={<ErrorBoundary />} */
//       />
//     );
//   }
// };

// export default ProtectedRoute;
