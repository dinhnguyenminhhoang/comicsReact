const ApiRequest = require("../requests/ApiRequest");
let testApiController = (req, res) => {
  return res.send("testApiController");
};
let getCetagoryController = async (req, res) => {
  try {
    let data = await ApiRequest.getAllCategories();
    if (data.errCode === 0) {
      return res.status(200).json({
        data,
      });
    } else if (data.errCode === 1) {
      return res.status(400).json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let getComicController = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let data = await ApiRequest.getComicsByType(+limit);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getChapterController = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetChapter();
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getChapterByIdController = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let data = await ApiRequest.handleGetChapterById(id);
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let getAllComic = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetAllComic();
    if (data) {
      return res.status(200).json({
        data,
      });
    }
    return res.status(200).json({
      errCode: 1,
      message: "comic not found",
    });
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      message: "error form server",
    });
  }
};
let getAllUser = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetAllUser();
    if (data) {
      return res.status(200).json({
        data,
      });
    }
    return res.status(200).json({
      errCode: 1,
      message: "user not found",
    });
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      message: "error form server",
    });
  }
};
let getPagination = async (req, res) => {
  let pageNumber = req.query.pageNumber;
  let pageSize = req.query.pageSize;
  if (!pageNumber) pageNumber = 1;
  if (!pageSize) pageSize = 12;
  try {
    let data = await ApiRequest.handleGetPagination(+pageNumber, +pageSize);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
let getComicById = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      let data = await ApiRequest.handleGetComicById(id);
      if (data) {
        return res.status(200).json({
          data,
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: error,
    });
  }
};
let getComicByCategory = async (req, res) => {
  try {
    let categoryId = req.query.categoryId;
    if (categoryId) {
      let data = await ApiRequest.handleGetComicByCategory(+categoryId);
      if (data) {
        return res.status(200).json({
          data,
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: error,
    });
  }
};
let getCategoriesByComic = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (comicId) {
      let data = await ApiRequest.handleGetcategoriesByComic(+comicId);
      if (data) {
        return res.status(200).json({
          data,
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: error,
    });
  }
};
let getOnlyChapterByIdController = async (req, res) => {
  try {
    let chapterId = req.query.chapterId;
    let comicId = req.query.comicId;
    if (chapterId && comicId) {
      let data = await ApiRequest.handleGetOnlyChapterByIdController(
        +chapterId,
        +comicId
      );
      if (data) {
        return res.status(200).json({
          data,
        });
      } else {
        return res.status(400).json({
          errCode: 1,
          message: "data not found",
        });
      }
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "chapterId not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
let getUserController = async (req, res) => {
  let email = req.query.email;
  try {
    if (email) {
      let data = await ApiRequest.handleGetUserInfo(email);
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: "email not found",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "error form server",
      errCode: 1,
    });
  }
};
let authLoginController = async (req, res) => {
  let userInfo = req.body;
  try {
    if (userInfo.email && userInfo.password) {
      let data = await ApiRequest.handleLogin(userInfo);
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: "userInfo not found",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "error form server",
      errCode: 1,
    });
  }
};
let getTotalUserController = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetTotalUser();
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: "roleId not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "error form server", errCode: 1 });
  }
};
let getTotalChapterController = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetTotalChapter();
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: "chapter not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "error form server", errCode: 1 });
  }
};

let getTotalComicController = async (req, res) => {
  try {
    let data = await ApiRequest.handleGetTotalComic();
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: "comic not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "error form server", errCode: 1 });
  }
};
let getCollectionController = async (req, res) => {
  try {
    let userId = req.query.userId;
    if (userId) {
      let data = await ApiRequest.handleGetCollection(+userId);
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({
        message: "userId not found",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error form server",
      errCode: 1,
    });
  }
};
let getFollowController = async (req, res) => {
  try {
    let userId = req.query.userId;
    if (userId) {
      let data = await ApiRequest.handleGetFollow(+userId);
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({
        message: "userId not found",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error form server",
      errCode: 1,
    });
  }
};
////////////////////////////////////////////////////////////////////////////
let createComic = async (req, res) => {
  try {
    let data = await ApiRequest.handleCreateComic(req.body);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let createChapter = async (req, res) => {
  let data = await ApiRequest.handleCreateChapter(req.body);
  if (data) {
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(400).json({
      message: "data not found",
    });
  }
};
let createCategory = async (req, res) => {
  let data = await ApiRequest.handleCreateCategory(req.body);
  if (data) {
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(400).json({
      message: "data not found",
    });
  }
};
let createComment = async (req, res) => {
  let data = await ApiRequest.handleCreateComment(req.body);
  if (data) {
    return res.status(200).json({
      data,
    });
  } else {
    return res.status(400).json({
      message: "data not found",
    });
  }
};
let createCategoryComic = async (req, res) => {
  try {
    let dataReq = req.body;
    if (dataReq.comicId && dataReq.categoryId.length > 0) {
      let data = await ApiRequest.handleCreateCategoryComic(dataReq);
      if (data) {
        return res.status(200).json({
          data,
        });
      } else {
        return res.status(400).json({
          message: "data not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "missing parameter",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let createUserController = async (req, res) => {
  try {
    let dataReq = req.body;
    if (dataReq) {
      let data = await ApiRequest.createUser(req.body);
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(404).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: "error from server",
    });
  }
};
let createComicForCollectionController = async (req, res) => {
  try {
    let comicId = req.body.comicId;
    if (comicId) {
      let data = await ApiRequest.handleCreateComicForColection(+comicId);
      return res.status(200).json(data);
    } else {
      return res.status(404).json({
        message: "user not found",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "err creating collection",
      errCode: 1,
    });
  }
};
let createCollectionController = async (req, res) => {
  try {
    let userId = req.body.userId;
    if (userId) {
      let data = await ApiRequest.handleCreateColection(+userId);
      return res.status(200).json(data);
    } else {
      return res.status(404).json({
        message: "user not found",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "err creating collection",
      errCode: 1,
    });
  }
};
let createFollowController = async (req, res) => {
  try {
    let userId = req.body.userId;
    let comicId = req.body.comicId;
    if (userId && comicId) {
      let data = await ApiRequest.handleCreateFollow(+userId, +comicId);
      return res.status(200).json(data);
    } else {
      return res.status(404).json({
        message: "missing parameter",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "err creating collection",
      errCode: 1,
    });
  }
};
//uppdate
let updateViews = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (!comicId) return;
    let data = await ApiRequest.handleUpdateViews(+comicId);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
let updateTimePass = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (!comicId) return;
    let data = await ApiRequest.handleUpdateTimePass(+comicId);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
let updateUserController = async (req, res) => {
  try {
    const userInfo = req.body;
    let data = await ApiRequest.handleUpdateUser(userInfo);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
let updateComicController = async (req, res) => {
  try {
    const comicInfo = req.body;
    let data = await ApiRequest.handleUpdateComic(comicInfo);
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
//delete
let deleteUserController = async (req, res) => {
  try {
    let userId = req.query.userId;
    if (!userId) return;
    let data = await ApiRequest.handleDeleteUser(+userId);
    if (data) {
      return res.status(200).json({
        data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
let deleteComicController = async (req, res) => {
  try {
    let comicId = req.query.comicId;
    if (!comicId)
      return res.status(404).json({
        message: "comicId not found",
      });
    let data = await ApiRequest.handleDeleteComic(+comicId);
    if (data) {
      return res.status(200).json({
        data,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 1,
      message: "error form server",
    });
  }
};
module.exports = {
  authLoginController,
  testApiController,
  getCetagoryController,
  getComicController,
  getChapterController,
  getChapterByIdController,
  getAllComic,
  getPagination,
  getComicById,
  getComicByCategory,
  getCategoriesByComic,
  getOnlyChapterByIdController,
  getUserController,
  getTotalUserController,
  getTotalChapterController,
  getTotalComicController,
  getCollectionController,
  getFollowController,
  getAllUser,
  //
  createComicForCollectionController,
  createComic,
  createChapter,
  createCategory,
  createComment,
  createCategoryComic,
  createUserController,
  createCollectionController,
  createFollowController,
  //
  updateViews,
  updateTimePass,
  updateUserController,
  updateComicController,
  //delete
  deleteUserController,
  deleteComicController,
};
