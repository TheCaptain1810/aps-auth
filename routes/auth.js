import express from "express";
import {
  getAuthorizationUrl,
  authCallbackMiddleware,
  authRefreshMiddleware,
  getUserProfile,
} from "../services/aps";

const router = express.Router();

router.get("/api/auth/login", (req, res) => {
  res.redirect(getAuthorizationUrl());
});

router.get("/api/auth/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

router.get("/api/auth/callback", authCallbackMiddleware, (req, res) => {
  res.redirect("/");
});

router.get("/api/auth/token", authRefreshMiddleware, (req, res) => {
  res.json(req.publicOAuthToken);
});

router.get(
  "/api/auth/profile",
  authRefreshMiddleware,
  async (req, res, next) => {
    try {
      const userProfile = await getUserProfile(
        req.publicOAuthToken.access_token
      );
      res.json(userProfile);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
