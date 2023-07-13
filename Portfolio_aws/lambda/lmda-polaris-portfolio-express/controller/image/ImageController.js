const ImageService = require("../../service/image/ImageService");
const { catchAsync } = require("../../modules/error");
const httpStatus = require("http-status");

/********************************** 
 1. 이미지 조회
**********************************/
exports.selectImageList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ImageService.selectImageList(query);
  res.status(httpStatus.OK).json(result);
});
