const TOKEN_KEY = '13799731'
// const TOKEN_EXPIRE_IN = '1h';

const statusCodes = {
    UNAUTHORIZED: 401,
    SUCCESS: 200,
    FAILED: 404,
}

const messages = {
    SUCCESS: 'درخواست موفقیت آمیز بود!',
    FAILED: 'درخواست موفقیت آمیز نبود!',
    FORBBIDEN: 'درخواست غیر مجاز است!',
}

module.exports = {
    TOKEN_KEY,
    statusCodes,
    messages,
}