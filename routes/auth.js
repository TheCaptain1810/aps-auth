const express = require("express");
const router = express.Router();
const {
  getAuthorizationUrl,
  authCallbackMiddleware,
  authRefreshMiddleware,
  getUserProfile,
} = require("../services/aps");

router.get("/auth/login", (req, res) => {
  res.redirect(getAuthorizationUrl());
});

router.get("/auth/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

router.get("/auth/callback", authCallbackMiddleware, (req, res) => {
  res.redirect("/");
});

router.get("/auth/token", authRefreshMiddleware, (req, res) => {
  res.json(req.publicOAuthToken);
});

router.get("/auth/profile", authRefreshMiddleware, async (req, res, next) => {
  try {
    const userProfile = await getUserProfile(req.publicOAuthToken.access_token);
    res.json(userProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
