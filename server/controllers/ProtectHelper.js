function protectRoute(req, res, next) {
  if (req.session.userid) {
    next();
  } else {
    return res.json({
      error: "ACCESS_DENIED",
      type: "AUTHORIZATION",
    });
  }
}
export default protectRoute;
