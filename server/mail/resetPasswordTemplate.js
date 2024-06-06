export const resetPasswordTemplate = (token,id) => {
return `
<html>
<h1>Reset Your Password</h1>
<p>Click  <a href='http://localhost:5173/reset-password/${token}/${id}' target="-blank">here</a></p>

</html>
`
}