const express = require("express");
const router = express.Router();
const upload = require("../middleware/projectUpload");


const {
    protect,
    clientOnly,
    freelancerOnly,
} = require("../middleware/authMiddleware");

const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    searchProjects,
    filterBySkills,
    filterByExperience,
    filterByBudget,
    filterByCategory,
    getProjectsPagination,
    uploadDocument,
    getDocuments,
    deleteDocument,
    trackProjectProgress,
    getMyProjects,
    getRecommendedProjects,
    getLatestProjects,
    getUpcomingDeadlines,
    completeProject,
} = require("../controllers/ProjectController");

// Create Project
router.post(
    "/create",
    protect,
    clientOnly,
    createProject
);


// Update Project
router.put(
    "/:id",
    protect,
    clientOnly,
    updateProject
);

router.delete(
    "/:id",
    protect,
    clientOnly,
    deleteProject
);

router.get(
    "/search/all",
    searchProjects
);

router.get(
    "/filter/skills",
    filterBySkills
);

router.get(
    "/filter/experience",
    filterByExperience
);

router.get(
    "/filter/budget",
    filterByBudget
);

router.get(
    "/filter/category",
    filterByCategory
);


router.get(
    "/page/all",
    getProjectsPagination
);

router.post(
    "/:projectId/upload-document",
    protect,
    clientOnly,
    upload.single("document"),
    uploadDocument
);

router.get(
    "/:projectId/documents",
    protect,
    getDocuments
);

router.delete(
    "/:projectId/document/:documentId",
    protect,
    clientOnly,
    deleteDocument
);

router.get(
    "/:projectId/progress",
    protect,
    trackProjectProgress
);
router.get(
    "/my-projects",
    protect,
    freelancerOnly,
    getMyProjects
);





router.get(
    "/recommended",
    protect,
    freelancerOnly,
    getRecommendedProjects
);

router.get(
    "/latest",
    protect,
    getLatestProjects
);

router.get(
    "/upcoming-deadlines",
    protect,
    getUpcomingDeadlines
);
router.put(
    "/:id/complete",
    protect,
    clientOnly,
    completeProject
);

// Get All Projects
router.get("/", getAllProjects);

// Get Single Project
router.get("/:id", getProjectById);
module.exports = router;
