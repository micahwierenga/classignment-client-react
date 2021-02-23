const URL = `${process.env.REACT_APP_API}/auth`;

class UserModel {
  static show() {
    return fetch(URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.uid}`,
      },
    })
    .then(response => response.json())
    .catch(err => console.log(err));
  }
}

export default UserModel;