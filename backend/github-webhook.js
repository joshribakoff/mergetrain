module.exports = (req, res) => {
    console.log(req.headers)
  let payload;
  if (Object.keys(req.body).length === 1 && undefined !== req.body.payload) {
    payload = JSON.parse(req.body.payload);
  } else {
    payload = req.body;
  }
  res.send("hi world");
  return "hi world";
};
