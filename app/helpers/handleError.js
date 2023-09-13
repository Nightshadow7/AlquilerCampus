export const httpError = (res, err) => {
  console.log(err);
  return res.status(500).send({msg: 'Algo anda mal ፨( Error del servidor', error: err.message});
};