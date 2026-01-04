const asyncHandler = (fun) => {
  return async (req, res, next) => {
    try {
      await fun(req, res, next);

    } catch (err) {
      console.log('error');
      next(err);
    }
  }
}

module.exports = asyncHandler;