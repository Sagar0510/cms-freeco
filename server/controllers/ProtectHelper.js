function protectRoute(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.json({
      error: "ACCESS_DENIED",
      type: "AUTHORIZATION",
    });
  }
}
export default protectRoute;
