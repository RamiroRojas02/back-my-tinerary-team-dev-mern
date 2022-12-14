const { verifyUser, notFound } = require("../config/responses");

const isTheUser = model => [
  async (req, res, next) => {
    // console.log(req.body);
    // console.log("separooooo");
    // console.log(req.params);

    let itinerary = await model.findOne({ _id: req.params.id });
    // console.log(itinerary);
    if (itinerary) {
      if (Array.isArray(itinerary.userId)) {
        let response = itinerary.userId.find(user => user.equals(req.user.id))
        if (response) {
          return next()
        } else {
          return verifyUser(req, res);
        }
      } //else {
      //   if (itinerary.userId.equals(req.user.id)) {
      //     return next()
      //   } else {
      //     return verifyUser(req, res);
      //   }
      // }
    }
    return notFound(req, res);
  },
];


module.exports = isTheUser;