const userUrl = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

const delay = (t, v) => {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, v), t)
  });
}

// eslint-disable-next-line no-extend-native
Promise.prototype.delayResolve = function (t = 1000) {
   return this.then(function(v) {
       return delay(t, v);
   });
}

const invokeFakeResolve = payload => Promise.resolve({
  ok: true,
  payload,
}).delayResolve();

export const getUsers = () => fetch(userUrl, { method: 'GET' });

export const postUser = user => invokeFakeResolve(user);
export const getUser = user => invokeFakeResolve(user);
export const putUser = user => invokeFakeResolve(user);
export const deleteUser = user => invokeFakeResolve(user);
