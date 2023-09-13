import jwt from 'jsonwebtoken';

const generateJWT = ( uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = {uid};

    jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY , {
      expiresIn: '4h'
    }, (err , token) => {
      if(err){
        console.log(err);
        reject('NO se pudo generar el JSON WEB token');
      }else{
        resolve(token);
      }
    })
  })
};

export default generateJWT;