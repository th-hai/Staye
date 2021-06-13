// export function getErrorMessage(e) {
//   try {
//     if (e.response.data.data && e.response.data.data.errors) {
//       return JSON.stringify(e.response.data.data.errors);
//     }
//     return (
//       e.response.data.message[0].messages[0].message ||
//       e.response.data.message[0].messages[0].id
//     );
//   } catch (ex) {
//     try {
//       return e.response.data.message || e.response.data.id;
//     } catch (ex2) {
//       return JSON.stringify(e.response.data);
//     }
//   }
// }
