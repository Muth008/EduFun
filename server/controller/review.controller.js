const express = require("express");

const listReviews = require("../services/review/list.service");
const getReview = require("../services/review/get.service");
const createReview = require("../services/review/create.service");
const updateReview = require("../services/review/update.service");
const deleteReview = require("../services/review/delete.service");

const router = express.Router();

router.get("/list", async (req, res) => {
    await listReviews(req, res);
});

router.get("/", async (req, res) => {
    await getReview(req, res);
});

router.post("/", async (req, res) => {
    await createReview(req, res);
});

router.put("/", async (req, res) => {
    await updateReview(req, res);
});

router.delete("/", async (req, res) => {
    await deleteReview(req, res);
});

module.exports = router;
