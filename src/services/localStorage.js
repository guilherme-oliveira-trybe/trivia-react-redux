export default function tokenToLocalStorage(token) {
  localStorage.setItem('token', token.token);
}
